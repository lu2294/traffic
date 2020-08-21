import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'

import './index.scss';


function itemRender(current, type, originalElement) {
    if (type === 'prev') {
        return (<Button size='default' className="btn-style"><LeftOutlined /><span>上一页</span></Button >);
    }
    if (type === 'next') {
        return (<Button size='default' className="btn-style"><span>下一页</span><RightOutlined /></Button>);
    }
    return originalElement;
}

export default class PageUpTable extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { columns, data, title } = this.props;
        return (
            <div className="pageup-table">
                <Table
                    title={() => <span style={{ 'color': '#fff' }}>{title}</span>}
                    columns={columns}
                    dataSource={data}
                    bordered
                    locale={{ emptyText: '暂无数据' }}
                    pagination={{ 'pageSize': 4, 'itemRender': itemRender, 'simple': true }}
                    rowClassName={(record, index) => { return index % 2 === 0 ? ' style1' : 'style2' }}
                />
                <div className="top-margin"></div>
            </div>
        )

    }
}

PageUpTable.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.array,
    data: PropTypes.array,
}