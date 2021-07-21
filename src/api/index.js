import { message } from 'antd'
import jsonp from 'jsonp'
import ajax from './ajax'

//登录
export const reqLogin = (username,password)=>ajax('/login',{username,password},'POST')

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')

//获取天气信息，jsonp类型的接口请求函数
export const reqWeather = (city) => {
  return new Promise((resolve,reject) => {
    const url = `https://v0.yiketianqi.com/api?version=v61&appid=44793372&appsecret=nw9DMesf&city=${city}`
    jsonp(url,{},(err,data) => {
      console.log('jsonp()',err,data)
      if(!err){
        const {wea,wea_img} = data
        resolve({wea,wea_img})
      }else{
        message.error('获取天气信息失败了')
      }
    })
  })
}

/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */
      reqWeather("北京")