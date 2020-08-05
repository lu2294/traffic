import React from 'react';
import PropTypes from 'prop-types'
import './index.scss'
// 引入echarts主题色
import echartsTheme from '../echartsTheme'
// 按需加载echarts的组件
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
// 引入mobx
import {inject} from 'mobx-react'

const iconSelected = 'path://M512 981.333333A469.453333 469.453333 0 0 1 329.333333 79.56a469.453333 469.453333 0 0 1 365.333334 864.88A466.44 466.44 0 0 1 512 981.333333z m0-853.333333a384 384 0 1 0 271.533333 112.466667A381.533333 381.533333 0 0 0 512 128z m0 170.666667a213.333333 213.333333 0 1 0 213.333333 213.333333 213.333333 213.333333 0 0 0-213.333333-213.333333z'
const iconUnselected = 'path://M512 170.666667c187.733333 0 341.333333 153.6 341.333333 341.333333s-153.6 341.333333-341.333333 341.333333-341.333333-153.6-341.333333-341.333333 153.6-341.333333 341.333333-341.333333m0-85.333334C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667 426.666667-192 426.666667-426.666667S746.666667 85.333333 512 85.333333z'

class Lines extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
       
        }
      }

      

      componentWillMount() {
          echarts.registerTheme('HP_QXLW',echartsTheme)
      }
       randArray = (len, min, max) => 
         Array(len).fill(1).map(v=> Math.floor(Math.random()*(max-min))+min);
    
    getOptionLine = () => {
        const {types,currentType} = this.props
        let targetIndex = types.findIndex(it => it.label === currentType)
        // let legendArray = ['车辆总数'].concat(types[targetIndex].options)
        let legendArray = [{
            name: '车辆总数',
            icon: iconSelected 
          }]
        for(let index = 0; index < types[targetIndex].options.length; index++) {
            if (index === 0) {
                legendArray.push({
                    name: types[targetIndex].options[index],
                    icon: iconSelected
                      })
            } else {
                legendArray.push({
                    name: types[targetIndex].options[index],
                    icon: iconUnselected
                       })
            }
        }
        console.log(legendArray)
        let series = []

        legendArray.forEach(it => {
            let item = {
                name: it.name,
                areaStyle: {},
                data: this.randArray(13,1,100),
                type: 'line',
                smooth: true
            }
            series.push(item)
        })
        let selected = {}
        for (let index = 2; index < legendArray.length; index++) {
            selected[legendArray[index]['name']] = false
        }
        let option = {
            title: {
                text: '车辆数量',
                textStyle:{
                    fontSize: '14px',
                    color:'#DADADA',
                },
                left: '5%'
            },
            // 自定义主题色
            color: [
                '#245FDA',
                '#24C9DA',
                '#EA9559',
                '#D35D5D'
            ],
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLabel: {
                    color: '#fff'
                },
                data: ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00']
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: 'gray'
                    }
                },
                axisLabel: {
                    color: 'gray'
                },
                // boundaryGap: [0, '100%']
            },
            legend: {
                bottom:'5%',
                data:legendArray,
                textStyle: {
                    color: '#8C8C8C'
                },
                selected
            },
            grid: {
                top: '10%',
                bottom: '30%'
            },
            series
            // series: [{
            //     name: '车辆总数',
            //     // lineStyle: {
            //     //     color: 'green'
            //     // },
            //     areaStyle: {
                    
            //     },
            //     data: this.randArray(13,1,100),
            //     type: 'line',
            //     smooth: true
            // },{
            //     name: '大车',
            //     // lineStyle: {
            //     //     color: 'blue'
            //     // },
            //     areaStyle: {
                    
            //     },
            //     data: this.randArray(13,1,100),
            //     type: 'line',
            //     smooth: true
            // },{
            //     name: '小车',
            //     // lineStyle: {
            //     //     color: 'blue'
            //     // },
            //     areaStyle: {
                    
            //     },
            //     data: this.randArray(13,1,100),
            //     type: 'line',
            //     smooth: true
            // },{
            //     name: '中车',
            //     // lineStyle: {
            //     //     color: 'blue'
            //     // },
            //     areaStyle: {
                    
            //     },
            //     data: this.randArray(13,1,100),
            //     type: 'line',
            //     smooth: true
            // },{
            //     name: '大大车',
            //     // lineStyle: {
            //     //     color: 'blue'
            //     // },
            //     areaStyle: {
                    
            //     },
            //     data: this.randArray(13,1,100),
            //     type: 'line',
            //     smooth: true
            // },{
            //     name: '小小车',
            //     // lineStyle: {
            //     //     color: 'blue'
            //     // },
            //     areaStyle: {
                    
            //     },
            //     data: this.randArray(13,1,100),
            //     type: 'line',
            //     smooth: true
            // }]
        }
        return option
    }
    // onChartClick = () => {
    //     console.log('chartclick')
    // }
    onChartLegendselectchanged = (e) => {
     
        let data = []
        for (const key in e.selected) {
            if (e.selected.hasOwnProperty(key)) {
                if (e.selected[key]) {
                    data.push({
                        name: key,
                        icon: iconSelected
                    })
                } else {
                    data.push({
                        name: key,
                          icon: iconUnselected
                              })
                }
                
            }
        }
     
        let echarts_instance = this.echarts_react.getEchartsInstance();
        echarts_instance.setOption({
            legend: {
                data
            }
        },false,false)
    }
    render() {
        let onEvents = {
            // 'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged
          }
        return (
            <div className='line-wrapper'>
                <ReactEcharts
                className="echarts-line"
                ref={(e) => { this.echarts_react = e; }} 
                onEvents={onEvents} 
                theme="HP_QXLW"
                option={this.getOptionLine()} />
            </div>
        )
    }   
}
Lines.propTypes = {
    currentType: PropTypes.string,
    types: PropTypes.array
}
export default Lines