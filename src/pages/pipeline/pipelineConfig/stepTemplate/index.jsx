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
    title: '新建',
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
    getPipelineList(this.state.page).then(response => {
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

  onChangePage = page => {
    this.setState({
      page: { ...this.state.page, page }
    });
    this.initData()
  };

  onShowSizeChange = (current, pageSize) => {
    this.setState({
      page: { ...this.state.page, limit: pageSize, page: 1 }
    });
    this.initData()
  }

  componentDidMount() {
    this.initData();
  }
  onClickMenu = ({ key }) => {
    if (key == 'edit') {
      this.editStep()
    } else {
      this.delStep()
    }
  }
  delStep = () => {
    notification['success']({
      message: '操作提示',
      description: '删除成功',
    });
  };
  editStep = () => {
    notification['success']({
      message: 'Notification Title',
      description: '编辑成功',
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
          <Button type="primary" onClick={this.showDrawer} icon="plus">
            新建步骤
          </Button>
        </div>

        <div className={styles.cardList}>
          <List
            rowKey="id"
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
                    trigger={['click']}
                    overlay={
                      <Menu onClick={this.onClickMenu}>
                        <Menu.Item key="edit">
                          <EditOutlined /> 编辑
                        </Menu.Item>
                        <Menu.Item key="del" style={{ color: 'red' }}>
                          <DeleteOutlined /> 删除
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

        <Pagination style={{ float: 'right' }}
          current={this.state.page.page}
          total={this.state.total} onChange={this.onChangePage}
          showSizeChanger onShowSizeChange={this.onShowSizeChange}
          defaultPageSize={12}
          pageSizeOptions={['12', '24', '36', '48']}
        />

        <Drawer
          title={this.state.title}
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
            <Form.Item label="步骤脚本">
              
            </Form.Item>
            <Form.Item label="步骤名称">
              <Input placeholder="请输入步骤名称" />
            </Form.Item>
            <Form.Item label="步骤描述">

            </Form.Item>
            <Form.Item label="分类">
              <Select placeholder="请选择分类">
                <Option value="jack">Jack</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>是否可见</span>
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </div>
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>是否添加红线</span>
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </div>
            </Form.Item>
            <Form.Item label="添加参数">
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
