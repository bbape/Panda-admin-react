import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
  //表单提交成功，底层会传入一个参数对象，包含用户名和密码的值
  handleFinish = async (values) => {
    const {username,password} = values
    /*reqLogin(username,password).then(response => {
      console.log('请求登录成功',response.data)
    }).catch(error => {
      console.log('请求登录失败',error)
    })*/
    
    /*try{
      const response = await reqLogin(username,password)
      console.log('请求成功',response.data)
    }catch(error){
      console.log('请求出错',error.message)
    }*/

    const response = await reqLogin(username,password)
    console.log('请求成功，',response.data)
    const result = response.data
    if(result.status === 0){
      message.success('登录成功')
      //覆盖页面
      const user = result.data //保存到内存
      memoryUtils.user = user //保存到本地
      storageUtils.saveUser(user)
      
      this.props.history.push('/')
    }else{
      message.error(result.msg)
    }
  };
  //表单提交失败，底层会传入一个参数对象，包含三个属性
  handleFailed = ({ values, errorFields, outOfDate })=>{
    console.log('验证失败')
    errorFields.map( err=>console.log(...err.errors) )
  }

  render() {

    //实现自动登录，入口已经取得本地user并赋给内存，来到login就检查内存有没有user
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to='/login'/>
    }

    return (
      <div className="login">
        <header className="login-header">
            <img src={logo} alt="logo" />
            <h2>皮皮虾后台管理</h2>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.handleFinish}
            onFinishFailed={this.handleFailed}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: '请输入您的用户名!',
                },
                {
                  max: 12,
                  message: '用户名不能大于12位!',
                },
                {
                  min: 4,
                  message: '用户名不能小于4位!',
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '用户名必须由字母、数字、下划线组成!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: '请输入您的密码!',
                },
                {
                  max: 12,
                  message: '密码不能大于12位!',
                },
                {
                  min: 4,
                  message: '密码不能小于4位!',
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '密码必须由字母、数字、下划线组成!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
