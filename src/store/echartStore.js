import { observable, action,computed } from 'mobx'
import mapStore from './mapStore'
export default class echartStore{
    @observable target1 = 0 // 初始化指标
    @observable target2 = 0 // 初始化指标
    @observable target3 = 0 // 初始化指标
    @observable target4 = 0 // 初始化指标
    @observable pieData1 = [1,2,3] // 初始化饼图数据
    @observable pieData2 = [1,2,3] // 初始化饼图数据
    @observable pieData3 = [1,2,3] // 初始化饼图数据
    @observable lineData = [4,5,6] // 初始化折线图数据
    @observable switchType = ['类型','属地','标签','变道'] // 初始化类型选择按钮
    
    @computed get myC() {
        return this.pieData.length * 2
    }
    @computed get getV() {
        return mapStore.zoomInit
    }
    @action
    update = (value,key) =>{
        this[key] = value
    }
}