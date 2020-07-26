import { observable, action } from 'mobx'

export default class mapStroe{
    @observable zoomInit = 10 //初始化时的地图层级
    @observable zoom = 10 //监听zoom
    @observable tileUrl = "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"

    @action
    update = (value,key) =>{
        this[key] = value
    }
}