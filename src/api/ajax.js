import { message } from 'antd'
import axios from 'axios'

//封装了请求类型的判断、失败的统一处理（失败时发布失败原因，但是不调用reject(reason)）
export default function ajax(url,data={},type='GET'){
  return new Promise((resolve,reject) => {
    let promise
    //1.执行异步ajax请求
    if(type === 'GET'){
      promise = axios.get(url,{
        params: data
      })
    }else{
      promise = axios.post(url,data)
    }
    //2.如果成功，调用resolve（value）
    promise.then(response => {
      resolve(response)
    //3.如果失败，不调用reject（reason），而是提示异常
    }).catch(error => {
      message.error('请求失败了，'+error.message)
    })
  }) 
}