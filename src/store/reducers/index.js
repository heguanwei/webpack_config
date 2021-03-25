import {combineReducers} from "redux";
import {INCREMENT} from '../actions';

const initState = {
    num: 0
}
function counter(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return Object.assign(state, {num: action.data})
        default:
            return state
    }
}

export default combineReducers({counter})
