
import React from 'react'
import {Table,message} from 'antd'
import './index.scss'
import Pies from './charts-pies'
import ButtonGroup from './button-group'
import Lines from './charts-lines'
import SearchBar from '../../../components/searchBar'
import ScrollTable from '../../../components/scrollTable'
import axios from '../../../utils/axios'
class Right extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platformLoading: false,
      types: [
        {
          label: '类型',
          options: ['大车','中车','小车']
        },
        {
          label: '属地',
          options: ['本地','外地','高频','低频']
        },
        {
          label: '标签',
          options: ['通勤','营运','消防','危化','其他'],
        },
        {
          label: '变道',
          options: []
        }
      ],
      currentType: '类型'
    }
  }
 
 handleClick = (type) => {
   if (type === this.state.currentType) {
     return
   }
   if (type === '变道') {
    message.info('变道暂未开发');
    return
   }
   this.setState({
    currentType: type
   })
 }
 handleSearch = async () => {
  //  const data = await axios.post({
  //    method: 'post',
  //    url: '/hppoc/selectListByjdcxh',
  //   // headers: {
  //   //   'Access-Control-Allow-Origin': '*'
  //   // }
  //   params: {
      
  //   }
  //  })
  const data = await axios.post('/hppoc/selectListByjdcxh',{})
   console.log(data)
 }
  render() {
    const {types} = this.state
    let typesArray = []
    for (const item of types) {
        typesArray.push(item['label'])
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'series',
        width:50,
        render: (text, record, index) => {
          return (
              <span className="text-yellow">{text}</span>
          )
      }
      },
      {
        title: '车牌号',
        dataIndex: 'jdchphm',
        // width:150
        render: (text, record, index) => {
          return (
              <span className="text-yellow">{text}</span>
          )
      }
      },
      {
        title: '平均时速',
        dataIndex: 'pjss',
        render: (text, record, index) => {
          return (
              <span className="text-yellow">{text}</span>
          )
      }
      },
      {
        title: '变道次数',
        dataIndex: 'bdcs',
        // width:150
        render: (text, record, index) => {
          return (
              <span className="text-yellow">{text}</span>
          )
      }
      },
      {
        title: '通行时间',
        dataIndex: 'txsj',
        // width:150
        render: (text, record, index) => {
          return (
              <span className="text-yellow">{text}</span>
          )
      }
      },
      {
        title: '持续时长',
        dataIndex: 'cxsc',
        render: (text, record, index) => {
          return (
              <span className="text-yellow">{text}</span>
          )
      }
      },
      {
        title: '触发事件',
        dataIndex: 'cfsj',
        // width:150
        render: (text, record, index) => {
          return (
              <span className="text-yellow">{text}</span>
          )
      }
      },
      {
        title: '操作',
        dataIndex: 'action',
        render() {
          return <a>实时</a>
        }
      }
    ];

    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        key: i,
        series: i,
        jdchphm: '沪A12341',
        pjss: '40km/h',
        bdcs: `${i}`,
        txsj: '18:30:30~至今',
        cxsc: '5‘30’’',
        cfsj: '事件',
      });
    }
    return (
      <div className="content-right">
        <div className='right-title'>
          道路车辆情况
        </div>
        <Pies />
        <ButtonGroup currentType={this.state.currentType} types={typesArray} handleClick={this.handleClick} />
        <Lines currentType={this.state.currentType} types={types}  />
        <div className="search-wrapper">
          <SearchBar handleSearch={this.handleSearch} placeHolder={"请输入车牌号"} />
        <ScrollTable columns={columns} data={data}></ScrollTable>
        </div>
      </div>
     
    )
  }
}

Right.propTypes = {
}
export default Right
