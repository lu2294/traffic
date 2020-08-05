import React from 'react';
import './index.scss';
import { inject } from "mobx-react"
import BottomLine from '../../components/bottomLine'

@inject("map")
class Bottom extends React.Component {
    state = {
        check1: true,
        check2: true,
    }
    removeMapLayer = (data) => {
        const { spotMarkerList } = this.props.map;
        this.setState({check1:!this.state.check1},()=>{
            console.log(this.state.check1,88)
        })
        spotMarkerList.map((v) => {
            if (v) {
                v.remove()
            }
        })
        // const map = window.mainMap;
        // console.log(map.style._layers)//获取全部线图层
        // map.removeLayer('line1');       

        // map.removeSource("line1");
    }
    removeMapLayer1 = (data) => {
        const { spotMarkerList } = this.props.map;
        this.setState({check2:!this.state.check2},()=>{
            console.log(this.state.check2,88)
        })
        // spotMarkerList.map((v) => {
        //     if (v) {
        //         v.remove()
        //     }
        // })
        // const map = window.mainMap;
        // console.log(map.style._layers)//获取全部线图层
        // map.removeLayer('line1');       

        // map.removeSource("line1");
    }
    render() {
        const { check1,check2 } = this.state;
        return (
            <div className="bottom-content">
                <div className="left">
                    <div className={`icon ${check1 ? '' : 'checkfalse'}`} onClick={this.removeMapLayer.bind(this, '333')}>
                        <div className="icon-img1"></div>
                        <div className="icon-font">已处置</div>
                    </div>
                    <div className={`icon ${check2 ? '' : 'checkfalse'}`} onClick={this.removeMapLayer1.bind(this, '333')}>
                        <div className="icon-img2"></div>
                        <div className="icon-font">未处置</div>
                    </div>
                    <div className="icon icon-grid">
                        <div className="icon-img3"></div>
                        <div className="icon-font1">前一段</div>
                    </div>
                </div>
                <BottomLine />
                <div className="right">
                    <div className="icon icon-grid">
                        <div className="icon-font1">后一段</div>
                        <div className="icon-img4"></div>
                    </div>
                    <div className="icon gird-absolute">
                        <div className="icon-img5"></div>
                        <div className="icon-font">对向车道</div>
                    </div>
                </div>
            </div>
        )

    }
}

export default Bottom