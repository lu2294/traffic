import { observable, action, computed } from "mobx";
import { message } from "antd";
class Store {
  @observable showVideoFirst = false; // 展示第一个视频div
  @observable showVideoSecond = false; // 展示第二个视频div
  @observable firstVideoUrl = ""; // 第一个视频的url
  @observable secondVideoUrl = ""; // 第二个视频的url
  @observable numberForFirst = 1; // 展示第一个照片种类
  @observable numberForSecond = 1; // 展示第二个照片种类
  @action
  update = (value, key) => {
    this[key] = value;
  };
  @action
  useFirstVideo = (number, url) => {
    this.numberForFirst = number;
    this.showVideoFirst = true;
    this.firstVideoUrl = url;
  };
  @action
  useSecondVideo = (number, url = 'test') => {
    this.numberForSecond = number;
    this.showVideoSecond = true;
    this.secondVideoUrl = url;
  };
  @action
  useVideo = (number, url = "http://common.qupai.me/player/qupai.mp4") => {
    if (!url) {
      message.info("url不能为空！");
      return;
    }
    // if (!this.showVideoFirst && !this.showVideoSecond) {
    //   this.useFirstVideo(number, url);
    // } else if (this.showVideoFirst && !this.showVideoSecond) {
    //   this.useSecondVideo(number, url);
    // } else if (!this.showVideoSecond && this.showVideoFirst) {
    //   this.useFirstVideo(number, url);
    // } else {
    //   alert("两个窗口都被占用！");
    // }
    if (this.showVideoFirst) {
      message.info("窗口在使用，请先关闭");
    } else {
      this.useFirstVideo(number, url);
    }
  };
  @action
  closeVideoFirst = () => {
    this.showVideoFirst = false;
    this.firstVideoUrl = "";
  };
  @action
  closeVideoSecond = () => {
    this.showVideoSecond = false;
    this.secondVideoUrl = "";
  };
}
const store = new Store();
export default store;
