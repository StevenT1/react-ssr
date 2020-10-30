import {createStore} from 'redux';

const initState = {
    data: ''
}

function reducer(state=initState,action){
    switch (action.type) {
        case "CHANGE_STATE":
            return{
                ...state,
                ...action.payload
            }
        default:
            return{...state}
    }
}
//放在这里把数据赋值给初始值
export function createClientStore(){
    //注水进页面的初始值
    return createStore(reducer,(window as any).REDUX);
}
export function createServerStore(){
    return createStore(reducer);
}