import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types'

import './index.scss';

export default class ScrollTable extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { columns, data, title, rowKey, onRow } = this.props;
        return (
            <div className="scroll-table">
                <Table
                    title={title ? () => <span style={{ 'color': '#fff' }}>{title}</span> : false}
                    columns={columns}
                    dataSource={data}
                    bordered
                    // loading
                    locale={{ emptyText: '暂无数据' }}
                    pagination={false}
                    rowKey={rowKey}
                    onRow={onRow}
                    className={data.length > 2 ? 'hasScroll' : ''}
                    scroll={data.length > 2 ? { y: '1.4rem' } : false}
                    rowClassName={(record, index) => { return index % 2 === 0 ? ' style1' : 'style2' }}
                />
            </div>
        )

    }
}

ScrollTable.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    rowId: PropTypes.string
}

ScrollTable.defaultProps = {
    rowId: 'id',
    onRow: null
}
