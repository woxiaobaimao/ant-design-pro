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
  Cascader
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
  tTaskTemplateAddTaskTemplate,
  templateTypeGetTemplatByType,
  tTaskTemplateeditTaskTemplate
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
    taskId: '',
    typeList: [],
    listCard: [],
    productTypeList: [],
    varList: [{
      paramKey: '',
      paramName: '',
      inputStyle: '',
    }],
    Cascaders: [],
    stepList: [],
    page: {
      page: 1,
      limit: 12,
      taskName: "",
      taskType: ""
    },
    total: 0,
    visible: true,
    title: "新建",
    dialogIconVisible: false
  };
  // 参数key
  save1 = (key, e) => {
    console.log(e.target.value);
    this.setState({
      varList: this.state.varList.map((item, index) =>
        (index == key ? { ...item, 'paramKey': e.target.value } : item))
    });
  }
  // 参数名称
  save2 = (key, e) => {
    console.log(e);
    this.setState({
      varList: this.state.varList.map((item, index) =>
        (index == key ? { ...item, 'paramName': e.target.value } : item))
    });
  }
  // 参数类型
  save3 = (key, value) => {
    this.setState({
      varList: this.state.varList.map((item, index) =>
        (index == key ? { ...item, 'inputStyle': value } : item))
    });
  }
  // 默认值
  save4 = (key, e) => {
    this.setState({
      varList: this.state.varList.map((item, index) =>
        (index == key ? { ...item, 'defaultValue': e.target.value } : item))
    });
  }
  // 单选框
  save5 = (key, e) => {
    console.log(e.target.checked);
    this.setState({
      varList: this.state.varList.map((item, index) =>
        (index == key ? { ...item, 'checkNick': e.target.checked } : item))
    });
  }
  // url
  save6 = (key, e) => {
    this.setState({
      varList: this.state.varList.map((item, index) =>
        (index == key ? { ...item, 'apiUrl': e.target.value } : item))
    });
  }
  // 获取级联
  getCascader() {
    templateTypeGetTemplatByType('step_type')
      .then(response => {
        const newData = []
        let obj = {}
        response.data.map(item => {
          const newChildren = []
          obj = item
          obj['label'] = item['typeName']
          obj['value'] = item['typeFlag']
          delete obj['typeName']
          delete obj['typeFlag']
          item['templateData'].map(item2 => {
            newChildren.push({
              label: item2.stepName,
              value: item2.stepId
            })
          })
          obj['children'] = newChildren
          newData.push(obj)
        })
        this.setState({
          Cascaders: newData
        });
      })
  }
  CascaderChange = value => {
    var key = value[1]
    var name = this.state.Cascaders.find((item) => item.value == value[0]).children.find((item) => item.value == value[1]).label
    this.setState({
      stepList: this.state.stepList.concat({
        stepName: name,
        stepId: key
      })
    });
  }
  delCascader = key => {
    confirm({
      title: '提示',
      content: '是否删除?',
      onOk: () => {
        this.setState({
          stepList: this.state.stepList.splice(key, 1)
        });

      }
    })

  }
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

    this.getCascader()
    // const { dispatch } = this.props;

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
        taskId,
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
      this.getCascader()
      isJob ? this.props.form.setFieldsValue({ stepTemplates })
        : this.props.form.setFieldsValue({ paramList })
    })
  }


  // 新增
  handleSubmit = e => {

    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.title == "新增") {
          values.isJob = values.isJob == 'true' ? 1 : 0
          if (values.isJob == 'true') {
            values.isJob = 1
            values.stepTemplates = this.state.stepList.map((item, key) => { return { stepId: item.stepId, stepOrder: key } })
          }
          else {
            values.isJob = 0
            values.paramList = this.state.varList
          }
          tTaskTemplateAddTaskTemplate(values).then(() => {
            notification['success']({
              message: '提示',
              description: '添加成功',
              duration: 8
            })
            this.onClose()
          })
        } else {
          if (values.isJob == 'true') {
            values.isJob = 1
            values.stepTemplates = this.state.stepList.map((item, key) => { return { stepId: item.stepId, stepOrder: key } })
          } else {
            values.isJob = 0
            values.paramList = this.state.varList.map(item => {
              if (item.uiStyle == 'radio:booleanParam') {
                item.defaultValue = item.checkValue
              }
              return item
            })
          }
          values.taskId = this.state.taskId
          tTaskTemplateeditTaskTemplate(values).then(() => {
            this.$notification['success']({
              message: '提示',
              description: '添加成功',
              duration: 8
            })
            this.closeDrawer()
          })

        }
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
    this.setState({
      varList: this.state.varList.concat({})
    });
  };

  remove = k => {
    if (k === 0) {
      return;
    }
    this.setState({
      varList: this.state.varList.splice(k, 1)
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
                      {this.state.varList.map((item, key) => (
                        <Row className={styles.content} gutter={10}>
                          <Col span={this.state.varList[key].checkNick ? 3 : 4}>
                            <Input placeholder="请输入参数key" onChange={e => { this.save1(key, e) }} />
                          </Col>
                          <Col span={this.state.varList[key].checkNick ? 3 : 4}>
                            <Input placeholder="请输入参数名称" onChange={e => { this.save2(key, e) }} />
                          </Col>
                          <Col span={this.state.varList[key].checkNick ? 3 : 4}>
                            <Select placeholder="请选择参数类型" onChange={e => { this.save3(key, e) }}>
                              <Option value="text:string">文本框</Option>
                              <Option value="radio:booleanParam">单选框</Option>
                              <Option value="select:string">下拉列表</Option>
                              <Option value="textarea:text">文本域</Option>
                              <Option value="password:password">密码框</Option>
                            </Select>
                          </Col>
                          <Col span={this.state.varList[key].checkNick ? 7 : 8}>
                            <Input placeholder="请输入默认值" onChange={e => { this.save4(key, e) }} />
                          </Col>
                          <Col span={2} style={{ textAlign: 'center' }}>
                            <Checkbox onChange={e => { this.save5(key, e) }} ></Checkbox>
                          </Col>
                          {this.state.varList[key].checkNick &&
                            <Col span={4} >
                              <Input placeholder="请输入Url" onChange={e => { this.save6(key, e) }} />
                            </Col>
                          }
                          <Col span={1} >
                            <Button type="link" icon="delete" onClick={e => { this.remove(key) }}></Button>
                          </Col>
                        </Row>
                      ))}
                      <div style={{ color: '#2d8cf0', textAlign: 'center', padding: ' 5px 0' }}>
                        <Button type="link" icon="plus" onClick={this.addLine}>新增一行</Button>
                      </div>
                    </div>
                  )}
                </Form.Item> :
                <Form.Item label="步骤列表">
                  {getFieldDecorator('stepTemplates', {
                  })(
                    <div>
                      <Cascader options={this.state.Cascaders} onChange={this.CascaderChange}>
                        <Button type="link" icon="plus">添加步骤</Button>
                      </Cascader>
                      {
                        this.state.stepList.map((item, key) => (
                          <div key={key} style={{
                            border: '1px solid rgba(235, 235, 235, 1)',
                            cursor: 'pointer', padding: '3px 17px',
                            marginTop: '10px', display: 'flex', justifyContent: 'space-between'
                          }}>
                            <div>
                              <Icon type="align-right" />
                              <Icon type="caret-right" style={{ padding: '0 10px' }} />
                              <span>{item.stepName}</span>
                            </div>
                            <div>
                              <Icon type="minus-circle" onClick={e => { this.delCascader(key) }} />
                            </div>
                          </div>
                        ))
                      }
                    </div>
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
