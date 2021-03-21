import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Input} from 'antd';
import style from './index.less';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 2, 3, 4],
            name: 'koga'
        }
    }
    componentDidMount() {
        const {data} = this.state;
        data.map((val) => val*4);
        this.setState({
            data
        })
    }

    render() {
        const {name} = this.state;
        return (<div className={style.app}>
            <h1>react project</h1>
            <img src={require('./image/1111111111.jpg')}/>
            <div>
                <Input value={name} />
            </div>
        </div>)
    }
}
ReactDom.render(<App />, document.getElementById('app'))
