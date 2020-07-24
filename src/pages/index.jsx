import React from 'react';
import { Layout, Menu } from 'antd';
import './index.scss';
import HeaderContent from './content/header';
import Map from './content/map';
import Left from './content/left';
import Right from './content/right';
const { Header, Footer, Sider, Content } = Layout;


export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }
    render() {
        return (<>
        <HeaderContent/>
        <div className="monitor">
            <Map/>

            <Left/>
            <Right/>
        </div>
        </>
        )

    }
}