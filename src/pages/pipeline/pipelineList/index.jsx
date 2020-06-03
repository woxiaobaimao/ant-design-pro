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
  notification
} from 'antd';
import { SearchOutlined, BlockOutlined, StarFilled, CloseCircleOutlined } from '@ant-design/icons';
import {
  getPipelineList,
  deletePipelineData,
  gPipelineRunpipelineRun
} from '@/services/pipeline';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import StepList from '@/components/steps';
import PipelineTemplate from '@/components/pipelineTamplate';

const { Search } = Input;

const { confirm } = Modal;

class CardList extends PureComponent {
  state = {
    tableData: [],
    page: {
      page: 1,
      limit: 12,
    },
    total: 0,
    visible: false,
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
  addPipeline() { }

  gotoRunOrEdit(pipelineId, instNumber) {
    console.log(instNumber);
    if (instNumber) {
      this.props.history.push({ pathname: '/pipeline/pipelineRun', state: { pipelineId, number: instNumber } })
    } else {
      this.gotoEditor(pipelineId)
    }
  }

  gotoEditor(pipelineId) {
    this.props.history.push({ pathname: '/pipeline/pipelineEdit', state: { pipelineId } })
  }

  delPipeline(pipelineId) {
    confirm({
      title: "提示",
      content: "是否删除流水线?",
      onOk: () => {
        deletePipelineData(pipelineId).then(response => {
          notification["success"]({
            message: "提示",
            description: "删除成功",
            duration: 8
          });
          this.initData()
        })
      }
    });
  }

  gotoRunFlow = (pipelineId) => {
    gPipelineRunpipelineRun(pipelineId).then(response => {
      notification["success"]({
        message: "提示",
        description: "运行成功",
        duration: 8
      });
      this.props.history.push({ pathname: '/pipeline/pipelineRun', state: { pipelineId, number: response.data.data.instNumber } })
    })
  }

  render() {

    return (
      <PageHeaderWrapper title="卡片列表">
        <div className={styles.pageTitle}>
          <Search
            value={this.state.page.pipelineName}
            onChange={this.changeSearchName}
            placeholder="请输入流水线名称"
            onSearch={this.initData}
            style={{ width: 200 }}
          />
          <Button type="primary" icon="plus" onClick={this.showModal}>
            新建流水线
          </Button>
        </div>

        <div className={styles.cardList}>
          <List
            rowKey="id"
            grid={{ gutter: 15, lg: 4 }}
            dataSource={this.state.tableData}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  className={styles.card}
                  title={item.pipelineName}
                  extra={
                    <div>
                      <Tooltip title="星标">
                        <StarFilled style={{ color: 'rgb(255, 175, 56)', paddingRight: 10 }} />
                      </Tooltip>
                      <Tooltip title="运行成功">
                        <CloseCircleOutlined style={{ color: 'red' }} />
                      </Tooltip>
                    </div>
                  }
                  bodyStyle={{ padding: '24px 0' }}
                  onClick={(e) => this.gotoRunOrEdit(item.pipelineId, item.instNumber)}
                >
                  <div className={styles.tag}>
                    <Tag>{'#' + (item.instNumber || '')}</Tag>
                    <BlockOutlined style={{ paddingRight: 10 }} />
                    <Tooltip title={item.serviceName}>
                      <div>{item.serviceName}</div>
                    </Tooltip>
                  </div>
                  <StepList></StepList>
                  <Divider />
                  <div className={styles.time}>
                    <div>
                      <Icon type="user" /> {item.runPerson}
                    </div>
                    <Divider type="vertical" />
                    <div>
                      <Icon type="user" />
                      {item.lastRunTime}
                    </div>
                  </div>
                  <Divider />

                  <div className={styles.cardBootom}>
                    <div>
                      <Tooltip title="编辑">
                        <Button icon="setting" size="small" shape="circle"
                          style={{ color: '#506f81', background: '#d4d8e1' }}
                          onClick={(e) => this.gotoEditor(item.pipelineId, e)}
                        />
                      </Tooltip>
                      <Tooltip title="删除">
                        <Button icon="delete" size="small" shape="circle"
                          style={{ marginLeft: 10, color: '#506f81', background: '#d4d8e1' }}
                          onClick={(e) => this.delPipeline(item.pipelineId, e)}
                        />
                      </Tooltip>
                    </div>
                    <div>
                      <Button type="primary" icon="caret-right" onClick={(e) => this.gotoRunFlow(item.pipelineId, e)}>运行</Button>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>

        <Pagination style={{ float: 'right', marginTop: 20 }} current={this.state.page.page} showSizeChanger pageSizeOptions={['12', '24', '36', '48']} total={this.state.total} />

        {/* 选择流水线模板 */}
        <Modal
          visible={this.state.visible}
          title="选择流水线模板"
          width="60%"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>
          ]}
        >
          <PipelineTemplate></PipelineTemplate>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default CardList;
