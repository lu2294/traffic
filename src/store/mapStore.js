import { observable, action } from 'mobx'

class Store {
    @observable zoomInit = 10 //初始化时的地图层级
    @observable zoom = 10 //监听zoom
    @observable spotMarkerList = [] //车辆定位图层，用于清楚，展示
    @observable spotMarkerList1 = [] //车辆定位图层，用于清楚，展示
    @observable spotData1 = [] //事件初始化数据
    @observable spotData2 = [] //事件初始化数据
    @observable videoData = [] //videoMarkerList
    @observable videoMarkerList = [] //
    @observable lineList = []
    @observable tileUrl = "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"

    @action
    update = (value, key) => {
        this[key] = value
    }
}

const store = new Store();
export default store;