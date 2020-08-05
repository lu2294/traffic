import React, { Component } from 'react';
import './index.scss';
import { Space } from 'antd';
import PageUpTable from '../../../../components/pageUpTable';
import Card from '../../../../components/card';


export default class SectionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '车辆详情'
        }
    }
    render() {
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
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                key: i,
                name: `${i}`,
                age: 32,
                address: `道路${i}`,
            });
        }
        return (
            <div className="vehicle-detail">
                <Card title={this.state.title} closable>
                    <div className="vehicle-info">
                        <div className="vehicle-title">车辆信息</div>
                        <div className="vehicle-content">
                            <div className="content-item">
                                <Space>
                                    <span>车牌号:</span>
                                    <span>沪A12345</span>
                                </Space>
                            </div>
                            <div className="content-item">
                                <Space>
                                    <span>车牌号:</span>
                                    <span>沪A12345</span>
                                </Space>
                            </div>
                            <div className="content-item">
                                <Space>
                                    <span>车牌号:</span>
                                    <span>沪A12345</span>
                                </Space>
                            </div>
                            <div className="content-item">
                                <Space>
                                    <span>车牌号:</span>
                                    <span>沪A12345</span>
                                </Space>
                            </div>
                        </div>
                    </div>
                    <PageUpTable title={'驾驶员信息'} columns={columns2} data={data}></PageUpTable>
                </Card>
            </div>
        )

    }
}