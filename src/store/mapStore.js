import { observable, action } from 'mobx'

export default class mapStroe{
    @observable zoom = 10
    @observable tileUrl = "http://15.75.0.255:25003/v{s}/tile?x={x}&y={y}&z={z}";

    @action
    update = (value,key) =>{
        this[key] = value
    }
}