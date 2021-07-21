import React, { Component } from 'react'
import { Card, Table, Button, Popconfirm } from 'antd';

const data = [
  {
    key: '1',
    name: '电视',
  },
  {
    key: '2',
    name: '冰箱',
  },
  {
    key: '3',
    name: '空调',
  },
];


export default class Category extends Component {
  state = {
    dataSource: []
  }

  componentDidMount() {
    this.setState({
      dataSource: data
    })
  }

  render() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'name',
        width: 250,
        render: text => <a>{text}</a>,
      },
      {
        title: '商品价格',
        dataIndex: 'productPrice',
        key: 'price',
        width: 700,
        render: text => <a>{text}</a>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => (
          <div>
            <Button type="primary" size="small">
              修改
            </Button>
            <Popconfirm
              title="确认删除此项吗"
              onConfirm={() => {
                console.log('用户确认删除')
              }}
            >
              <Button style={{ margin: "0 1rem" }} type="danger" size="small">
                删除
              </Button>
            </Popconfirm>
          </div>
        ),
      },
    ]
    return (
      <>
        <Card
          style={{height:"100%"}}
          title="商品分类"
          extra={
            <Button
              type="primary"
              size="small"
              onClick={() => this.props.history.push("/product")}
            >
              添加
            </Button>
          }
        >
          <Table columns={columns} dataSource={data} bordered />
        </Card>
      </>
    )

  }
}

