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
    isleftPanel: false,
    codeList: []
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


  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    this.initData();
  }
  changeTabs() { }

  leftPanelFold = () => {
    this.setState({
      isleftPanel: !isleftPanel,
    });
  }

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
                <Col span={5} className={styles.leftPanel}>
                  <div className={styles.t1}>
                    <div>
                      <span>#21</span>
                      <MenuFoldOutlined style={{ padding: '0 10px' }} />
                      <span>运行成功</span>
                    </div>
                    <div>
                      <Button type="primary">停止</Button>
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>sonar红线</div>
                  <div style={{ marginTop: 10, display: 'flex' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <MenuFoldOutlined></MenuFoldOutlined>
                      <div style={{ marginLeft: 20 }}>
                        <div >Iva Guzman</div>
                        <div >运行人</div>
                      </div>
                    </div>
                    <div style={{ marginLeft: 20 }}>
                      <MenuFoldOutlined></MenuFoldOutlined>
                      <span>2分41秒</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <div>
                      <div></div>
                    </div>
                    <div> <MenuFoldOutlined></MenuFoldOutlined> 2020-06-02 11:10:02</div>
                  </div>
                  <Divider></Divider>
                  {/* 代码源 */}
                  <div>
                    <div>代码源</div>
                    <div>
                      <Button type="link" icon="plus" style={{ paddingLeft: 0 }}>添加源</Button>
                    </div>
                    <div>
                      {codeReasourceItems}
                    </div>
                  </div>
                </Col>
                <Col span={1}>
                  <MenuFoldOutlined onClick={this.leftPanelFold} />
                </Col>
                <Col span={18} className={styles.drawBg}>
                  <div className={styles.draw}>
                    <div className={styles.circle}></div>
                    <div className={styles.line}></div>
                    {/* 阶段 */}
                    <div className={styles.phase}>
                      <div className={styles.listAll}>
                        <div className={styles.superBlock}>
                          <MenuFoldOutlined style={{ paddingRight: 10 }}></MenuFoldOutlined>代码扫描
                        </div>
                        <div className={styles.taskList}>

                          <div className={styles.verticalLine}></div>
                          <div className={styles.subBlock}>
                            自动
                          </div>
                          <div className={styles.line} style={{ marginTop: 164 }}> </div>

                          <div className={styles.taskItem}>
                            <div style={{ display: 'flex' }}>
                              {/* 成功卡片 */}
                              {/* <div className={styles.runCard}>
                                <div styles={styles.header}>
                                  <span>SonarQube</span>
                                </div>
                                <div styles={styles.body}>
                                  部署失败，请查看部署详情
                                </div>
                              </div> */}
                              {/* 失败卡片 */}
                              <div className={styles.runCard}>
                                <div styles={styles.cardHeader}>
                                  <span>SonarQube</span>
                                </div>
                                <div className={styles.cardBody}>
                                  部署失败，请查看部署详情
                                </div>
                                <div className={styles.cardFooter}>
                                  <div className={styles.footerLeft}>
                                    <div>日志</div>
                                    <div>重试</div>
                                    <div>部署详情</div>
                                    <div>扫描报告</div>
                                  </div>
                                  <div>30秒</div>
                                </div>
                              </div>
                              <div className={styles.line} style={{ marginTop: 164 }}></div>
                              <div className={styles.circle} style={{ marginTop: 160 }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.line} style={{ position: 'absolute', width: '100%' }}></div>
                    </div>
                    <div className={styles.circle}></div>
                  </div>
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
