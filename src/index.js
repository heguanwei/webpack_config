import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './route/index';
import store from './store';



class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    

    render() {
        return <Provider store={store}>
            <Routes />
        </Provider>
    }
}
ReactDom.render(<App />, document.getElementById('app'))
