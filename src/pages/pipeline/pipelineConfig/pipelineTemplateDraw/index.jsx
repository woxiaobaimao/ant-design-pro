import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Tag,
  Modal,
  Row,
  Col,
  Tooltip,
  Button,
  Input,
  List,
  Icon,
  notification
} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, BlockOutlined, StarFilled, CloseCircleOutlined } from '@ant-design/icons';
import {
  getPipelineList,
  tPipelineTemplateId,
  deleteTemplate
} from '@/services/pipeline';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import StepList from '@/components/steps';
import PipelineTemplate from '@/components/pipelineTamplate';

const { confirm } = Modal

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

  saveJson() {
    tPipelineTemplateId(this.state.pipelineId).then(response => {
      notification['success']({
        message: '提示',
        description: '保存成功',
        duration: 8
      })
    })
  }

  delTemplate() {
    confirm({
      title: '提示',
      content: '是否删除模板?',
      onOk: () => {
        deleteTemplate(this.state.pipelineId).then(response => {
          notification['success']({
            message: '提示',
            description: '删除成功',
            duration: 8
          })
        })
      }
    })
  }


  closeModel = () => {
    this.props.history.push({
      pathname: '/pipeline/pipelineConfig/pipelineTemplate',
    })
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
      <PageHeaderWrapper title="pipeline模板">
        <Card className={styles.drawBg}>

          <div className={styles.drawTitle}>
            <div>流水线模板代码扫描</div>
            <div className={styles.drawButtons}>
              <Button type="primary" onClick={this.saveJson}>保存模板</Button>
              <Button onClick={this.delTemplate}>删除模板</Button>
              <Button type="link" icon="close" onClick={this.closeModel}></Button>
            </div>
          </div >

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
        </Card >
      </PageHeaderWrapper >
    );
  }
}

export default CardList;