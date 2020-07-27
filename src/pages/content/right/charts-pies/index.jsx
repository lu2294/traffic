import React from 'react'
import './index.scss'
// 按需加载echarts的组件
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
class Pies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
       
       
        }
      }

    getOptionPie1 = () => {
        let option = {
            title: {
                text: '在途车辆/承载量',
                subtext: '380/500',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 0,
                top: '45%',
                // bottom: 20,
                itemHeight: 10,
                itemWidth: 10,
                data: ['大车','中车','小车'],
        
                selected: [true,true,true]
            },
            series: [
                {
                    name: '姓名',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    label: {
                        normal: {
                          position: 'inner',
                                        show : true,
                        formatter: '{d}%'
                                  }
                                          },
                  
                    data: [{
                        name: '大车',
                        value: 15
                    }, {
                        name: '中车',
                        value: 20
                    },{
                        name: '小车',
                        value: 25
                    }],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        return option
    }
    getOptionPie2 = () => {
        let option = {
            title: {
                text: '今日流量',
                subtext: '1308',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
             graphic:{       //图形中间文字
                    type:"text",
                    left:"center",
                    top:"center",
                    style:{
                        text:" 本外地\r\n高低频",
                        textAlign:"center",
                        fill:"#fff",
                        fontSize:12
                    }
                },
            legend: {
                orient: 'vertical',
                itemHeight: 10,
                itemWidth: 10,
                data: ['本地', '外地', '高频', '低频'],
               right: 0,
                top: '45%',
          
            },
            series: [
                {
                    name: '属地',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'left'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '12',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 335, name: '本地'},
                        {value: 310, name: '外地'},
                        {value: 234, name: '高频'},
                        {value: 135, name: '低频'},
                    ]
                }
            ]
        };
        
        return option
    }
    getOptionPie3 = () => {
        let option = {
            title: {
                text: '历史均值流量(至当前时刻)',
                subtext: '10985',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
             graphic:{       //图形中间文字
                    type:"text",
                    left:"center",
                    top:"center",
                    style:{
                        text:" 出行车\r\n量类型",
                        textAlign:"center",
                        fill:"#fff",
                        fontSize:12
                    }
                },
            legend: {
                 orient: 'vertical',
        itemHeight: 10,
                  itemWidth: 10,
                data: ['通勤','营运', '消防', '危化', '其他'],
               right: 0,
                top: '45%',
          
            },
            series: [
                {
                    name: '标签',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'left'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '12',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 335, name: '通勤'},
                        {value: 500, name: '营运'},
                        {value: 310, name: '消防'},
                        {value: 234, name: '危化'},
                        {value: 135, name: '其他'},
                    ]
                }
            ]
        }
        return option
    }
    render() {
        return (
            <div className="pies-wrapper">
                <div className='pie-wrapper'>
                    <ReactEcharts option={this.getOptionPie1()} />
                </div>
                <div className='pie-wrapper'>
                    <ReactEcharts option={this.getOptionPie2()} />
                </div>
                <div className='pie-wrapper'>
                    <ReactEcharts option={this.getOptionPie3()} />
                </div>
            </div>
        )
    }
}

export default Pies