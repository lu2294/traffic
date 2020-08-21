import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SearchBar from '../../../../components/searchBar';
import Card from '../../../../components/card';
import ScrollTable from '../../../../components/scrollTable';
import ProgressBar from '../../../../components/progressBar';
import closeImg from '../../../../assets/imgs/close.svg';
import openImg from '../../../../assets/imgs/open.svg';
import './index.scss';
import { Spin, Space } from 'antd';


@inject('CommonStore', 'RoadIndicatorStore')
@observer
class RoadIndicator extends Component {
    onFixedLocation = (record) => {
        const data = [record.lng, record.lat];
        const map = window.map;
        map && map.flyTo({
            center: data,
            zoom: 18,
            bearing: 0,
            speed: 1,
            curve: 1,
            easing: function (t) { return t; }
        });
        this.props.RoadIndicatorStore.fixedLocation();
    }
    render() {
        const { CommonStore, RoadIndicatorStore } = this.props;
        const { collapsed, onExpandPanel, onShowSection, hideRoadPanel } = RoadIndicatorStore;
        const roadColumns = [
            {
                title: '指数',
                dataIndex: 'effIndex',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <span className={text > 30 ? (text > 60 ? "text-green" : "text-yellow") : "text-red"}>
                            {Number(text).toFixed(2)}
                            {text > 30 ? (text > 60 ? "畅通" : "缓行") : "拥堵"}
                        </span>
                    )
                }
            },
            {
                title: '道路全长',
                dataIndex: 'roadLength',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}m</span>
                        // <span className="text-yellow">{(text / 1000).toFixed(2)}km</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '平均时速',
                dataIndex: 'avgSpeed',
                width: '18%',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text.toFixed(1)}km/h</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '在途量/承载力',
                width: '18%',
                align: 'center',
                dataIndex: 'bearingCapacity',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '路段数',
                align: 'center',
                dataIndex: 'roadSectionNum',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '拥堵路段数',
                width: '15%',
                align: 'center',
                dataIndex: 'congestedRoadNum',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '事件数',
                dataIndex: 'eventNum',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '操作',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        // <a className="text-red">{text}</a>
                        <a className="text-blue" onClick={() => onShowSection(record, 1)}>详情</a>
                        // <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
        ];
        const sectionColumns = [
            {
                title: '指数',
                dataIndex: 'effIndex',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <>
                            <span className={text > 30 ? (text > 60 ? "text-green" : "text-yellow") : "text-red"}>
                                {Number(text).toFixed(2)}
                                {text > 30 ? (text > 60 ? "畅通" : "缓行") : "拥堵"}
                            </span>
                        </>
                    )
                }
            },
            {
                title: '路段名称',
                dataIndex: 'rdsegName',
                align: 'center',
                width: '24%',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '路段长度',
                dataIndex: 'rdsegLen',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}m</span>
                        // <span className="text-yellow">{(text / 1000).toFixed(2)}km</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '实时均速',
                dataIndex: 'avgRdsegRoadSpeed',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text.toFixed(1)}km/h</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '拥堵时间(本周日均)',
                dataIndex: 'congestionTime',
                align: 'center',
                width: '15%',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow" > {text ? text : '0'}h </span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '事件数',
                dataIndex: 'rdsegRoadEventNum',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <span className="text-yellow" > {text ? text : '0'} </span>
                        // <span className="text-red">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '操作',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <a className="text-blue" onClick={() => onShowSection(record, 0)}>详情</a>
                    )
                }
            },
        ];
        const crossingColumns = [
            {
                title: '序号',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <span>{index + 1}</span>
                    )
                }
            },
            {
                title: '路口名称',
                align: 'center',
                dataIndex: 'interName',
                width: '30%',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text && text.replace('与', '-')}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '排队长度',
                align: 'center',
                dataIndex: 'queueLength',
                render: (text, record, index) => {
                    return (
                        // <span className="text-yellow">{text}米</span>
                        <span className="text-yellow">--</span>
                    )
                }
            },
            {
                title: '是否溢出',
                align: 'center',
                dataIndex: 'interOverflow',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">--</span>
                        // <span className="text-yellow">{text ? '是' : '否'}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '饱和度',
                align: 'center',
                dataIndex: 'saturation',
                render: (text, record, index) => {
                    return (
                        <span className="text-yellow">--</span>
                        // <span className="text-red">{text}</span>
                        // <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '拥堵方向数/ 方向总数',
                width: '15%',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">--/{record.directionNum}</span>
                        // <span className="text-yellow">{record.congestionDirectionNum}/{record.directionNum}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '操作',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <a className="text-blue" onClick={() => this.onFixedLocation(record)}>定位</a>
                    )
                }
            },
        ];

        const allRoadsColums = [
            {
                title: '序号',
                render: (text, record, index) => {
                    return <span>{index + 1}</span>
                }
            },
            {
                title: '道路名称',
                width: '90%',
                render: (text, record, index) => {
                    return <a className="text-yellow">{record.roadName} ({record.direction})</a>
                }
            }
        ]
        return (
            <div className={hideRoadPanel ? "roadIndicator left-hide" : "roadIndicator"}>
                {/* <Spin> */}
                <Card title="道路运行指标" isHide onHide={RoadIndicatorStore.onHide}>
                    <SearchBar placeHolder="请输入道路名称" handleSearch={RoadIndicatorStore.searchRoad}></SearchBar>
                    <ProgressBar />
                    {RoadIndicatorStore.showSearchResult && (
                        <ScrollTable onRow={RoadIndicatorStore.selectCurrentRoad} rowKey={(record) => { return record.roadName + record.direction }} columns={allRoadsColums} data={RoadIndicatorStore.searchRoadData}></ScrollTable>
                    )}

                    {
                        !RoadIndicatorStore.showSearchResult &&
                        (
                            <>
                                <div className="current-road">
                                    {CommonStore.currentRoad}
                                </div>
                                <ScrollTable title={'全道路指标'} rowKey="droadId" columns={roadColumns} data={CommonStore.roadData}></ScrollTable>
                                <div className={!collapsed ? "show-part" : "hide-part"}>
                                    <>
                                        <ScrollTable rowKey="rdsegId" title={'路段'} columns={sectionColumns} data={CommonStore.rdsegInfoList}></ScrollTable>
                                        <ScrollTable rowKey="interId" title={'路口'} columns={crossingColumns} data={CommonStore.interList}></ScrollTable>
                                    </>
                                </div>
                                <div className="image-wrapper" onClick={onExpandPanel}>
                                    {!collapsed ? (<img src={closeImg} className="image-svg" />) : (
                                        <img src={openImg} className="image-svg" />
                                    )}
                                </div>
                            </>
                        )
                    }
                    <div className="top-margin"></div>
                </Card>
                {/* </Spin> */}

            </div >
        )

    }
}

export default RoadIndicator;