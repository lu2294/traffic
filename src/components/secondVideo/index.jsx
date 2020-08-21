import React from "react";
import "./index.scss";
import closeIcon from "../../assets/imgs/close.png";
import {
  Player,
  BigPlayButton,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import "video-react/dist/video-react.css";
import { inject, observer } from "mobx-react";
import numberPic1 from "../../assets/imgs/number1.JPG";
import numberPic2 from "../../assets/imgs/number2.JPG";
@inject("video")
@observer
class SecondVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClose = () => {
    const { closeVideoSecond } = this.props.video;
    closeVideoSecond();
  };
  render() {
    const {
      showVideoSecond,
      secondVideoUrl,
      numberForSecond,
    } = this.props.video;
    let imgSrc = numberForSecond === 1 ? numberPic1 : numberPic2;
    if (showVideoSecond && secondVideoUrl) {
      return (
        <div id="video-slot2">
          <div className="video-title">雷视图片</div>
          <a className="video-close" onClick={this.handleClose}>
            <img src={closeIcon} alt="close" />
          </a>
          {/* <div  className="prism-player video-container" id="J_prismPlayer1"></div> */}
          <img className="new-player" src={imgSrc} alt="pic2" />
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
          {/* <source src={secondVideoUrl} />
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
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SecondVideo;
