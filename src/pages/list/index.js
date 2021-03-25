import React, {Component} from 'react';
import ReactDom from 'react-dom';
import style from './list.less';

export default class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 2, 3, 4]
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
        const {data} = this.state;
        return (<div className={style.list}>
            {
                data.map((item, index) => {
                    return <div key={index}>{item}</div>
                })
            }
        </div>)
    }
}
