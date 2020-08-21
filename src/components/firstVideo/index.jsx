import React from "react";
import "./index.scss";
import closeIcon from "../../assets/imgs/close.png";
import VideoPlayer from "../../pages/content/right/player";
// import Player from "aliplayer-react";
// import {
//   Player,
//   BigPlayButton,
//   ControlBar,
//   ReplayControl,
//   ForwardControl,
//   CurrentTimeDisplay,
//   TimeDivider,
//   PlaybackRateMenuButton,
//   VolumeMenuButton,
// } from "video-react";
// import "video-react/dist/video-react.css";
// import {toJS} from 'mobx'
// import numberPic1 from "../../assets/imgs/number1.JPG";
// import numberPic2 from "../../assets/imgs/number2.JPG";
// import { inject, observer } from "mobx-react";
// const config = {
//   source:
//     "http://15.112.169.121:8080/live/31010100001320999007.flv?type=SD&private=false&template=1080",
//   width: "440px",
//   height: "280px",
//   autoplay: true,
//   isLive: true,
//   rePlay: false,
//   playsinline: true,
//   preload: true,
//   controlBarVisibility: "hover",
//   useH5Prism: true,
//   components: [
//     {
//       name: "RateComponent",
//       type: Player.components.RateComponent,
//     },
//   ],
// };

class FirstVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.player = null;
    this.ele = null;
  }
  componentWillReceiveProps(prevProps) {
    if (this.props.firstVideoUrl !== prevProps.firstVideoUrl || this.props.showVideoFirst !== prevProps.showVideoFirst) {
      if(prevProps.firstVideoUrl !==''){
        setTimeout(() => {
          this.player = new VideoPlayer();
          this.ele = document.getElementById("video-slot1");
          window['player'] = this.player;
          this.player.play(prevProps.firstVideoUrl, this.ele, {
            liveStatus: 0,
            videoId: "J_prismPlayer",
          });
        }, 100);
      }
      
    }
  }
  componentDidMount() {
    // const { firstVideoUrl } = this.props.video;
    // setTimeout(() => {
    //   let player = new VideoPlayer();
    //   let ele = document.getElementById("video-slot1");
    //   player.play(this.props.firstVideoUrl, ele, {
    //     liveStatus: 0,
    //     videoId: "J_prismPlayer",
    //   });
    // }, 1000);
  }
  handleClose = () => {
    const classNameList = document.getElementsByClassName('video-marker');
    for (let i = 0; i < classNameList.length; i++) {
      classNameList[i].className = classNameList[i].className.replace('video-marker1', '')
    }
    this.player.removePlayer();
    const { closeVideoFirst } = this.props;
    closeVideoFirst();
  };
  render() {
    const { showVideoFirst, firstVideoUrl } = this.props;
    if (showVideoFirst && firstVideoUrl) {
      return (
        <div id="video-slot1">
          <div className="video-title">雷视视频</div>
          <a className="video-close" onClick={this.handleClose}>
            <img src={closeIcon} alt="close" />
          </a>
          <div
            className="prism-player video-container"
            id="J_prismPlayer"
          ></div>
          {/* <img className="new-player" src={imgSrc} alt="pic1" /> */}
          {/* <Player
            ref={(player) => {
              this.player = player;
            }}
            className="new-player"
            fluid={false}
            autoplay
          > */}
          {/* <source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" />
                <source src="http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4" /> */}
          {/* <source src={firstVideoUrl} />
            <BigPlayButton position="center" /> */}
          {/* <ControlBar>
                    <ReplayControl seconds={10} order={1.1} />
                    <ForwardControl seconds={30} order={1.2} />
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2} />
                    <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                    <VolumeMenuButton disabled />
                </ControlBar> */}
          {/* </Player> */}

          {/* <Player
            config={config}
            // onGetInstance={(instance) => this.setState({ instance })}
            // Optional: custom cdn url
            // sourceUrl={'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js'}
          /> */}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default FirstVideo;
