import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Table, Button, Space } from 'antd';
import './index.scss';

export default class ScrollTable extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { columns, data, title } = this.props;
        return (
            <div className="scroll-table">
                <Table
                    title={title ? () => <span style={{ 'color': '#fff' }}>{title}</span> : false}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    locale={{emptyText:<span>暂无数据</span>}}
                    rowClassName={(record, index) => { return index % 2 === 0 ? ' style1' : 'style2' }}
                    scroll={{ y: '1.6rem' }} />
            </div>
        )

    }
}

ScrollTable.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.array,
    data: PropTypes.array,
}
