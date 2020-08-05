import React from 'react'
import './index.scss'
// 引入echarts主题色
import echartsTheme from '../echartsTheme'
// 按需加载echarts的组件
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
// 引入mobx
import {inject, observer} from 'mobx-react'
@inject('echart')
@observer
class Pies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
       
       
        }
      }
      componentWillMount() {
          echarts.registerTheme('HP_QXLW',echartsTheme)
          console.log(this.props.echart.getV)
      }
    getOptionPie1 = () => {
        let option = {
            // title: {
            //     text: '在途车辆/承载量',
            //     subtext: '380/500',
            //     left: 'center'
            // },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                // type: 'scroll',
                orient: 'vertical',
                right: 0,
                top: 'center',
                bottom: 0,
                itemHeight: 8,
                itemWidth: 8,
                data: ['大车','中车','小车'],
                textStyle: {
                    color: '#C4C8C9',
                    // fontSize: 14
                }
            },
            series: [
                {
                    name: '类型',
                    type: 'pie',
                    radius: '60%',
                    // center: ['45%', '35%'],
                    label: {
                        normal: {
                            position: 'inner',
                            show : true,
                            formatter: '{d}%',
                            // fontSize: 24,
                            fontFamily: 'PingFangSC-Regular',
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
            // title: {
            //     text: '今日流量',
            //     subtext: '1308',
            //     left: 'center'
            // },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
             graphic:{ //图形中间文字
                    type:"text",
                    left:"center",
                    top:"center",
                    style:{
                        text:" 本外地\r\n高低频",
                        textAlign:"center",
                        fill:"#fff",
                        fontSize: 18
                    }
                },
            legend: {
                orient: 'vertical',
                itemHeight: 8,
                itemWidth: 8,
                data: ['本地', '外地', '高频', '低频'],
                right: 0,
                top: 'center',
                bottom: 0,
                textStyle: {
                    color: '#C4C8C9'
                },
            },
            series: [
                {
                    name: '属地',
                    type: 'pie',
                    radius: ['50%', '60%'],
                    // center: ['45%', '35%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'left'
                    },
                    emphasis: {
                        label: {
                            show: false,
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
            // title: {
            //     text: '历史均值流量(至当前时刻)',
            //     subtext: '10985',
            //     left: 'center'
            // },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
             graphic:{ //图形中间文字
                    type:"text",
                    left:"center",
                    top:"center",
                    style:{
                        text:" 出行车\r\n量类型",
                        textAlign:"center",
                        fill:"#fff",
                        fontSize:18
                    }
                },
            legend: {
                 orient: 'vertical',
                itemHeight: 8,
                  itemWidth: 8,
                data: ['通勤','营运', '消防', '危化', '其他'],
                right: 0,
                top: 'center',
                bottom: 0,
                textStyle: {
                    color: '#C4C8C9'
                },
            },
            series: [
                {
                    name: '标签',
                    type: 'pie',
                    radius: ['50%', '60%'],
                    // center: ['40%', '35%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'left'
                    },
                    emphasis: {
                        label: {
                            show: false,
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
    renderPieTitle = (mainTitle, subTitle) =>  (
        <div className='pie-title-wrapper'>
            <div className='pie-mainTitle'>{mainTitle}</div>
            <div className='pie-subTitle'>{subTitle}</div>
        </div>
    )
    render() {
        const options = [{
            pieMainTitle: '在途车辆 / 承载量',
            pieSubTitle: '380 / 500',
            optionFn: this.getOptionPie1
        },
        {
            pieMainTitle: '今日流量',
            pieSubTitle: '1308',
            optionFn: this.getOptionPie2
        },
        {
            pieMainTitle: '历史均值流量(至当前时刻)',
            pieSubTitle: '10985',
            optionFn: this.getOptionPie3
        }]

        return (
            <div className="pies-wrapper">
                {
                    options.map(it => {
                        return (
                            <div key={it.pieMainTitle} className='pie-wrapper'>
                            {this.renderPieTitle(it.pieMainTitle,it.pieSubTitle)}
                             <ReactEcharts className="echarts-pie" theme="HP_QXLW"  option={it.optionFn()} />
                         </div>
                        )
                    })
                }
                {/* <div className='pie-wrapper'>
                   {this.renderPieTitle('在途车辆 / 承载量','380 / 500')}
                    <ReactEcharts className="echarts" theme="HP_QXLW"  option={this.getOptionPie1()} />
                </div>
                <div className='pie-wrapper'>
                {this.renderPieTitle('今日流量','1308')}
                    <ReactEcharts className="echarts" theme="HP_QXLW"  option={this.getOptionPie2()} />
                </div>
                <div className='pie-wrapper'>
                {this.renderPieTitle('历史均值流量(至当前时刻)','10985')}
                    <ReactEcharts className="echarts" theme="HP_QXLW"  option={this.getOptionPie3()} />
                </div> */}
            </div>
        )
    }
}

export default Pies