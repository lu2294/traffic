import { observable, action, flow, runInAction } from 'mobx';
import { getRoadNameList, selectDetailInfo, selectVehicleInfo } from '../services'
import CommonStore from './CommonStore'

class Store {
    @observable collapsed = true;
    @observable hideRoadPanel = false;
    @observable showSectionDetail = false; //是否展示道路/路段详情
    @observable showVehicleDetail = false; //是否展示车辆详情
    @observable searchRoadData = [];  //搜索结果数据
    @observable showSearchResult = false; //是否展示搜索结果
    @observable sectionTableData = []; //道路/路段详情数据
    @observable sectionId = ''; // 道路/路段详情 id
    @observable vehicleDetailData = {}; //车辆信息数据
    @observable licenceType = ''; //
    @observable licenceNum = ''; //
    @observable sectionTitle = ''; //

    @action
    onHide = () => {
        this.hideRoadPanel = !this.hideRoadPanel;
    }
    @action
    onExpandPanel = () => {
        this.collapsed = !this.collapsed;
    }
    @action
    onShowSection = (record, isRoad) => {
        if (record) {
            if (!this.showSectionDetail) {
                this.showSectionDetail = !this.showSectionDetail;
            }
            if (isRoad) {
                this.sectionTitle = record.droadName;
                this.sectionId = record.droadId;
                CommonStore.chartsRoadType = '0'
            } else {
                this.sectionTitle = record.rdsegName;
                this.sectionId = record.rdsegId;
                CommonStore.chartsRoadType = '1'
            }
            const opts = {
                isRoad,
                Id: this.sectionId
            }
            this.selectDetailInfo(opts);
        } else {
            this.showSectionDetail = !this.showSectionDetail;
        }

    }

    @action
    selectCurrentRoad = (record) => {
        return {
            onClick: (event) => {
                CommonStore.roadId = record.droadId;
                CommonStore.dRoadDir4No = record.dRoadDir4No;
                CommonStore.currentRoad = `${record.roadName} (${record.direction})`;
                this.showSearchResult = !this.showSearchResult;
                CommonStore.clearGlobalTimer()
                CommonStore.qryCommonData();
                CommonStore.setGlobalTimer();
            }
        }
    }

    @action
    onShowVehicle = (record) => {
        if (record) {
            if (!this.showVehicleDetail) {
                this.showVehicleDetail = !this.showVehicleDetail;
            }
            this.licenceNum = record.jdchpzl;
            this.licenceType = record.jdchpzldm;
            this.selectVehicleInfo();
        } else {
            this.showVehicleDetail = !this.showVehicleDetail;
        }
    }

    @action
    searchRoad = async (roadName) => {
        if (roadName === '') {
            this.showSearchResult = false;
            return;
        }
        const params = {
            roadName
        }
        let res = await getRoadNameList(params);
        res = res.data
        if (res.code == 200 && res.data) {
            runInAction(() => {
                this.searchRoadData = res.data;
                this.showSearchResult = true;
            })
        }
    }

    @action
    selectDetailInfo = async (opts) => {
        let params = {
            ...opts,
            isReal: CommonStore.isReal,
            dRoadDir4No: CommonStore.dRoadDir4No,
        }

        if (!CommonStore.isReal) {
            params['startTime'] = CommonStore.startTime
            params['endTime'] = CommonStore.endTime
        }

        let res = await selectDetailInfo(params);
        res = res.data;
        if (res.code === 200) {
            runInAction(() => {
                this.sectionTableData = res.data;
            })
        }
    }

    @action
    selectVehicleInfo = async () => {
        let params = {
            licenceNum: this.licenceNum,
            licenceType: this.licenceType,
        }

        if (!CommonStore.isReal) {
            params['startTime'] = CommonStore.startTime
            params['endTime'] = CommonStore.endTime
        }

        let res = await selectVehicleInfo(params);
        res = res.data;
        if (res.code === 200) {
            runInAction(() => {
                this.vehicleDetailData = res.data;
            })
        }
    }
    @action
    fixedLocation = () => {
        CommonStore.chartsRoadType = '2';
    }

}

const store = new Store();
export default store;