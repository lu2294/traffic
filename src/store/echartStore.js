import { observable, action, computed } from "mobx";
import { message } from "antd";
import {
  selectListByjdcxh,
  selectVehicleInfo,
  selectRadarVideoList,
  rightData,
} from "../services";
import instance from "../services/anotherHost";
import CommonStore from "./CommonStore";
import videoStore from "./videoStore";
class Store {
  @observable echartTimerDelay = 1800000; // 轮询间隔
  @observable target1 = 0; // 初始化指标1
  @observable target2 = 0; // 初始化指标2
  @observable target3 = 0; // 初始化指标3
  @observable target4 = 0; // 初始化指标4

  @observable pie1Legend = ["大车", "中车", "小车"]; // 初始化饼图的legend
  @observable pie2Legend = ["本地", "外地", "高频", "低频"]; // 初始化饼图的legend
  @observable pie3Legend = ["通勤", "营运", "消防", "危化", "其他"]; // 初始化饼图的legend
  @observable xAxisData = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ]; // 初始化折线图的横轴
  // 初始化类型选择按钮
  @observable switchTypes = [
    {
      label: "类型",
      options: ["大车", "中车", "小车"],
    },
    {
      label: "属地",
      options: ["本地", "外地", "高频", "低频"],
    },
    {
      label: "标签",
      options: ["通勤", "营运", "消防", "危化", "其他"],
    },
    {
      label: "变道",
      options: [],
    },
  ];
  @observable currentType = "类型"; // 初始化当前选择类型
  @observable showTable = []; // 初始化下面表格数据
  @observable rightData = {};
  @observable numberMap = new Map([
    [0, 0],
    [0.5, 1],
    [1, 2],
    [1.5, 3],
    [2, 4],
    [2.5, 5],
    [3, 6],
    [3.5, 7],
    [4, 8],
    [4.5, 9],
    [5, 10],
    [5.5, 11],
    [6, 12],
    [6.5, 13],
    [7, 14],
    [7.5, 15],
    [8, 16],
    [8.5, 17],
    [9, 18],
    [9.5, 19],
    [10, 20],
    [10.5, 21],
    [11, 22],
    [11.5, 23],
    [12, 24],
  ]);
  @observable shouldShowMask = false; // 数据请求的浮层
  @observable shouldShowAll = true; // 整个窗口
  @computed get pieData1() {
    let data = [
      {
        name: "大车",
        value: (this.rightData.pieChart && this.rightData.pieChart.human) || 0,
      },
      {
        name: "中车",
        value:
          (this.rightData.pieChart && this.rightData.pieChart.nonMotor) || 0,
      },
      {
        name: "小车",
        value:
          (this.rightData.pieChart && this.rightData.pieChart.vehicle) || 0,
      },
    ];
    return data;
  }
  @computed get pieData2() {
    let data = [
      {
        name: "本地",
        value:
          (this.rightData.pieChart && this.rightData.pieChart.addrLocal) || 0,
      },
      {
        name: "外地",
        value:
          (this.rightData.pieChart && this.rightData.pieChart.addrOther) || 0,
      },
    ];
    return data;
  }
  @computed get pieData4() {
    let data = [
      {
        name: "高频",
        value: 0,
      },
      {
        name: "低频",
        value: 0,
      },
    ];
    return data;
  }
  @computed get pieData3() {
    let data = [
      {
        name: "通勤",
        value: (this.rightData.pieChart && this.rightData.pieChart.label1) || 0,
      },
      {
        name: "营运",
        value: (this.rightData.pieChart && this.rightData.pieChart.label2) || 0,
      },
      {
        name: "消防",
        value: (this.rightData.pieChart && this.rightData.pieChart.label3) || 0,
      },
      {
        name: "危化",
        value: (this.rightData.pieChart && this.rightData.pieChart.label4) || 0,
      },
      {
        name: "其他",
        value: (this.rightData.pieChart && this.rightData.pieChart.label5) || 0,
      },
    ];
    return data;
  }
  @computed get lineData() {
    // 创建跟“类型”相关的数组
    let typeSumArray = Array(25).fill(0);
    let typeVehicleArray = Array(25).fill(0);
    let typeHumanArray = Array(25).fill(0);
    let typeNonMotorArray = Array(25).fill(0);
    for (
      let index = 0;
      this.rightData.type && index < this.rightData.type.length;
      index++
    ) {
      const element = this.rightData.type[index];

      if (this.numberMap.has(element.stepIndex)) {
        let targetIndex = this.numberMap.get(element.stepIndex);
        typeSumArray[targetIndex] += element.total;
        if (element.vhcProperty === "vehicle") {
          typeVehicleArray[targetIndex] = element.total;
        } else if (element.vhcProperty === "human") {
          typeHumanArray[targetIndex] = element.total;
        } else if (element.vhcProperty === "nonMotor") {
          typeNonMotorArray[targetIndex] = element.total;
        }
      }
    }
    // console.log(
    //   typeSumArray,
    //   typeVehicleArray,
    //   typeHumanArray,
    //   typeNonMotorArray
    // );
    // 创建跟“属地”相关的数组
    let addrSumArray = Array(25).fill(0);
    let addrLocalArray = Array(25).fill(0);
    let addrOtherArray = Array(25).fill(0);
    let addrHighArray = Array(25).fill(0);
    let addrLowArray = Array(25).fill(0);
    for (
      let index = 0;
      this.rightData.addr && index < this.rightData.addr.length;
      index++
    ) {
      const element = this.rightData.addr[index];

      if (this.numberMap.has(element.stepIndex)) {
        let targetIndex = this.numberMap.get(element.stepIndex);
        addrSumArray[targetIndex] += element.total;
        if (element.vhcProperty === "本市") {
          addrLocalArray[targetIndex] = element.total;
        } else if (element.vhcProperty === "其他") {
          addrOtherArray[targetIndex] = element.total;
        } else if (element.vhcProperty === "high") {
          addrHighArray[targetIndex] = element.total;
        } else if (element.vhcProperty === "low") {
          addrLowArray[targetIndex] = element.total;
        }
      }
    }
    // console.log(
    //   addrSumArray,
    //   addrLocalArray,
    //   addrOtherArray,
    //   addrHighArray,
    //   addrLowArray
    // );
    // 创建跟“标签”相关的数组
    let labeSumArray = Array(25).fill(0);
    let labe1Array = Array(25).fill(0);
    let labe2Array = Array(25).fill(0);
    let labe3Array = Array(25).fill(0);
    let labe4Array = Array(25).fill(0);
    let labe5Array = Array(25).fill(0);
    for (
      let index = 0;
      this.rightData.labe && index < this.rightData.labe.length;
      index++
    ) {
      const element = this.rightData.labe[index];

      if (this.numberMap.has(element.stepIndex)) {
        let targetIndex = this.numberMap.get(element.stepIndex);
        labeSumArray[targetIndex] += element.total;
        if (element.vhcProperty === "1") {
          labe1Array[targetIndex] = element.total;
        } else if (element.vhcProperty === "2") {
          labe2Array[targetIndex] = element.total;
        } else if (element.vhcProperty === "3") {
          labe3Array[targetIndex] = element.total;
        } else if (element.vhcProperty === "4") {
          labe4Array[targetIndex] = element.total;
        } else if (element.vhcProperty === "5") {
          labe5Array[targetIndex] = element.total;
        }
      }
    }
    // console.log(
    //   labeSumArray,
    //   labe1Array,
    //   labe2Array,
    //   labe3Array,
    //   labe4Array,
    //   labe5Array
    // );
    let data = [
      {
        name: "类型",
        dataSet: [
          { name: "车辆总数", data: typeSumArray },
          { name: "大车", data: typeHumanArray },
          { name: "中车", data: typeNonMotorArray },
          { name: "小车", data: typeVehicleArray },
        ],
      },
      {
        name: "属地",
        dataSet: [
          { name: "车辆总数", data: addrSumArray },
          { name: "本地", data: addrLocalArray },
          { name: "外地", data: addrOtherArray },
          { name: "高频", data: addrHighArray },
          { name: "低频", data: addrLowArray },
        ],
      },
      {
        name: "标签",
        dataSet: [
          { name: "车辆总数", data: labeSumArray },
          { name: "通勤", data: labe1Array },
          { name: "营运", data: labe2Array },
          { name: "消防", data: labe3Array },
          { name: "危化", data: labe4Array },
          { name: "其他", data: labe5Array },
        ],
      },
      {
        name: "变道",
        dataSet: [{ name: "", data: [] }],
      },
    ];
    return data;
  }
  @action
  setMask = (boolean) => {
    this.shouldShowMask = boolean;
  };
  @action
  setCollapse = () => {
    if (this.shouldShowAll) {
      this.clearTimer();
    } else {
      this.getRightDataInterval();
    }
    this.shouldShowAll = !this.shouldShowAll;
  };
  @action
  setCurrentType = (type) => {
    this.currentType = type;
  };
  @action
  update = (value, key) => {
    this[key] = value;
  };
  @action
  selectListByjdcxh = async (inputValue) => {
    let params = {
      jdcxh: inputValue,
      jdccllxdm: "b",
      isReal: Number(CommonStore.isReal),
      searchType: CommonStore.chartsRoadType,
      startTime: CommonStore.startDateTime,
      endTime: CommonStore.endDateTime,
    };
    try {
      const { data } = await selectListByjdcxh(params);
      if (data.code === 200) {
        let result = data.data;
        this.showTable = result;
      } else {
        message.info("错误代码:", data.code);
      }
      // console.log(this.showTable)
    } catch (error) {
      message.info("请求出错");
    }
  };

  @action
  selectVehicleInfo = async (licenceNum) => {
    let params = {
      licenceNum,
      licenceType: "02",
      startTime: CommonStore.startDateTime,
      endTime: CommonStore.endDateTime,
    };
    try {
      const { data } = await selectVehicleInfo(params);
      if (data.code === 200) {
        message.info("操作成功");
      } else {
        message.info("错误代码：", data.code);
      }
    } catch (error) {
      message.info("请求出错");
    }
  };

  @action
  selectRadarVideoList = async (id = "31010117011320002097") => {
    let params = {};
    try {
      // const { data } = await selectRadarVideoList({});
      const { data } = await instance.post(
        `/video/VM/v2/play/device/${id}?type=SD&Token=loadmin&private=false&template=1080&token=loadmin`
      );

      let { url } = data;
      if (url) {
        videoStore.useVideo(1, url);
      } else {
        message.info("url为空");
      }
    } catch (error) {
      message.info("请求出错");
    }
  };
  @action
  getRightData = async () => {
    // this.clearTimer();
    let params = {
      id: CommonStore.roadId,
      isReal: Number(CommonStore.isReal),
      searchType: CommonStore.chartsRoadType,
      startTime: CommonStore.startDateTime,
      endTime: CommonStore.endDateTime,
    };
    this.setMask(true);
    try {
      const { data } = await rightData(params);
      this.setMask(false);
      if (data.code === 200) {
        this.rightData = data.data;
      } else {
        message.info("错误代码:", data.code);
      }
    } catch (error) {
      this.setMask(false);
      message.info("请求出错");
    }
  };
  @action
  clearTimer = () => {
    if (this.echartTimer) {
      clearTimeout(this.echartTimer);
    }
  };
  @action
  getRightDataInterval = () => {
    this.clearTimer();
    this.getRightData();
    this.echartTimer = setInterval(() => {
      this.getRightData();
    }, this.echartTimerDelay);
  };
}
const store = new Store();
export default store;
