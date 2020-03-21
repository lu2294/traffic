import React from 'react';
import { Button,Popover } from 'antd'

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            amout:false
        }
    }
    componentDidMount() {
        const a = []
        for (let i = 1; i < 32; i++) {
            if (require(`./img/${i}.jpg`)) {
                a.push(require(`./img/${i}.jpg`))
            }
        }
        this.setState({ list: a })
    }
    douClick = ()=>{
        this.setState({ amout: !this.state.amout })
    }
    sortClick = ()=>{
        const {list} = this.state
        this.setState({ list: this.shuffle(list) })
    }
    shuffle = (arr)=> {
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            var index = parseInt(Math.random() * (len - i));
            var temp = arr[index];
            arr[index] = arr[len - i - 1];
            arr[len - i - 1] = temp;
        }
        return arr;
    }
    
    render() {
        const html = <div class="gif-content"></div>;
        return (<div className="pic-content">
            {this.state.list.map((v) => (<a key={v} className={this.state.amout ? 'doudong' : ''}>
                <img src={v}></img>
            </a>
            ))}
            <div className="button-map">
                <Popover content={html} trigger="click" >
                <Button type="primary"  >福利图</Button>
                </Popover>
                <Button type="primary" onClick={this.douClick} style={{ 'display': 'block', marginTop: '5px' }}>抖 动</Button>
                
                <Button type="primary" onClick={this.sortClick}  style={{ 'display': 'block', marginTop: '5px' }}>乱 序</Button>
            </div>

        </div>
        )

    }
}