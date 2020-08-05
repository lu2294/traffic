import React from 'react';
import ScaleBox from 'react-scale-box';
import './index.scss';
import HeaderContent from './content/header';
import Maps from './content/reactMapbox';
// import Map from './content/mapbox';
import Left from './content/left';
import Right from './content/right';
import Bottom from './content/bottom';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';


export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }
    render() {
        return (
            <ConfigProvider locale={zh_CN}>
                <HeaderContent />
                <Maps />
                <Left />
                <Right />
                <Bottom />
            </ConfigProvider>
        )

    }
}