import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

//左侧导航
class LeftNav extends Component {

hasAuth = (item) => {
  const {key, isPublic} = item

  const menus = memoryUtils.user.role.menus
  const username = memoryUtils.user.username
  /*
  1. 如果当前用户是admin
  2. 如果当前item是公开的
  3. 当前用户有此item的权限: key有没有在menus中
   */
  if(username==='admin'||isPublic||menus.indexOf(key)!==-1){
    return true
  }else if(item.children){ //如果该item的子item需要展示，那么该item也需要那段组件代码
    return !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
  }
  return false
} 

getMenuNodes = (menuList) => {
  // 得到当前请求的路由路径
  const path = this.props.location.pathname

  return menuList.reduce((acc,cur) => {
    if(this.hasAuth(cur)){
      if(!cur.children){
        acc.push((
          <Menu.Item key={cur.key} icon={cur.icon}>
            <Link to={cur.key}>{cur.title}</Link>
          </Menu.Item>
        ))
      }else{
        const cItem = cur.children.find(cItem => path.indexOf(cItem.key) === 0)
        if(cItem){
          this.openKey = cItem.key
        }

        acc.push(
          <SubMenu key={cur.key} icon={cur.icon} title={cur.title}>
            {this.getMenuNodes(cur.children)}
          </SubMenu>
        )
      }
    }
    return acc
  },[])
}

UNSAFE_componentWillMount () {
  this.menuNodes = this.getMenuNodes(menuList)
}

  render() {
    // 得到当前请求的路由路径
    let path = this.props.location.pathname
    console.log('render()', path)
    if(path.indexOf('/product')===0) { // 当前请求的是商品或其子路由界面
      path = '/product'
    }
    const openKey = this.openKey

    return (
      <div className="left-nav">
      <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>后台</h1>
      </Link>
      
      <Menu
          defaultSelectedKeys={['/home']}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >

        {
          this.menuNodes
        }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)