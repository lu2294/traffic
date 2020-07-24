import { observable, action } from 'mobx'

export default class mapStroe{
    @observable zoom = 10
    @observable tileUrl = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"

    @action
    update = (value,key) =>{
        this[key] = value
    }
}