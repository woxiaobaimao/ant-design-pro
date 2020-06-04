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
  Select,
  notification

} from 'antd';
import { EditOutlined, DeleteOutlined, AppleOutlined, AndroidOutlined, SmallDashOutlined } from '@ant-design/icons';
import { templateTypeListXXX, tTaskTemplatePage, tTaskTemplategetTaskTemplate, tTaskTemplatedeleteTaskTemplate } from '@/services/pipeline';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';

const FormItem = Form.Item;
const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;

@Form.create()

@connect(({ taskTemplate, loading }) => ({
  taskTemplate
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
    visible: false,
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

    const { dispatch } = this.props;

    // dispatch({
    //   type: 'taskTemplate/initType',
    //   payload: "task_type",
    //   callback: (res) => {
    //     tTaskTemplatePage(this.state.page).then(response => {
    //       this.setState({
    //         tableData: response.data.data.rows,
    //         total: response.data.data.total,
    //       });
    //     });
    //   }
    // });

    // this.activeKey = 1
    // this.page.taskType = response.data[0].typeFlag

  };
  onClickMenu = (row, { key }) => {
    if (key == 'edit') {
      this.editStep(row.taskId)
    } else {
      this.delStep(row)
    }
  }
  delStep = (row) => {
    confirm({
      title: '提示',
      content: '此操作将永久删除, 是否继续? ?',
      onOk: () => {
        tTaskTemplatedeleteTaskTemplate({
          taskId: row.taskId
        }).then(() => {
          notification['success']({
            message: '操作提示',
            description: '删除成功',
          });
          this.initData()
        })
      }
    })
  };
  editStep = (taskId) => {
    tTaskTemplategetTaskTemplate(taskId).then((response) => {
      this.setState({
        visible: true
      });
      notification['success']({
        message: '操作提示',
        description: '编辑成功',
      });
      this.initData()
    })
  }

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
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
  changeTabs(key) { }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      taskTemplate: { type },
    } = this.props;

    console.log(type);

    let typeListItems = this.state.typeList.map((item, key) => (
      <Option value="jack" key={key}> Jack</Option>
    ));

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
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={this.state.tableData}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card}>
                  <div style={{ textAlign: 'right' }}>
                    <Dropdown
                      overlay={
                        <Menu onClick={(e) => { this.onClickMenu(item, e) }}>
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
          <Form layout="vertical">

            <Form.Item label="步骤类型" rules={[{ required: true }]}>
              {/* <Input /> */}
            </Form.Item>
            <Form.Item label="添加参数" rules={[{ required: true }]}>
              {/* <Input /> */}
            </Form.Item>
            <Form.Item label="任务分类" rules={[{ required: true }]}>
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择任务分类' }],
              })(<Select placeholder="请选择任务分类">
                {typeListItems}
              </Select>)}
            </Form.Item>
            <Form.Item label="中文名称">
              {getFieldDecorator('zn', {
                rules: [{ required: true, message: '请输入中文名称' }],
              })(<Input placeholder="请输入中文名称" />)}
            </Form.Item>
            <Form.Item label="英文名称">
              {getFieldDecorator('en', {
                rules: [{ required: true, message: '请输入英文名称' }],
              })(<Input placeholder="请输入英文名称" />)}
            </Form.Item>
            <Form.Item name="任务图标" label="任务图标" rules={[{ required: true }]}>
              {/* <Input /> */}
            </Form.Item>
            <Form.Item rules={[{ required: true }]}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>是否有产出物</span>
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </div>
            </Form.Item>
          </Form>
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'left',
            }}
          >
            <Button onClick={this.handleSubmit} type="primary">
              保存
            </Button>
            <Button onClick={this.onClose} style={{ marginLeft: 8 }}>
              取消
            </Button>
          </div>
        </Drawer >

      </PageHeaderWrapper >
    );
  }
}

export default CardList;
