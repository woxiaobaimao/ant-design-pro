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
  notification,
  Checkbox,
  Radio,

} from 'antd';
import { EditOutlined, DeleteOutlined, AppleOutlined, AndroidOutlined, SmallDashOutlined } from '@ant-design/icons';
import {
  templateTypeListXXX,
  tTaskTemplatePage,
  tTaskTemplategetTaskTemplate,
  tTaskTemplatedeleteTaskTemplate,
  tTaskTemplateAddTaskTemplate
} from '@/services/pipeline';

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
      taskName: "",
      taskType: ""
    },
    total: 0,
    visible: true,
    title: "新建"
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
      this.editTask(row.taskId)
    } else {
      this.delStep(row)
    }
  }

  changeJob = () => {
    console.log('切换job');
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
  // 编辑展示
  editTask = (taskId) => {
    tTaskTemplategetTaskTemplate(taskId).then((response) => {
      console.log(productType);
      let { productType, taskImage, isJob, taskType, taskName, flowTaskName } = response.data.data
      this.setState({
        visible: true
      });
      this.props.form.setFieldsValue({
        isJob,
        taskType,
        taskName,
        flowTaskName
        // isJob:,
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
        if (values.isJob == 'true') {
          values.stepTemplates = []
        } else {
          values.paramList = []
        }
        tTaskTemplateAddTaskTemplate(values).then(() => {
          notification['success']({
            message: '提示',
            description: '添加成功',
            duration: 8
          })
          this.onClose()
        })
      }
    });
  };

  showDrawer = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };

  changeSearchName = (e) => {
    this.setState({
      page: { ...this.state.page, taskName: e.target.value || undefined }
    });
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
  changeTabs(key) { }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      taskTemplate: { type },
    } = this.props;

    console.log(type);

    let typeListItems = this.state.typeList.map((item, key) => (
      <Option value={item.typeFlag} key={key}>{item.typeName}</Option>
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
            grid={{ gutter: 24, lg: 4 }}
            dataSource={this.state.tableData}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card} onClick={e => { this.editTask(item.taskId) }}>
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

        <Pagination style={{ float: 'right' }}
          current={this.state.page.page}
          total={this.state.total} onChange={this.onChangePage}
          showSizeChanger onShowSizeChange={this.onShowSizeChange}
          defaultPageSize={12}
          pageSizeOptions={['12', '24', '36', '48']}
        />
      </TabPane>
    ));

    return (
      <PageHeaderWrapper title="卡片列表">
        <Tabs
          defaultActiveKey="1"
          onChange={this.changeTabs}
          tabBarExtraContent={
            <div>
              <Search
                placeholder="请输入任务名称"
                onChange={this.changeSearchName}
                onSearch={this.initData}
                style={{ width: 200, marginRight: 10 }}
              />
              <Button type="primary" onClick={this.showDrawer}>新建</Button>
            </div>}>
          {TabPaneItems}
        </Tabs>
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
          <Form layout="vertical">

            <Form.Item label="步骤类型" >
              {getFieldDecorator('isJob', {
                initialValue: 'false',
                rules: [{ required: true, message: '请选择任务分类', initialValue: 'false' }],
              })(
                <Radio.Group onChange={this.changeJob} >
                  <Radio.Button value="false" style={{ width: 300, textAlign: 'center' }}>非job类</Radio.Button>
                  <Radio.Button value="true" style={{ width: 300, marginLeft: 20, textAlign: 'center' }}>job类</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="添加参数" >
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
                    <Button type="link" icon="delete" style={{ color: 'red' }}></Button>
                  </Col>
                </Row>
              </div>
            </Form.Item>
            <Form.Item label="任务分类" rules={[{ required: true }]}>
              {getFieldDecorator('taskType', {
                rules: [{ required: true, message: '请选择任务分类' }],
              })(<Select placeholder="请选择任务分类">
                {typeListItems}
              </Select>)}
            </Form.Item>
            <Form.Item label="中文名称">
              {getFieldDecorator('taskName', {
                rules: [{ required: true, message: '请输入中文名称' }],
              })(<Input placeholder="请输入中文名称" />)}
            </Form.Item>
            <Form.Item label="英文名称">
              {getFieldDecorator('flowTaskName', {
                rules: [{ required: true, message: '请输入英文名称' }],
              })(<Input placeholder="请输入英文名称" />)}
            </Form.Item>
            <Form.Item label="任务图标" >
              {/* <Input /> */}
            </Form.Item>
            <Form.Item>
              {/* {getFieldDecorator('isProduct', {
                valuePropName: 'checked',
                rules: [{ required: true, message: '请输入英文名称' }],
              })(<div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>是否有产出物</span>
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </div>)} */}
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
