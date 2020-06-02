import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Tag,
  Modal,
  Row,
  Col,
  Divider,
  Tooltip,
  Button,
  Pagination,
  Input,
  List,
  Icon,
  Tabs,
} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, BlockOutlined, StarFilled, CloseCircleOutlined } from '@ant-design/icons';
import { getPipelineList } from '@/services/pipeline';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import StepList from '@/components/steps';
import PipelineTemplate from '@/components/pipelineTamplate';

const { TabPane } = Tabs;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class CardList extends PureComponent {
  state = {
    codeList: [1, 2],
    page: {
      page: 1,
      limit: 12,
    },
    total: 0,
    visible: false,
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
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

  changeSearchName = (e) => {
    this.setState({
      page: { ...this.state.page, pipelineName: e.target.value || undefined }
    });
  };

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
  changeTabs() { }

  render() {
    const {
      list: { list },
      loading,
    } = this.props;

    let codeReasourceItems = this.state.codeList.map((item, key) => (
      <div
        className={styles.codeBlock}
        key={key}
      ></div>
    ));

    return (
      <PageHeaderWrapper>
        <Card>
          <Tabs
            className={styles.step}
            defaultActiveKey="1"
            onChange={this.changeTabs}
            tabBarExtraContent={<div><Button type="primary">编辑</Button> <Button type="primary">运行</Button></div>}
          >
            <TabPane
              tab={
                <span>最近一次</span>
              }
              key={1}>
              <Row>
                <Col span={5}>
                  <div><span>1</span><MenuFoldOutlined></MenuFoldOutlined><span>运行成功</span></div>
                  <div>sonar红线</div>
                  <div>
                    <div>
                      <div></div>
                    </div>
                    <div>2020-06-02 11:10:02</div>
                  </div>
                  <Divider></Divider>
                  {/* 代码源 */}
                  <div>
                    <div>代码源</div>
                    <div>
                      <Button type="link">添加源</Button>
                    </div>
                    <div>
                      {codeReasourceItems}
                    </div>
                  </div>
                </Col>
                <Col span={19} className={styles.drawBg}>


                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={
                <span>历史记录</span>
              }
              key={2}>
              <div >
                运行记录
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderWrapper >
    );
  }
}

export default CardList;
