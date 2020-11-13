import React from 'react';
import axios from 'axios';
import {Dispatch} from 'redux';
import { connect } from 'react-redux';
interface Y {
    data: string;
    dispatch:Dispatch
}
class About extends React.Component<Y> {
    //暴露出一个静态的加载数据的方法，存在store里
    static loadData = (store) => {
        return new Promise((resolve, reject) => {
            axios.get('http://42.192.68.190:7777/getData').then(response => {
                store.dispatch({ type: "CHANGE_STATE", payload: { data: response.data.data } })
                resolve('response.data.data')
            })
        })
    }
    // state = {
    //     data: ""
    // }
    //判断是否初始值为空，是空就调接口拿值
    componentDidMount() {
        if(!this.props.data){
            axios.get('http://42.192.68.190:7777/getData').then(response => {
                this.props.dispatch({ type: "CHANGE_STATE", payload: { data: response.data.data } })
            })
        }
        
    }
    render() {
    return <div>About{this.props.data}</div>
    }
}
// function About(){
//     return (
//         <div>
//             <h2>About Page</h2>
//         </div>
//     )
// }

function mapStateToProps(state) {
    return {
        //此时是注水的数据
        data: state.data,
    }
}
//把action拿到props上
function mapdispatchToProps(dispatch: any) {
    return {
        dispatch
    }
}
export default connect(mapStateToProps,mapdispatchToProps)(About);