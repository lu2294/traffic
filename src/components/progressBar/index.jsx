import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types'
import { DatePicker, TimePicker, Button, Slider, Space } from 'antd';
import PauseImg from '../../assets/imgs/pause.png';
import RefreshImg from '../../assets/imgs/refresh.png';
import './index.scss';


export default class ProgressBar extends Component {
    constructor(props) {
        super(props)
    }

    onDateChange = (date, dateString) => {
        console.log(date, dateString);
    }

    onTimeChange = (time, timeString) => {
        console.log(time, timeString);
    }

    render() {
        // const { columns, data, title } = this.props;
        const format = 'HH:mm';
        return (
            <div className="progress-bar">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Space>
                        <DatePicker onChange={this.onDateChange} />
                        <TimePicker
                            className="time-picker"
                            onChange={this.onTimeChange}
                            defaultValue={moment('00:00', 'HH:mm')}
                            format='HH:mm'
                        />
                        <Button type="primary">实时</Button>
                    </Space>
                    <Space>
                        <div className="play-btn">
                            <img src={RefreshImg} alt="" />
                        </div>
                        <div className="play-btn">
                            <img src={PauseImg} alt="" />
                        </div>
                        <div className="play-btn2">
                            倍速
                        </div>
                    </Space>
                </div>

                <br></br>
                <div className="silider">
                    <div className="time-start">8:00</div>
                    <Slider tipFormatter={null}></Slider>
                    <div className="time-end">9:00</div>

                </div>
                <div className="current-road">
                    广东路-广东路这是一段很长很长很长很长出差出差出差出差很长很长很长的路段…
                </div>
            </div>
        )

    }
}

ProgressBar.propTypes = {
    // title: PropTypes.string,
    // columns: PropTypes.array,
    // data: PropTypes.array,
}