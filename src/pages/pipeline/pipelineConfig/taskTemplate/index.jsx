import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Tabs,
  Tag,
  Modal,
  Menu,
  Dropdown,
  Row,
  Col,
  Divider,
  Tooltip,
  Button,
  Pagination,
  Input,
  List,
  Icon,
  Drawer,
  Form,
  Switch,
  Select

} from 'antd';
import { AppleOutlined, AndroidOutlined, SmallDashOutlined } from '@ant-design/icons';
import { templateTypeListXXX, tTaskTemplatePage } from '@/services/pipeline';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';
const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class CardList extends PureComponent {
  state = {
    typeList: [],
    listCard: [],
    page: {
      page: 1,
      limit: 12,
    },
    total: 0,
    visible: true,
  };


  // 初始化数据
  initData = () => {
    templateTypeListXXX('task_type').then(response => {
      // this.activeKey = 1
      this.setState({
        typeList: response.data.data,
      });
      // this.page.taskType = response.data[0].typeFlag
      // 任务列表
      tTaskTemplatePage(this.state.page).then(response => {
        this.setState({
          tableData: response.data.data.rows,
          total: response.data.data.total,
        });
      });
    });

    // getPipelineList({}).then(response => {
    //   this.setState({
    //     tableData: response.data.data.rows,
    //     total: response.data.data.total
    //   });
    // })
  };
  editTask = () => { };
  delTask = () => { };

  showDrawer = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };



  componentDidMount() {
    this.initData();
  }
  changeTabs(key) { }
  render() {
    const {
      list: { list },
      loading,
    } = this.props;

    let TabPaneItems = this.state.typeList.map((item, key) => (
      <TabPane
        tab={
          <span>
            <AppleOutlined />
            {item.typeName}
          </span>
        }
        key={key}
      >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={this.state.tableData}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card}>
                  <div style={{ textAlign: 'right' }}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item>
                            <SmallDashOutlined onClick={this.editTask} /> 编辑
                          </Menu.Item>
                          <Menu.Item>
                            <SmallDashOutlined onClick={this.delTask} /> 删除
                          </Menu.Item>
                        </Menu>
                      }
                      placement="bottomLeft"
                    >
                      <SmallDashOutlined />
                    </Dropdown>
                  </div>

                  {/* 图标 */}

                  <div>{item.taskName}</div>

                  <div>{item.flowTaskName || '--'}</div>
                </Card>
              </List.Item>
            )}
          />
        </div>

        <Pagination style={{ float: 'right' }} />
      </TabPane>
    ));

    return (
      <PageHeaderWrapper title="卡片列表">
        <Tabs
          defaultActiveKey="1"
          onChange={this.changeTabs}
          tabBarExtraContent={<Button type="primary" onClick={this.showDrawer}>新建</Button>}
        >
          {TabPaneItems}
        </Tabs>
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
            <Form.Item name="步骤类型" label="步骤类型" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="添加参数" label="添加参数" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="任务分类" label="任务分类" rules={[{ required: true }]}>
              <Select >
                <Option value="jack">Jack</Option>
              </Select>
            </Form.Item>
            <Form.Item name="中文名称" label="中文名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="英文名称" label="英文名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="任务图标" label="任务图标" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item rules={[{ required: true }]}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>是否有产出物</span>
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </div>
            </Form.Item>
          </Form>
        </Drawer >

      </PageHeaderWrapper >
    );
  }
}

export default CardList;
