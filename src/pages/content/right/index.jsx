import React from "react";
import { message, Space, Spin, Drawer } from "antd";
import "./index.scss";
import Pies from "./charts-pies";
import ButtonGroup from "./button-group";
import Lines from "./charts-lines";
import SearchBar from "../../../components/searchBar";
import ScrollTable from "../../../components/scrollTable";
import axios from "../../../utils/axios";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

@inject("echart", "RoadIndicatorStore")
@observer
class Right extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.taskRemindInterval = null;
    this.socket = null;
  }
  // componentDidMount = () => {
  //   this.socket = new Socket({
  //     socketUrl: "wss://echo.websocket.org",
  //     timeout: 5000,
  //     socketMessage: (receive) => {
  //       console.log(receive); //后端返回的数据，渲染页面
  //     },
  //     socketClose: (msg) => {
  //       console.log(msg);
  //     },
  //     socketError: () => {
  //       console.log(this.state.taskStage + "连接建立失败");
  //     },
  //     socketOpen: () => {
  //       console.log("连接建立成功");
  //       // 心跳机制 定时向后端发数据
  //       this.taskRemindInterval = setInterval(() => {
  //         this.socket.sendMessage({ msgType: 0 });
  //       }, 30000);
  //     },
  //   }); //重试创建socket连接
  //   try {
  //     this.socket.connection();
  //   } catch (e) {
  //     // 捕获异常，防止js error
  //     // donothing
  //   }
  // };
  handleClick = (type) => {
    // this.socket.onclose();
    // return;
    const { currentType, setCurrentType } = this.props.echart;
    if (type === currentType) {
      return;
    }
    if (type === "变道") {
      message.info("变道暂未开发");
      return;
    }
    setCurrentType(type);
  };
  //  handleSearch = (inputValue) => {
  //     const {selectListByjdcxh} = this.props.echart
  //     selectListByjdcxh(inputValue)
  //  }
  handleLive = (record) => {
    const { selectRadarVideoList } = this.props.echart;
    selectRadarVideoList(record.jdchphm);
  };
  handleShift = (record) => {
    console.log("record", record);
    let params = {
      jdchpzl: record.jdchphm,
      jdchpzldm: record.jdchpzldm,
    };
    const { onShowVehicle } = this.props.RoadIndicatorStore;
    onShowVehicle(params);
    // console.log(data)
  };
  render() {
    const { switchTypes, currentType } = this.props.echart;
    const { showTable, selectListByjdcxh } = this.props.echart;
    let typesArray = [];
    for (const item of switchTypes) {
      typesArray.push(item["label"]);
    }
    const columns = [
      {
        title: "序号",
        width: "7%",
        render: (data, record, index) => {
          return index + 1;
        },
      },
      {
        title: "车牌号",
        dataIndex: "jdchphm",
        width: "9%",
        render: (text, record, index) => {
          return <span className="text-yellow">{text}</span>;
        },
      },
      {
        title: "平均时速",
        dataIndex: "pjss",
        width: "10%",
        render: (text, record, index) => {
          return <span className="text-yellow">{text}</span>;
        },
      },
      {
        title: "变道次数",
        dataIndex: "bdcs",
        width: "10%",
        render: (text, record, index) => {
          return <span className="text-yellow">{text}</span>;
        },
      },
      {
        title: "通行时间",
        dataIndex: "txsj",
        width: "15%",
        render: (text, record, index) => {
          return <span className="text-yellow">{text}</span>;
        },
      },
      {
        title: "持续时长",
        dataIndex: "cxsc",
        width: "10%",
        render: (text, record, index) => {
          return <span className="text-yellow">{text}</span>;
        },
      },
      {
        title: "触发事件",
        dataIndex: "cfsj",
        width: "11%",
        render: (text, record, index) => {
          return <span className="text-yellow">{text}</span>;
        },
      },
      {
        title: "操作",
        width: "18%",
        render: (text, record, index) => {
          return (
            <Space>
              <a className="text-blue" onClick={() => this.handleLive(record)}>
                实时
              </a>
              <a className="text-blue" onClick={() => this.handleLive(record)}>
                回放
              </a>
              <a className="text-blue" onClick={() => this.handleShift(record)}>
                一车一档
              </a>
            </Space>
          );
        },
      },
    ];

    // const data = [];
    // for (let i = 0; i < 10; i++) {
    //   data.push({
    //     key: i,
    //     series: i,
    //     jdchphm: '沪A12341',
    //     pjss: '40km/h',
    //     bdcs: `${i}`,
    //     txsj: '18:30:30~至今',
    //     cxsc: '5‘30’’',
    //     cfsj: '事件',
    //   });
    // }
    return (
      <div
        className={
          this.props.echart.shouldShowAll
            ? `content-right`
            : `content-right right-hide`
        }
      >
        {this.props.echart.shouldShowMask ? (
          <div className="layer">
            <Spin tip="请求数据..." size="large" />
          </div>
        ) : null}
        <div className="right-title">
          道路车辆情况
          <div className="close-span" onClick={this.props.echart.setCollapse}>
            <span>收起 》</span>
          </div>
        </div>
        <Pies />
        <ButtonGroup
          currentType={currentType}
          types={typesArray}
          handleClick={this.handleClick}
        />
        <Lines currentType={currentType} types={switchTypes} />
        <div className="search-wrapper">
          <SearchBar
            handleSearch={(inputValue) => selectListByjdcxh(inputValue)}
            placeHolder={"请输入车牌号"}
          />
          <ScrollTable
            rowKey={"jdchphm"}
            columns={columns}
            data={toJS(showTable)}
          ></ScrollTable>
        </div>
      </div>
    );
  }
}

Right.propTypes = {};
export default Right;
