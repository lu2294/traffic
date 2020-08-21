import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Space } from 'antd';
import PageUpTable from '../../../../components/pageUpTable';
import Card from '../../../../components/card';
import './index.scss';

@inject('RoadIndicatorStore')
@observer
class VehicleDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '车辆详情'
        }
    }

    componentDidMount() {
        // this.props.RoadIndicatorStore.selectVehicleInfo();
    }

    render() {
        const { RoadIndicatorStore } = this.props;
        const { onShowVehicle, vehicleDetailData } = RoadIndicatorStore;
        const columns = [
            {
                title: '序号',
                render: (data, record, index) => {
                    return index + 1
                }
            },
            {
                title: '姓名',
                dataIndex: 'dsr',
                render: (text) => {
                    return <span className='text-yellow'>{text}</span>
                },
                ellipsis: true
            },
            {
                title: '电话号码',
                dataIndex: 'dh',
                render: (text) => {
                    return <span className='text-yellow'>{text}</span>
                },
            },
            {
                title: '违法记录(最近一年)',
                dataIndex: 'wfjl',
                render: (text) => {
                    return <span className='text-yellow'>{text}</span>
                },
                ellipsis: true
            },
            {
                title: '最近违法日期',
                dataIndex: 'wfsj',
                render: (text) => {
                    return <span className='text-yellow'>{text}</span>
                },
                ellipsis: true
            },
            {
                title: '最近违法详情',
                // width: '10%',
                dataIndex: 'wfms',
                render: (text) => {
                    return <span className='text-yellow'>{text}</span>
                },
                ellipsis: true
            }
        ];

        return (
            <div className="vehicle-detail">
                <Card title={this.state.title} onClose={onShowVehicle} closable>
                    <div className="vehicle-info">
                        <div className="vehicle-title">车辆信息</div>
                        <div className="vehicle-content">
                            <div className="content-item">
                                <Space>
                                    <span>车牌号:</span>
                                    <span>{vehicleDetailData.dwjjdd?.jdchphm}</span>
                                </Space>
                            </div>
                            <div className="content-item">
                                <Space>
                                    <span>车主属性:</span>
                                    <span>{vehicleDetailData.dwjjdd?.jdcsyq}</span>
                                </Space>
                            </div>
                            <div className="content-item">
                                <Space>
                                    <span>单位名称:</span>
                                    <span>{vehicleDetailData.dwjjdd?.jdcsyrmc}</span>
                                </Space>
                            </div>
                            <div className="content-item">
                                <Space>
                                    <span>联系电话</span>
                                    <span>{vehicleDetailData.dwjjdd?.lxdh}</span>
                                </Space>
                            </div>
                            <div className="content-item">
                                <Space>
                                    <span>联系地址:</span>
                                    <span>{vehicleDetailData.dwjjdd?.zsdzmc}</span>
                                </Space>
                            </div>
                        </div>
                    </div>
                    <PageUpTable title={'驾驶员信息'} columns={columns} data={vehicleDetailData.violationList}></PageUpTable>
                </Card>
            </div>
        )

    }
}

export default VehicleDetail;