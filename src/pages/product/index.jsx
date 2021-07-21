import { Card, Form, Input, Button } from 'antd'
import React, { Component } from 'react'

//商品路由
export default class Product extends Component {
  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <Card
        style={{ height: "100%" }}
      >
        <Form
          style={{margin:50}}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            name="productName"
            label="商品名称"
            rules={[
              {
                required: true,
                message: '请输入商品名称',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="productPrice"
            label="商品价格"
            rules={[
              {
                required: true,
                message: '请输入商品价格',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
