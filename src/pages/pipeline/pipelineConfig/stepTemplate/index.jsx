import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Tag,
  Row,
  Col,
  Divider,
  Tooltip,
  Button,
  Pagination,
  Input,
  List,
  Icon,
  Select,
  Dropdown,
  Menu,
  Switch,
  Drawer,
  Form,
  Checkbox,
  notification
} from 'antd';
import { EditOutlined, DeleteOutlined, SmallDashOutlined, SlidersOutlined, CarryOutOutlined } from '@ant-design/icons';
import { getPipelineList } from '@/services/pipeline';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';
const { Search } = Input;
const { Option } = Select;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class CardList extends PureComponent {
  state = {
    tableData: [],
    page: {
      page: 1,
      limit: 12,
    },
    total: 0,
    visible: true,
  };
  // 初始化数据
  initData = () => {
    getPipelineList({}).then(response => {
      this.setState({
        tableData: response.data.data.rows,
        total: response.data.data.total,
      });
    });
  };

  showDrawer = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };


  componentDidMount() {
    this.initData();
  }
  addPipeline() { }

  delStep = () => {
    console.log(111);
    notification['success']({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  editStep = () => {
    notification['success']({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  render() {
    const {
      list: { list },
      loading,
    } = this.props;

    return (
      <PageHeaderWrapper title="卡片列表">
        <div className={styles.pageTitle}>
          <div>
            <Select style={{ width: 200 }} placeholder="请选择模板类型">
              <Option value="jack">Jack</Option>
            </Select>
            <Search
              placeholder="请输入步骤模板名称"
              onSearch={value => console.log(value)}
              style={{ width: 200, marginLeft: 10 }}
            />
          </div>
          <Button type="primary" onClick={this.showDrawer}>
            新建流水线
          </Button>
        </div>

        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 4, md: 2, sm: 1, xs: 1 }}
            dataSource={this.state.tableData}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  actions={[
                    <div> <SlidersOutlined style={{ paddingRight: 10 }} />3</div>,
                    <div> <CarryOutOutlined style={{ paddingRight: 10 }} />3</div>
                  ]}
                  hoverable
                  className={styles.card}
                  title={item.pipelineName}
                  extra={<Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <EditOutlined onClick={this.editStep} /> 编辑
                        </Menu.Item>
                        <Menu.Item style={{ color: 'red' }}>
                          <DeleteOutlined onClick={this.delStep} /> 删除
                        </Menu.Item>
                      </Menu>
                    }
                    placement="bottomLeft"

                  >
                    <SmallDashOutlined />
                  </Dropdown>}
                >
                  <Tooltip title={item.serviceName}>
                    <div>{item.serviceName}</div>
                  </Tooltip>
                  <div style={{ textAlign: 'center' }}>
                    <Tag color="orange">11</Tag>
                  </div>

                </Card>
              </List.Item>
            )}
          />
        </div>

        <Pagination style={{ float: 'right' }} />

        <Drawer
          title="新建"
          visible={this.state.visible}
          placement="right"
          onClose={this.onClose}
          width="45%"
          footer={
            <div
              style={{ textAlign: 'right' }}
            >
              <Button onClick={this.onClose} type="primary">
                保存
              </Button>
              <Button onClick={this.save} style={{ marginRight: 8 }}>
                取消
              </Button>
            </div>
          }
        >
          <Form hideRequiredMark >
            <Form.Item name="步骤类型" label="步骤脚本" rules={[{ required: true }]}>
              <Input placeholder="请输入步骤脚本" />
            </Form.Item>
            <Form.Item name="添加参数" label="步骤名称" rules={[{ required: true }]}>
              <Input placeholder="请输入步骤名称" />
            </Form.Item>
            <Form.Item name="任务分类" label="步骤描述" rules={[{ required: true }]}>
              <Input placeholder="请输入步骤描述" />
            </Form.Item>
            <Form.Item name="中文名称" label="分类" rules={[{ required: true }]}>
              <Select placeholder="请选择分类">
                <Option value="jack">Jack</Option>
              </Select>
            </Form.Item>
            <Form.Item rules={[{ required: true }]}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>是否可见</span>
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </div>
            </Form.Item>
            <Form.Item rules={[{ required: true }]}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>是否添加红线</span>
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </div>
            </Form.Item>
            <Form.Item name="添加参数" label="添加参数" rules={[{ required: true }]}>
              <div className={styles.varList}>
                <Row className={styles.header} gutter={10}>
                  <Col span={4}>参数key</Col>
                  <Col span={4}>参数名称</Col>
                  <Col span={4}>参数类型</Col>
                  <Col span={8}>默认值</Col>
                  <Col span={2} style={{ textAlign: 'center' }}>URL</Col>
                  <Col span={2}></Col>
                </Row>
                {/* 参数列表内容 */}
                <Row className={styles.content} gutter={10}>
                  <Col span={4}>
                    <Input placeholder="请输入参数key" />
                  </Col>
                  <Col span={4}>
                    <Input placeholder="请输入参数名称" />
                  </Col>
                  <Col span={4}>
                    <Select placeholder="请选择参数类型">
                      <Option value="jack">Jack</Option>
                    </Select>
                  </Col>
                  <Col span={8}>
                    <Input placeholder="请输入默认值" />
                  </Col>
                  <Col span={2} style={{ textAlign: 'center' }}>
                    <Checkbox></Checkbox>
                  </Col>
                  {/* <Col span={4}>
                    <Input placeholder="请输入Url" />
                  </Col> */}
                  <Col span={1}>
                    删除
                  </Col>

                </Row>
              </div>
            </Form.Item>
          </Form>
        </Drawer >
      </PageHeaderWrapper>
    );
  }
}

export default CardList;
