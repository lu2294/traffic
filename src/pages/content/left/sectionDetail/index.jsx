import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Moment from 'moment';
import { Button, Space } from 'antd';
import ScrollTable from '../../../../components/scrollTable';
import Card from '../../../../components/card';
import './index.scss';



@inject('RoadIndicatorStore', 'video')
@observer
class SectionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0
        }
    }
    componentDidMount() {
        // this.props.RoadIndicatorStore.selectDetailInfo();
    }
    componentWillUpdate() {
        // this.props.RoadIndicatorStore.selectDetailInfo();
    }

    handleClick = (index) => {
        this.setState({
            currentIndex: index
        })
    }
    render() {
        const { currentIndex } = this.state;
        const { RoadIndicatorStore, video } = this.props;
        const { sectionTableData, onShowSection } = RoadIndicatorStore;
        // const types = ['实时', '当日']
        const columns = [
            {
                title: '序号',
                align: 'center',
                width: '8%',
                render: (data, record, index) => {
                    return index + 1
                }
            },
            {
                title: '事件类型',
                align: 'center',
                width: '12%',
                dataIndex: 'eventType',
                render: (text) => {
                    return <span className='text-yellow'>{text}</span>
                }
                // width: '0.8rem',
            },
            {
                title: '车牌号',
                align: 'center',
                dataIndex: 'jdchpzl',
                // width: '14%',
                render: (text) => {
                    return <span className='text-yellow'>{text}</span>
                },
                // width: '0.8rem',
            },
            {
                title: '标签',
                align: 'center',
                dataIndex: 'label',
                ellipsis: true,
                render: (text) => {
                    return <span className='text-yellow'>{text}</span>
                },
                // width: '0.8rem',
            },
            {
                title: '事件状态',
                align: 'center',
                dataIndex: 'eventStatus',
                width: '12%',
                render: (text) => {
                    return text === 0 ? <span className="text-red">持续中</span> : <span className="text-green">已解决</span>
                }
                // width: '0.8rem',
            },
            {
                title: '持续时间',
                align: 'center',
                dataIndex: 'duration',
                // width: '20%',
                render: (text) => {
                    return <span className='text-yellow'>{text}</span>
                },
            },
            {
                title: '持续时长',
                dataIndex: 'lengthTime',
                width: '12%',
                align: 'center',
                render: (text) => {
                    return <span className='text-yellow'>{Moment(text).format("mm'ss''")}</span>
                },
                // width: '0.8rem',
            },
            {
                title: '操作',
                width: '21%',
                align: 'center',
                render: (data, record, index) => {
                    return (
                        <Space>
                            <a className="text-blue" onClick={() => video.useVideo(2)}>实时</a>
                            <a className="text-blue" onClick={() => video.useVideo(2)}>回放</a>
                            <a className="text-blue" onClick={() => RoadIndicatorStore.onShowVehicle(record)}>一车一档</a>
                        </Space>
                    )
                }

            }
        ];

        return (
            <div className="section-detail" >
                <Card title={RoadIndicatorStore.sectionTitle} onClose={onShowSection} closable>
                    {/* <div className="btn-box">
                        {types.map((it, index) => <Button key={it} size='default' onClick={() => this.handleClick(index)} className={currentIndex === index ? 'btn-style1' : 'btn-style2'} >{it}</Button>)}
                    </div> */}
                    <div className="top-margin"></div>
                    <ScrollTable rowkey="eventId" columns={columns} data={sectionTableData}></ScrollTable>
                    <div className="top-margin2"></div>
                </Card>
            </div>
        )
    }
}
export default SectionDetail;