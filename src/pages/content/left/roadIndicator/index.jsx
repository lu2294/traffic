import React, { Component } from 'react';
import SearchBar from '../../../../components/searchBar'
import Card from '../../../../components/card'
import ScrollTable from '../../../../components/scrollTable'
import ProgressBar from '../../../../components/progressBar';
import closeImg from '../../../../assets/imgs/close.svg'
import openImg from '../../../../assets/imgs/open.svg'
import './index.scss';

export default class RoadIndicator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            collapsable: true
        }
    }
    handleSearch = () => {
        console.log('handleSearch')
    }
    render() {
        const columns = [
            {
                title: '指数',
                dataIndex: 'name',
                render: (text, record, index) => {
                    return (
                        <span className="text-red">{text}</span>
                        // <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '道路全长',
                dataIndex: 'age',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '平均时速',
                dataIndex: 'address',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '在途量/承载力',
                dataIndex: 'address',
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
                dataIndex: 'address',
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
                dataIndex: 'address',
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
                dataIndex: 'address',
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
                dataIndex: 'address',
                render: (text, record, index) => {
                    return (
                        // <a className="text-red">{text}</a>
                        <a className="text-blue">详情</a>
                        // <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
        ];
        const columns2 = [
            {
                title: '指数',
                dataIndex: 'name',
                render: (text, record, index) => {
                    return (
                        // <a className="text-red">{text}</a>
                        // <a className="text-blue">详情</a>
                        <span className={index % 2 == 0 ? 'text-yellow' : 'text-green'}>{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '道路名称',
                dataIndex: 'age',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '道路长度',
                dataIndex: 'address',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '实时均数',
                dataIndex: 'address',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '拥堵时间(本周平均每日)',
                dataIndex: 'address',
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
                dataIndex: 'address',
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
                dataIndex: 'address',
                render: (text, record, index) => {
                    return (
                        <a className="text-blue">详情</a>
                    )
                }
            },
        ];
        const columns3 = [
            {
                title: '评级',
                dataIndex: 'name',
                render: (text, record, index) => {
                    return (
                        // <a className="text-red">{text}</a>
                        // <a className="text-blue">详情</a>
                        <span className={index % 2 == 0 ? 'text-red' : 'text-green'}>{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '道路名称',
                dataIndex: 'age',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '排队长度',
                dataIndex: 'address',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '是否溢出',
                dataIndex: 'address',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '饱和度',
                dataIndex: 'address',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
            {
                title: '拥堵方向数/ 方向总数',
                dataIndex: 'address',
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
                dataIndex: 'address',
                render: (text, record, index) => {
                    return (
                        // <span className="text-red">{text}</span>
                        <span className="text-yellow">{text}</span>
                        // <span className="text-blue">{text}</span>
                    )
                }
            },
        ];
        const columns4 = [
            {
                title: '评级',
                dataIndex: 'name',
            },
            {
                title: '道路名称',
                dataIndex: 'age',
            },
            {
                title: '排队长度',
                dataIndex: 'address',
            },
            {
                title: '是否溢出',
                dataIndex: 'address',
            },
            {
                title: '饱和度',
                dataIndex: 'address',
            }
        ];
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                key: i,
                name: `${i}`,
                age: 32,
                address: `道路${i}`,
            });
        }
        const data2 = [];
        for (let i = 0; i < 1; i++) {
            data2.push({
                key: i,
                name: `${i}`,
                age: 32,
                address: `道路${i}`,
            });
        }
        return (
            <div className="roadIndicator">
                <Card title="道路运行指标">
                    <SearchBar handleSearch={this.handleSearch} placeHolder={"请输入道路名称"}></SearchBar>
                    <ProgressBar />
                    <ScrollTable title={'全道路指标'} columns={columns} data={data2}></ScrollTable>
                    {
                        !this.state.collapsable &&
                        (
                            <>
                                <ScrollTable title={'路段'} columns={columns2} data={data}></ScrollTable>
                                <ScrollTable title={'路口'} columns={columns3} data={data}></ScrollTable>
                            </>
                        )
                    }
                    <div className="image-warpper" onClick={() => {
                        this.setState({
                            collapsable: !this.state.collapsable
                        })
                    }}>
                        {this.state.collapsable ? (<img src={openImg} className="image-svg" />) : (
                            <img src={closeImg} className="image-svg" />
                        )}
                    </div>
                    <div className="top-margin"></div>

                </Card>
            </div>
        )

    }
}