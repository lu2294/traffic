import React, { Component } from 'react';


class MapPop extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    handleLive = ()=>{
        alert('ddd')
    }
    render() {
        const {data} = this.props;
        return (
            <div className="popup-content" onClick={this.handleLive.bind(this)}>
            <ul>
                <li><span>事件类型 ：</span><span>${data.eventtitle}</span></li>
                <li><span>事件时间 ：</span><span>${data.dwAbsTime}</span></li>
                <li><span>所属路段 ：</span><span>杨高南路</span></li>
                <li><span>事件状态 ：</span><span>${data.eventStatus == 1 ? '已处置' : '未处置'}</span></li>
            </ul>
            <div className="popup-content-bottom">
                <button onClick={()=>{this.handleLive()}}>回放</button>
                <div>一车一档</div>
                <div>完成处置</div>
            </div>
        </div>
        )

    }
}

export default MapPop;

