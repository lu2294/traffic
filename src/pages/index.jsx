import React from "react";
import ScaleBox from "react-scale-box";
import "./index.scss";
import HeaderContent from "./content/header";
import Maps from "./content/reactMapbox";
// import Map from './content/mapbox';
import Left from "./content/left";
import Right from "./content/right";
import Bottom from "./content/bottom";
import ToggleRightButton from "./content/toggleRightButton";
import ToggleLeftButton from "./content/toggleLeftButton";
import HomePopup from "./content/homePopup";
import FirstVideo from "../components/firstVideo";
import SecondVideo from "../components/secondVideo";
// import Video from '../components/video'
import zh_CN from "antd/lib/locale-provider/zh_CN";
// import moment from 'moment';
import "moment/locale/zh-cn";
import { ConfigProvider } from "antd";
import { observer, inject } from "mobx-react";

@inject("CommonStore", "echart",'video')
@observer
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.CommonStore.init();
    this.props.echart.getRightDataInterval();
  }
  render() {
    const { rdsegInfoList } = this.props.CommonStore;
    const { showVideoFirst,firstVideoUrl,closeVideoFirst } = this.props.video;
    return (
      <ConfigProvider locale={zh_CN}>
        <HeaderContent />
        <Maps data={rdsegInfoList} />
        <ToggleLeftButton />
        <Left />
        <FirstVideo showVideoFirst={showVideoFirst} firstVideoUrl={firstVideoUrl} closeVideoFirst={closeVideoFirst} />
        <SecondVideo />
        <Right />
        <ToggleRightButton />
        <Bottom data={rdsegInfoList} />
        <HomePopup />
      </ConfigProvider>
    );
  }
}

export default Index;
