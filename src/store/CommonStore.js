import { observable, action } from 'mobx';

class Store {
    @observable a = 1;
    @action aa=()=>{
        console.log(123)
    }

}

const store = new Store();
export default store;