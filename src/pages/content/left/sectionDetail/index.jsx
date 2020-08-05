import React, { Component } from 'react';
import { Button } from 'antd';
import ScrollTable from '../../../../components/scrollTable';
import Card from '../../../../components/card';
import './index.scss';

export default class SectionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '详情：延安东路-陕西路路段'
        }
    }
    render() {
        const types = ['实时', '当日']
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
        return (
            <div className="section-detail">
                <Card title={this.state.title} closable>
                    <div className="btn-box">
                        {types.map(it => <Button key={it} size='default' className={it === '实时' ? 'btn-style1' : 'btn-style2'} >{it}</Button>)}
                    </div>
                    <div className="top-margin"></div>
                    <ScrollTable columns={columns4} data={data}></ScrollTable>
                </Card>
            </div>
        )
    }
}