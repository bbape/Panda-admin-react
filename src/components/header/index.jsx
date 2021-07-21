import React, { Component } from 'react'
import './index.less'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqWeather} from '../../api'
import menuConfig from '../../config/menuConfig'
import {withRouter} from 'react-router-dom'
import { Modal, Button } from 'antd';

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    wea_img: '',
    wea: '',
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
    storageUtils.removeUser()
    memoryUtils.user = {}
    this.props.history.replace('/login')
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });

  };

  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuConfig.forEach((item) => {
      if(item.key===path){
        title = item.title
      }else if(item.children){
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  //设置了每秒调用一次
  getTime = () => {
    this.intervalId = setInterval(() =>{
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }

  //用到ajax的方法
  getWeather = async() => {
    const {wea,wea_img} = await reqWeather('深圳')
    this.setState({wea,wea_img})
    console.log(wea_img)
  }

  componentDidMount () {
    // 获取当前的时间
    this.getTime()
    // 获取当前天气
    this.getWeather()
  }

  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  render() {
    const {currentTime,wea_img,wea} = this.state
    const {username} = memoryUtils.user

    //这里声明的title是组件的props，所以title更新时相当于props更新，组件会重新渲染
    const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <Button type="primary" onClick={this.showModal}>
              退出
          </Button>
            <Modal
              cancelText={"取消"}
              okText={"确定"}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>确定退出吗</p>
            </Modal>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={wea_img} alt="weather" />
            <span>{wea}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)