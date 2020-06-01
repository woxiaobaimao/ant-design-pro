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
} from 'antd';
import { AppleOutlined, AndroidOutlined, SmallDashOutlined } from '@ant-design/icons';
import { templateTypeListXXX, tTaskTemplatePage } from '@/services/pipeline';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';
const { Search } = Input;
const { TabPane } = Tabs;

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

    // getPipelineList({}).then(response => {
    //   this.setState({
    //     tableData: response.data.data.rows,
    //     total: response.data.data.total
    //   });
    // })
  };
  editTask = () => {};
  delTask = () => {};

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    this.initData();
  }
  addPipeline() {}
  changeTabs(key) {}
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

                  <div>12</div>

                  {/* 图标 */}

                  <div>11</div>

                  <div>22</div>
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
          tabBarExtraContent={<Button type="primary">新建</Button>}
        >
          {TabPaneItems}
        </Tabs>
        ,
        <Modal
          visible={this.state.visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        />
      </PageHeaderWrapper>
    );
  }
}

export default CardList;
