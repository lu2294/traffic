import React from "react";
import styled from "styled-components";
import closeIcon from "../../assets/imgs/close.png";

const Btn = styled.div`
    width:200px;
    height:200px;
    background:skyblue
    ${(props) => `color:${props.primary ? "white" : "red"}`}
    border:${(props) => (props.black ? "solid 3px black" : "")}
`;
const VideoWrapper = styled.div`
  z-index: 1002;
  position: absolute;
  top: ${(props) => (props.number === 1 ? "220px" : "540px")};
  left: 2040px;
  width: 440px;
  height: 320px;
  background: rgba(3, 16, 51, 0.7);
  border: 2px solid rgba(2, 77, 134, 1);
  border-radius: 5px;
  overflow: hidden;
`;

const VideoTitile = styled.div`
  width: 100%;
  padding-left: 16px;
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #00c8d1;
  background-color: rgba(36, 78, 128, 0.5);
  height: 40px;
  line-height: 40px;
`;

const CloseWrapper = styled.a`
  position: absolute;
  height: 16px;
  width: 16px;
  right: 12px;
  top: 12px;
`;
// 基本样式  以及根据属性加样式
class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClose = () => {
  };
  render() {
    const { number } = this.props;
    return (
      <VideoWrapper
        number={number}
        id={`video-slot` + number}
        ref={(aaa) => {
          this.foo = aaa;
        }}
      >
        <VideoTitile>雷视视频{number}</VideoTitile>
        <CloseWrapper onClick={this.handleClose}>
          <img src={closeIcon} alt="close" />
        </CloseWrapper>
        <div class="prism-player video-container" id="J_prismPlayer"></div>
      </VideoWrapper>
    );
  }
}
export default Video;
