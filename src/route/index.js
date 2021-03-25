import React from 'react';
// import {Router, browserHistory, Route, IndexRoute, Switch} from 'react-router';
import {HashRouter, Route, Switch} from 'react-router-dom';
import List from '@/pages/list';
import Index from '@/pages/index';
const Routes = () => (
    <HashRouter>
        <Switch>
            {/* <IndexRoute component={Index}/> */}
            <Route path="/list" exact component={List}/>
            <Route path="/home" exact component={Index}/>
        </Switch>
    </HashRouter>
);
export default Routes;
