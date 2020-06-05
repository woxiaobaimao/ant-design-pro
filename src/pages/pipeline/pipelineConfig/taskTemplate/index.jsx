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
import {
  createFromIconfontCN,
  EditOutlined, DeleteOutlined, AppleOutlined,
  AndroidOutlined, SmallDashOutlined
} from '@ant-design/icons';
import {
  templateTypeListXXX,
  tTaskTemplatePage,
  tTaskTemplategetTaskTemplate,
  tTaskTemplatedeleteTaskTemplate,
  tTaskTemplateAddTaskTemplate
} from '@/services/pipeline';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import IconSelect from '@/components/IconSelect';
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
    productTypeList: [],
    page: {
      page: 1,
      limit: 12,
      taskName: "",
      taskType: ""
    },
    total: 0,
    visible: false,
    title: "新建",
    dialogIconVisible: false
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
      this.getproductType()
      let { isJob, paramList, stepTemplates, taskType, taskName, flowTaskName, taskImage, isProduct, productType } = response.data.data
      this.setState({
        title: '编辑',
        visible: true
      });
      this.props.form.setFieldsValue({
        isJob,
        taskType,
        taskName,
        flowTaskName,
        taskImage,
        isProduct,
        productType
      });
      isJob ? this.props.form.setFieldsValue({ stepTemplates })
        : this.props.form.setFieldsValue({ paramList })
    })
  }

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.isJob = values.isJob == 'true' ? 1 : 0
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

  addTask = () => {
    this.setState({
      title: '新建',
      visible: true
    });
  };

  // 取消
  onClose = () => {
    let { form } = this.props
    form.resetFields()
    this.setState({ visible: false });
  };

  getproductType() {
    templateTypeListXXX('product_type')
      .then(response => {
        this.setState({ productTypeList: response.data.data });
      })
  }

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

  addLine = () => {

    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextLine = keys.concat({ name: '', label: '' });
    form.setFieldsValue({
      keys: nextLine,
    });
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  getIconLabel(icon) {
    const { form } = this.props;
    form.setFieldsValue({
      taskImage: icon
    });
    this.closeIconSelect()
  }

  openIconSelect = () => {
    this.setState({ dialogIconVisible: true });
  }
  closeIconSelect = () => {
    this.setState({ dialogIconVisible: false });
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      taskTemplate: { type },
    } = this.props;

    // 表单参数列表


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

                  <svg style={{ fontSize: 56, width: 56, height: 56 }}>
                    <use xlinkHref={'#' + item.taskImage}></use>
                  </svg>

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
              <Button type="primary" icon="plus" onClick={this.addTask}>新建任务</Button>
            </div>}>
          {TabPaneItems}
        </Tabs>
        <Drawer
          title={this.state.title}
          visible={this.state.visible}
          placement="right"
          onClose={this.onClose}
          width="45%"
        >
          <Form layout="vertical">

            <Form.Item label="步骤类型" >
              {getFieldDecorator('isJob', {
                initialValue: 'false',
                rules: [{ required: true, message: '请选择任务分类', initialValue: 'false' }],
              })(
                <Radio.Group>
                  <Radio.Button value="false" style={{ width: 300, textAlign: 'center' }}>非job类</Radio.Button>
                  <Radio.Button value="true" style={{ width: 300, marginLeft: 20, textAlign: 'center' }}>job类</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            {
              getFieldValue('isJob') === 'false' ?
                <Form.Item label="添加参数">
                  {getFieldDecorator('paramList', {
                  })(
                    <Input></Input>
                  )}
                </Form.Item> :
                <Form.Item label="步骤列表">
                  {getFieldDecorator('stepTemplates', {
                  })(
                    <Input></Input>
                  )}
                </Form.Item>
            }
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
            <Form.Item label="任务图标">
              {getFieldDecorator('taskImage', {
              })(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <svg style={{
                    fontSize: 36, width: 36,
                    height: 36
                  }}>
                    <use xlinkHref={'#' + (this.props.form.getFieldValue('taskImage') || 'dp_docker')}></use>
                  </svg>
                  <Button onClick={this.openIconSelect} style={{ marginLeft: 10 }}>点击更换</Button>
                </div>
              )}
            </Form.Item>
            <Form.Item label="是否有产出物" labelCol={{ span: 22 }}>
              {getFieldDecorator('isProduct', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
            </Form.Item>

            {
              getFieldValue('isProduct') &&
              <Form.Item>
                {getFieldDecorator('productType', {
                  rules: [{ required: true, message: '请选择任务分类' }],
                })(<Select placeholder="请选择任务分类" >
                  {
                    this.state.productTypeList.map((item, key) => (
                      <Option key={key} value={item.typeFlag}>{item.typeName}</Option>
                    ))
                  }
                </Select>)}
              </Form.Item>
            }
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

        <Modal
          title="图片选择"
          visible={this.state.dialogIconVisible}
          onCancel={this.closeIconSelect}
          footer={[
            <Button key="back" onClick={this.closeIconSelect}>
              取消
            </Button>
          ]}
        >
          <IconSelect getIconLabel={type => this.getIconLabel(type)}></IconSelect>
        </Modal>
      </PageHeaderWrapper >
    );
  }
}

export default CardList;
