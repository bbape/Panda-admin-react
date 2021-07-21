import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import {Redirect,Switch,Route,withRouter} from 'react-router-dom'
import { Layout } from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        //配合<Route path='/' component={Admin}/>
        //每次访问/都会验证一下，跳转到login
        //并且登录时候传递的user不对也会跳转到login
        if(!user || !user._id){
            //在render中跳转
            return <Redirect to='/login'/>
        }
        return (
            <>
              <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                  <Header>Header</Header>
                  <Content style={{backgroundColor:"#ccc"}}>
                  <Switch>
                    <Redirect from='/' exact to='/home'/>
                    <Route path='/home' component={Home}/>
                    <Route path='/category' component={Category}/>
                    <Route path='/product' component={Product}/>
                    <Route path='/user' component={User}/>
                    <Route path='/role' component={Role}/>
                    <Route path="/charts/bar" component={Bar}/>
                    <Route path="/charts/pie" component={Pie}/>
                    <Route path="/charts/line" component={Line}/>
                    
                  </Switch>
                  </Content>
                  <Footer style={{textAlign:"center",color:"#ccc"}}>这里是页尾</Footer>
                </Layout>
              </Layout>
            </>
        )
    }
}
