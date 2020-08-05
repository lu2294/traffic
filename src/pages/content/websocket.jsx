import Socket from '../../utils/websocket';


class websocket extends React.Component {
    constructor() {
        super();
        this.taskRemindInterval = null;
    }
    componentDidMount = () => {
        this.socket = new Socket({
            socketUrl: '127.0.0.1',
            timeout: 5000,
            socketMessage: (receive) => {
                console.log(receive);  //后端返回的数据，渲染页面
            },
            socketClose: (msg) => {
                console.log(msg);
            },
            socketError: () => {
                console.log(this.state.taskStage + '连接建立失败');
            },
            socketOpen: () => {
                console.log('连接建立成功');
                // 心跳机制 定时向后端发数据
                this.taskRemindInterval = setInterval(() => {
                    this.socket.sendMessage({ "msgType": 0 })
                }, 30000)
            }
        });
　　　　　//重试创建socket连接
        try {
            this.socket.connection();
        } catch (e) {
            // 捕获异常，防止js error
            // donothing
        }
    }

}

export default websocket;