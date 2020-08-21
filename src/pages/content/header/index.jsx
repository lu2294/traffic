import React from "react";
import axios from "axios";
import "./index.scss";
import { getWeather } from "../../../services";
import testImg from "../../../assets/imgs/weather/CLEAR_DAY.png";
import { LogoutOutlined } from "@ant-design/icons";
const instance = axios.create({
  // baseURL: "http://15.75.4.193:9777",
  baseURL: "",
  timeout: 60000,
  headers: { "Access-Control-Allow-Origin": "*" },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowTimeStr: "",
      dayStr: "",
      weekdayStr: "",
      temp: "",
    };
  }

  getTime = () => {
    setInterval(() => {
      let now = new Date();
      let year = now.getFullYear(); //得到年份
      let month = now.getMonth(); //得到月份
      let date = now.getDate(); //得到日期
      let day = now.getDay(); //得到周几
      let hour = now.getHours(); //得到小时
      let minu = now.getMinutes(); //得到分钟
      let sec = now.getSeconds(); //得到秒
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      this.setState({
        nowTimeStr: hour + ":" + minu + ":" + sec,
        dayStr: year + "/" + month + "/" + date,
        weekdayStr: "星期" + this.toChinese(day),
      });
    }, 1000);
  };
  toChinese = (number) => {
    let numberMap = new Map([
      [1, "一"],
      [2, "二"],
      [3, "三"],
      [4, "四"],
      [5, "五"],
      [6, "六"],
      [7, "日"],
    ]);
    if (numberMap.has(number)) {
      let str = numberMap.get(number);
      return str;
    } else {
      return "";
    }
  };
  initStr = async () => {
    let now = new Date();
    let year = now.getFullYear(); //得到年份
    let month = now.getMonth(); //得到月份
    let date = now.getDate(); //得到日期
    let day = now.getDay(); //得到周几
    let hour = now.getHours(); //得到小时
    let minu = now.getMinutes(); //得到分钟
    let sec = now.getSeconds(); //得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    try {
      const { data } = await instance.get(
        "/foobar/forecastRealtime/getForecastRealtimeWeather"
      )
      if (data && data.status === 200) {
        this.setState({
          nowTimeStr: hour + ":" + minu + ":" + sec,
          dayStr: year + "/" + month + "/" + date,
          weekdayStr: "星期" + this.toChinese(day),
          temp: data.object[0].temperature,
        });
      } else {
        this.setState({
          nowTimeStr: hour + ":" + minu + ":" + sec,
          dayStr: year + "/" + month + "/" + date,
          weekdayStr: "星期" + this.toChinese(day),
          temp: 0,
        });
      }
    }catch (e) {
      this.setState({
        nowTimeStr: hour + ":" + minu + ":" + sec,
        dayStr: year + "/" + month + "/" + date,
        weekdayStr: "星期" + this.toChinese(day),
        temp: this.randomNum(30,36),
      });
    }
    
    // this.setState({
    //   nowTimeStr: hour + ":" + minu + ":" + sec,
    //   dayStr: year + "/" + month + "/" + date,
    //   weekdayStr: "星期" + this.toChinese(day),
    //   // temp: this.randomNum(30, 36),
    // });
  };
  // getWeather = async () => {
  //   const { data } = await instance.get(
  //     "/foobar/forecastRealtime/getForecastRealtimeWeather"
  //   );
  //   if (data && data.status === 200) {
  //     this.setState({
  //       temp: data.object[0].temperature,
  //     });
  //   } else {
  //     this.setState({
  //       temp: 0,
  //     });
  //   }
  // };
  componentDidMount() {
    // this.getWeather();
    this.initStr();
    this.getTime();
  }
  randomNum = function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  };
  close = () => {
    window.location.href = "about:blank";
    window.close();
  };
  render() {
    const { nowTimeStr, dayStr, weekdayStr, temp } = this.state;
    return (
      <div className="HeaderOutter">
        <div className="temp-wrapper">
          <img className="temp-img" src={testImg} alt="天气" />
          <span className="temp-str">{temp}℃</span>
        </div>
        <div className="datetime-wrapper">
          <div className="datetime">{nowTimeStr}</div>
          <div className="dateday">
            <div className="dayStr">{dayStr}</div>
            <div className="weekdayStr">{weekdayStr}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
