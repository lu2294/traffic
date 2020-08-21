import React from 'react';
import './index.scss';

export default class Bottom extends React.Component {
    state = {
        colorOpticy:''
    }
    lineClickMap = (data,id) => {
        const map = window.map;
        map && map.flyTo({
            center: data,
            zoom: 18,
            bearing: 0,
            speed: 1,
            curve: 1,
            easing: function (t) { return t; }
        });
        this.setState({colorOpticy : id})
        // this.props.lineClick && this.props.lineClick(id)
    }

    render() {
        const { data } = this.props;
        const DataLength = data.length - 1;
        return (
            <div className="bottom-line">
                {data.length>0 && data.map((v, k) => {
                    let color = 'color3';
                    let color1 = 'color3-opticy';
                    const effIndex = v.effIndex;
                    if (1 < effIndex && effIndex < 31) {
                        color = 'color2'
                        color1 = 'color2-opticy'
                    } else if (30 < effIndex && effIndex < 61) {
                        color = 'color1'
                        color1 = 'color1-opticy'
                    }
                    const middleHtml = (<><span></span><span></span><span></span><span></span><span></span><span></span></>)
                    const lineHtml = (k !== DataLength ?
                        <div className={`line-up ${color}`}>
                            {middleHtml}
                            <div className="line-up-name">{v.endInterName}</div>
                        </div>
                        : null)
                    const opticy = (this.state.colorOpticy == v.SortID) ? color1 : ''
                    return (
                        <div className={`line ${color} hover ${opticy}`} key={v.id} onClick={this.lineClickMap.bind(this, [v.startLng, v.startLat],v.SortID)}>
                            {middleHtml}
                            {lineHtml}
                        </div>
                    )

                })}
                {/* <div className="line color1 hover1" onClick={this.lineClickMap.bind(this, 'SSSS')}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className="line-up color3">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="line color2 hover2">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className="line-up color1">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="line color1 hover1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className="line-up color2">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="line color3 hover3">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className="line-up color2">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="line color1 hover1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className="line-up color2">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="line color2 hover2">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> */}
            </div>
        )

    }
}