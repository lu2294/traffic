import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types'
import { DatePicker, TimePicker, Button, Slider, Space } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import PauseImg from '../../assets/imgs/pause.png';
import RefreshImg from '../../assets/imgs/refresh.png';
import './index.scss';
import { observer, inject } from 'mobx-react';

@inject('CommonStore')
@observer
class ProgressBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // const { columns, data, title } = this.props;
        const format = 'HH:mm';
        const { CommonStore } = this.props;
        const { dateValue, isPlay, max, sliderValue, timeValue, isReal, startTime, endTime, speed } = CommonStore;
        return (
            <div className="progress-bar">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Space>
                        <DatePicker value={dateValue} onChange={CommonStore.onDateChange} />
                        <TimePicker.RangePicker
                            className="time-picker"
                            onChange={CommonStore.onTimeChange}
                            format='HH:mm'
                            value={timeValue}
                        />
                        {
                            (isReal === 0) &&
                            (
                                <Button type="primary" onClick={() => {
                                    CommonStore.onTimeChange()
                                }}>实时</Button>
                            )
                        }
                    </Space>
                    {
                        (isReal === 0) &&
                        (
                            <Space>
                                <div className="play-btn" onClick={CommonStore.onRefresh}>
                                    <img src={RefreshImg} alt="" />
                                </div>
                                {
                                    isPlay ? (
                                        <div className="play-btn" onClick={CommonStore.onRoadEventPaused}>
                                            <img src={PauseImg} alt="" />
                                        </div>
                                    ) : (
                                            <div className="play-btn" onClick={CommonStore.onRoadEventPlay}>
                                                <PlayCircleOutlined className="icon-style" />
                                            </div>
                                        )
                                }
                                <div className="play-btn2" onClick={CommonStore.changeSpeed}>
                                    {speed}倍速
                            </div>
                            </Space>
                        )
                    }

                </div>
                <div className="silider">
                    <div className="time-start">{startTime ? startTime : '-- : --'}</div>
                    <Slider disabled={isReal === 1} onChange={CommonStore.onSliderChange} value={sliderValue} max={max} tipFormatter={null}></Slider>
                    {/* <Progress percent={30} strokeWidth={4} /> */}
                    <div className="time-end">{endTime ? endTime : '-- : --'}</div>

                </div>
            </div>
        )

    }
}

ProgressBar.propTypes = {
}

export default ProgressBar;