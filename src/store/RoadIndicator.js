import { observable, action, flow } from 'mobx';

class Store {
    @observable collapsed = false;
    @observable showSectionDetail = true;
    @observable showVehicleDetail = true;

    @action
    onExpandPanel = () => {
        this.collapsed = !this.collapsed;
    }
    @action
    onShowSection = () => {
        this.showSectionDetail = !this.showSectionDetail;
    }
    @action
    onShowVehicle = () => {
        this.showVehicleDetail = !this.showVehicleDetail;
    }
    
    searchRoad = flow(function * (){
        const res = yield 
    })
}

const store = new Store();
export default store;