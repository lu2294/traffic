import { observable, action, computed, runInAction } from 'mobx';
import { selectRoadInfoByRoadId, selectEventByEventId,selectAllRadar } from '../services'
import Moment from 'moment'



class Store {

    @observable globalTimerDelay = 120000;

    @observable isPlay = false; //是否播放
    @observable max = 100;//进度条最大值
    @observable sliderValue = 0;//进度条当前值
    @observable speedArr = [1, 2, 4, 8];//倍速
    @observable timeValue = null;
    @observable dateValue = null;

    @observable currentRoad = '河南南路'; //是否播放
    @observable roadId = '152B709H3M0152CJ09GVM00';
    @observable dRoadDir4No = 3;
    @observable date;
    @observable startTime;
    @observable endTime;

    @observable interList = [];
    @observable rdsegInfoList = [];
    @observable roadData = [];
    @observable road = {};
    @observable videoData = [];
    @observable videoMarkerList = [];
    @observable videoData = [];
    @observable chartsRoadType = 0;//0,1,2 全道路/路段/路口

    @computed
    get speed() {
        return this.speedArr[0];
    }
    /**
     * 开始时间 YYYY:MM:DD HH:mm:ss
     */
    @computed
    get startDateTime() {
        if (this.date && this.startTime) {
            return `${this.date} ${this.startTime}`;
        } else {
            return undefined;
        }
    }

    /**
     * 结束时间 YYYY:MM:DD HH:mm:ss
     */
    @computed
    get endDateTime() {
        if (this.date && this.startTime) {
            return `${this.date} ${this.endTime}`;
        } else {
            return undefined;
        }
    }

    /**
     * 是否实时
     */
    @computed
    get isReal() {
        const flag = (this.date && this.startTime && this.endTime) ? 0 : 1;
        return flag;
    }

    /**
     * 初始化
     */
    @action
    init = () => {
        this.qryCommonData().then((res) => {
            if (res.code === 200 && res.data) {
                runInAction(() => {
                    this.interList = res.data.interList;
                    this.rdsegInfoList = this.sortrID(res.data.rdsegInfoList);
                    this.road = res.data.road;
                    this.currentRoad = res.data.road.droadName;
                    this.roadData = [res.data.road];
                })
            }
        }).finally(() => {
            this.setGlobalTimer();
        })
    }

    @action
    setGlobalTimer = () => {
        this.globalTimer = setTimeout(() => {
            this.qryCommonData().then((res) => {
                if (res.code === 200 && res.data) {
                    this.interList = res.data.interList;
                    this.rdsegInfoList = this.sortrID(res.data.rdsegInfoList);
                    this.road = res.data.road;
                    this.currentRoad = res.data.road.droadName;
                    this.roadData = [res.data.road];
                }
            }).finally(() => {
                this.setGlobalTimer();
            })
        }, this.globalTimerDelay)
    }

    @action
    clearGlobalTimer = () => {
        if (this.globalTimer) {
            clearTimeout(this.globalTimer);
        }
    }

    /**
     * 撒点数据
     */
    @action
    queryEventData = async () => {
        const eventList = await selectEventByEventId();
        runInAction(() => {
            this.eventData = eventList.data.data;
        })
        return eventList.data.data
    }

    /**
     * 雷视撒点数据
     */
    @action
    querySelectAllRadar = async () => {
        const videoDatas = await selectAllRadar({});
        runInAction(() => {
            this.videoData = videoDatas.data.data;
        })
        return videoDatas.data.data
    }

    /**
     * 请求公共数据
     */
    @action
    qryCommonData = async () => {
        let params = {
            roadId: this.roadId,
            dRoadDir4No: this.dRoadDir4No,
            isReal: this.isReal
        }

        if (!this.isReal) {
            params['startTime'] = this.startTime;
            params['endTime'] = this.endTime;
        }

        let res = await selectRoadInfoByRoadId(params);
        return res.data
        // res = res.data;

    }

    sortrID = (data) => {
        return data.map((v, k) => {
            v.SortID = String(k + 1)
            return v
        })
    }
    //排序算法
    // sortrdsegInfo = (datas) => {
    //     if(!datas.length) return [];
    //     let data = datas.slice();
    //     let list = [];
    //     let firstData = data.splice([data.findIndex(v => v.upRdsegId == null)], 1) || {}
    //     let nextData = data.splice([data.findIndex(v => v.dowRdsegId == null)], 1) || {}
    //     list = firstData;
    //     let nextID = firstData.length && firstData[0].dowRdsegId;
    //     for (let i = 2; i < datas.length; i++) {
    //         const nextdata = data.splice(data.findIndex(v => v.rdsegId === nextID), 1)[0];
    //         nextID = nextdata.dowRdsegId;
    //         list.push(nextdata);
    //     }
    //     return [...list,nextData]
    // }
    @action
    onDateChange = (date, datestring) => {
        this.date = datestring;
        this.dateValue = date;
        this.clearGlobalTimer();
        if (this.sliderTimer) {
            clearTimeout(this.sliderTimer);
        }
    }

    @action
    onTimeChange = (time, timeArr) => {
        this.clearGlobalTimer();
        if (this.sliderTimer) {
            clearTimeout(this.sliderTimer);
        }
        if (!time) {
            if (this.sliderTimer) {
                clearTimeout(this.sliderTimer);
            }
            this.startTime = undefined;
            this.endTime = undefined;
            this.sliderValue = 0;
            this.isPlay = false;
            this.timeValue = undefined;
            return;
        }
        this.startTime = time[0].format('HH:mm:ss');
        this.endTime = time[1].format('HH:mm:ss');
        this.max = time[1].diff(time[0], 'seconds');
        this.timeValue = time;
    }

    @action
    onRoadEventPlay = () => {
        if (!this.isPlay) {
            this.isPlay = !this.isPlay;
        }
        const differ = this.timeValue[1].diff(this.timeValue[0], 'minutes');
        if (differ > 0) {
            this.sliderTimer = setTimeout(() => {
                if (differ < this.speed) {
                    this.sliderValue = this.sliderValue + differ;
                } else {
                    this.sliderValue += this.speed;
                }
                this.onRoadEventPlay();
            }, 1000)
            this.clearGlobalTimer();
            this.setGlobalTimer();
        } else {
            clearTimeout(this.sliderTimer);
        }
    }

    @action
    onRoadEventPaused = () => {
        if (this.isPlay) {
            this.isPlay = !this.isPlay;
        }
        clearTimeout(this.sliderTimer);
        this.clearGlobalTimer();
    }

    @action
    onSliderChange = (value) => {
        if (value < this.max) {
            if (this.sliderTimer) {
                clearTimeout(this.sliderTimer)
            }
            this.sliderValue = value
            this.onRoadEventPlay();
        }
    }

    @action
    onRefresh = () => {
        if (this.sliderTimer) {
            clearTimeout(this.sliderTimer)
        }
        this.clearGlobalTimer();
        this.sliderValue = 0
        this.onRoadEventPlay();
        // this.qryCommonData();
        this.setGlobalTimer();
    }

    @action
    changeSpeed = () => {
        const [first, ...rest] = this.speedArr;
        this.speedArr = [...rest, first]
    }

}

const store = new Store();
export default store;