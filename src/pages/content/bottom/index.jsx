import React from 'react';
import './index.scss';
import { inject } from "mobx-react"
import { toJS } from 'mobx'
import mapboxgl from 'mapbox-gl';
import BottomLine from '../../components/bottomLine'

@inject("map")
class Bottom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            check1: true,
            check2: true,
        }
        this.InitData = []
    }
    removeMapLayer = () => {
        const { spotMarkerList,spotData1,update } = this.props.map;
        this.setState({ check1: !this.state.check1 }, () => {
            if(this.state.check1){
               const spotMarker1 = this.drawSpot(spotData1);
               update(spotMarker1,'spotMarkerList');
            }else{
                spotMarkerList.map((v) => {
                    if (v) {
                        v.remove()
                    }
                })
            }
        })        
        // const map = window.mainMap;
        // map.removeLayer('line1');       

        // map.removeSource("line1");
    }
    removeMapLayer1 = () => {
        const { spotMarkerList1,spotData2,update } = this.props.map;
        this.setState({ check2: !this.state.check2 }, () => {
            if(this.state.check2){
                const spotMarker2 = this.drawSpot(spotData2);
                update(spotMarker2,'spotMarkerList1');
             }else{
                 spotMarkerList1.map((v) => {
                     if (v) {
                         v.remove()
                     }
                 })
             }
        })
        // spotMarkerList.map((v) => {
        //     if (v) {
        //         v.remove()
        //     }
        // })
        // const map = window.mainMap;
        // map.removeLayer('line1');       

    }
    // sortData = (datas) => {
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

    //     return [...list, ...nextData]
    // }
    // 地图定位事件
    drawSpot = (data) => {
        const map = window.map;
         const that = this;
         let list = []
         data.forEach((v)=>{
             list.push({
                 "type": "Feature",
                 // "status":v.eventStatus,
                 "color": v.eventstatus === '1' ? 'type1' : 'type2',
                 "data":v,
                 "properties":
                 {
                     "marker-color": "#008000",
                     "marker-size": "medium",
                     "marker-symbol": "",
                     "name": "杭州"
                 },
                 "geometry": {
                     "type": "Point",
                     "coordinates": [v.lng, v.lat]
                 }
             })
         })
         let markerList = []
         var geojson = {
             "type": "FeatureCollection",
             "features":list
                 
         };
         geojson.features.forEach(function (marker) {
             let el = document.createElement('div');
             let el1 = document.createElement('p');
             el.appendChild(el1);
             if (marker.color === 'type1') {
                 el.className = 'marker';
             } else {
                 el.className = 'marker1';
             }
             const markerLayer = new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).setPopup(
                 new mapboxgl.Popup(
                     {
                         anchor: "bottom",
                         offset: [5, -10],
                         className: "popup"
                     }
                 ).setHTML(that.renderHtml(marker.data)))
                 .addTo(map)
             markerList.push(markerLayer)
             // var el2 = document.createElement('span');
             // el1.appendChild(el2);
             // el.addEventListener('click', function (e) {
             // });
     
         });
         return markerList
     };
     // 点击事件页面
     renderHtml(data) {
         return `<div class="popup-content">
             <ul>
                 <li><span>事件类型 ：</span><span>${data.eventtitle}</span></li>
                 <li><span>事件时间 ：</span><span>${data.dwAbsTime}</span></li>
                 <li><span>所属路段 ：</span><span>杨高南路</span></li>
                 <li><span>事件状态 ：</span><span>${data.eventStatus == '1'? '已处置' :'未处置'}</span></li>
             </ul>
             <div class="popup-content-bottom">
                 <div>实时</div>
                 <div>回放</div>
                 <div>一车一档</div>
                 <div>完成处置</div>
             </div>
         </div>`
     }
    componentDidMount() {
        const { data } = this.props;
        const newData = toJS(data);
        this.InitData = newData;
        // this.setState({ data: newData.length > 6 ? newData.slice(0, 6) : newData })
        this.setState({ data: newData })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            const newData = toJS(nextProps.data);
            this.InitData = newData;
            this.setState({ data: newData })
        }
    }
    //前一个
    prevOnclick = () => {
        const data = this.InitData.slice();
        const upRdsegId = (this.state.data[0] && this.state.data[0].upRdsegId) ?
            this.state.data[0].upRdsegId : null;
        if (!upRdsegId) {
            return false;
        } else {
            const firstId = this.state.data[0].rdsegId;
            const findIndex = data.findIndex(v => v.rdsegId == firstId);
            this.setState({ data: data.splice(findIndex - 1, 6) })
        }
    }
    //后一个
    nextOnclick = () => {
        const data = this.InitData.slice();
        const downId = (this.state.data[this.state.data.length - 1] && this.state.data[this.state.data.length - 1].dowRdsegId) ?
            this.state.data[this.state.data.length - 1].dowRdsegId : null;
        if (!downId) {
            return false;
        } else {
            const firstId = this.state.data[0].rdsegId;
            const findIndex = data.findIndex(v => v.rdsegId == firstId);
            this.setState({ data: data.splice(findIndex + 1, 6) })
        }

    }
    lineClick = (id) => {
        const data = this.InitData.slice();
        if (id == 0 || id == 1 || id == 2 || (id == data.length - 1) || (id == data.length - 2)) {
            return false;
        } else {
            const findIndex = data.findIndex(v => v.SortID == id);
            this.setState({ data: data.splice(findIndex - 2, 6) })
        }
    }
    render() {
        const { check1, check2 } = this.state;
        return (
            <div className="bottom-content">
                <div className="left">
                    <div className={`icon ${check1 ? '' : 'checkfalse'}`} onClick={this.removeMapLayer.bind(this, '333')}>
                        <div className="icon-img2"></div>
                        <div className="icon-font">未处置</div>
                    </div>
                    <div className={`icon ${check2 ? '' : 'checkfalse'}`} onClick={this.removeMapLayer1.bind(this, '333')}>
                        <div className="icon-img1"></div>
                        <div className="icon-font">已处置</div>
                    </div>
                    {/* <div className="icon icon-grid" onClick={this.prevOnclick.bind(this)}>
                        <div className="icon-img3"></div>
                        <div className="icon-font1">前一段</div>
                    </div> */}
                </div>
                <BottomLine data={this.state.data} lineClick={this.lineClick.bind(this)} />
                <div className="right">
                    {/* <div className="icon icon-grid" onClick={this.nextOnclick.bind(this)}>
                        <div className="icon-font1">后一段</div>
                        <div className="icon-img4"></div>
                    </div> */}
                    {/* <div className="icon gird-absolute">
                        <div className="icon-img5"></div>
                        <div className="icon-font">对向车道</div>
                    </div> */}
                </div>
            </div>
        )

    }
}

export default Bottom