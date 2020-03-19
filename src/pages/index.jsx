import React from 'react';
import { Layout, Menu } from 'antd';
import {
    // BrowserRouter as Router,
    Route,
    BrowserRouter,
    // Switch,
    Link
} from 'react-router-dom';
import './index.scss';
import HeaderContent from './header';
import {
    MenuUnfoldOutlined,
    AreaChartOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import Maps from './content/map'
import Pic from './content/pic'
const { Header, Footer, Sider, Content } = Layout;


export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }
    handleClick = (e) => {
        console.log(e)
    }
    render() {
        return (<Layout className="main-content">
            <Header className="main-header">
                {/* <HeaderContent /> */}
            </Header>
            <BrowserRouter>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo" />
                        <Menu onClick={this.handleClick} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <AreaChartOutlined />
                                <span>地图</span>
                                <Link to='/map'></Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <VideoCameraOutlined />
                                <span>图片</span>
                                <Link to='/pic'></Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <UploadOutlined />
                                <span>nav 3</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                            <Route path='/' exact component={Maps}></Route>
                            <Route path='/pic' exact component={Pic}></Route>
                            <Route path='/map' exact component={Maps}></Route>
                    </Content>
                </Layout >
            </BrowserRouter>
            {/* <Footer>Footer</Footer> */}
        </Layout >
        )

    }
}