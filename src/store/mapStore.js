import { observable, action } from 'mobx'

export default class mapStroe{
    @observable zoom = 10
    @observable tileUrl = "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"

    @action
    update = (value,key) =>{
        this[key] = value
    }
}