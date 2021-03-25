import React, {Component} from 'react';
import {connect} from "react-redux";
import {Input, Button} from 'antd';
import {incrementAction} from '@/store/actions';
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

    goList = () =>{
        console.log(this.props.history, '----------------this.props.history');
        this.props.onIncrementAction(123);
        debugger
        // this.props.history.push('/list');
    }

    render() {
        const {name} = this.state;
        const {counter} = this.props;
        return (<div className={style.app}>
            <h1>react project {counter.num}</h1>
            <img src={require('./../../image/1111111111.jpg')}/>
            <div>
                <Input value={name} />
                <Button onClick={this.goList}>跳转</Button>
            </div>
        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementAction: dispatch(incrementAction)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
