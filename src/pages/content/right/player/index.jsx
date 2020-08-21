/*
 * Author: lin.zehong
 * Date: 2018-09-10 15:57:54
 * Last Modified by: lin.zehong
 * Last Modified time: 2018-12-06 22:51:25
 * Desc: 阿里云播放器
 */
import { message } from "antd";

export default class VideoPlayer {
  constructor() {
    this.player = null;
  }
  /**
   * @param {string} playUrl 视频播放URL
   * @param {DOM} ele 视频播放DOM的父节点，videoParent
   * @param {object} options 其他参数，例如点播直播isLive
   * @description 播放
   */
  play = (playUrl, ele, options) => {
    if (!ele) return;
    const { videoId } = options;
    if (this.player) {
      this.player.dispose(); // 这里dispose会把video DOM一起删除，
      ele.innerHTML = `<div id=${videoId}></div>`; // 所以，需要根据父节点重新添加 <div id='video'></div>
    }
    this._setupPlayer(playUrl, ele, options);
  };

  /**
   * @param {string} playUrl 视频播放URL
   * @param {object} options 其他参数，例如点播直播isLive
   * @description 实例化 Aliplayer
   */
  _setupPlayer = (playUrl, ele, options) => {
    const { liveStatus, videoId } = options;
    let that = this;
    this.player = new window.Aliplayer(
      {
        id: videoId,
        source: playUrl,
        autoplay: true,
        isLive: liveStatus === 1,
        width: "440px",
        height: "280px",
        controlBarVisibility: "always",
        useH5Prism: true,
        rePlay: false,
        preload: true,
        autoPlayDelay: "",
        autoPlayDelayDisplayText: "",
        language: "zh-cn",
        trackLog: false,
        // extraInfo: {
        //   crossOrigin: "anonymous",
        // },
        // skinLayout: [
        //   { name: "H5Loading", align: "cc" },
        //   { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
        //   { name: "infoDisplay" },
        //   { name: "tooltip", align: "blabs", x: 0, y: 56 },
        //   {
        //     name: "controlBar",
        //     align: "blabs",
        //     x: 0,
        //     y: 0,
        //     children: [
        //       { name: "progress", align: "blabs", x: 0, y: 44 },
        //       { name: "playButton", align: "tl", x: 15, y: 12 },
        //       { name: "timeDisplay", align: "tl", x: 10, y: 7 },
        //       { name: "fullScreenButton", align: "tr", x: 10, y: 12 },
        //       { name: "snapshot", align: "tr", x: 10, y: 12 },
        //     ],
        //   },
        // ],
      },
      (player) => {
        if (player) {
          setTimeout(() => {
            // 先缓冲一下
            player.play();
          }, 500);
          player.on("liveStreamStop", () => {
            message.warn("获取视屏流中断，正在尝试重新获取");
          });
          player.on("ended", () => {
            // player.removePlayer()
            // this.removePlayer(ele,options)
            // this.player.removePlayer()
            // that.removePlayer()
            // player.dispose()
            // let ele = document.getElementById("J_prismPlayer")
            // ele.style.display = 'none'
          });
        }
      }
    );
  };

  /**
   * @description 获取 Aliplayer 对象
   */
  getPlayer = () => {
    if (this.player) {
      return this.player;
    }
  };

  /**
   * @param {string} ele 视频播放DOM的父节点，videoParent
   * @description 销毁 Aliplayer 对象
   */
  removePlayer = () => {
    const p = this.player || window['player'];
    if (p) {
      p.dispose();
      // const { videoId } = options;
      // ele.innerHTML = `<div id=${videoId}></div>`;
      // ele.innerHTML = "<div id='video'></div>";
    }
  };

  /**
   * @param {string} timestamps 时间戳
   * @description 格式化时间
   */
  getFormateDate = (timestamps) => {
    const date = new Date(timestamps);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month <= 9) {
      month = `0${month}`;
    }
    let day = date.getDate();
    if (day <= 9) {
      day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour <= 9) {
      hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute <= 9) {
      minute = `0${minute}`;
    }
    let second = date.getSeconds();
    if (second <= 9) {
      second = `0${second}`;
    }
    return `${year}/${month}${day} ${hour}:${minute}:${second}`;
  };
}
