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
} from 'antd';
// import { EditOutlined } from '@ant-design/icons';
import { getPipelineList } from '@/services/pipeline';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';
const { Search } = Input;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
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
    getPipelineList({}).then(response => {
      this.setState({
        tableData: response.data.data.rows,
        total: response.data.data.total,
      });
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
  addPipeline() {}

  render() {
    const {
      list: { list },
      loading,
    } = this.props;

    return (
      <PageHeaderWrapper title="卡片列表">
        <div className={styles.pageTitle}>
          <Search
            placeholder="请输入流水线名称"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
          <Button type="primary" onClick={this.showModal}>
            新建流水线
          </Button>
        </div>

        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={this.state.tableData}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  className={styles.card}
                  title={item.pipelineName}
                  extra={<a href="#">More</a>}
                >
                  <div className={styles.subTitle}>
                    <Tag>{'#' + item.instNumber}</Tag>
                    <Icon />
                    <Tooltip title={item.serviceName}>
                      <div>{item.serviceName}</div>
                    </Tooltip>
                  </div>
                  <Divider />
                  {/* 步骤条 */}
                  <Divider />

                  <div className={styles.cardBootom}>
                    <div>
                      <Tooltip>
                        <Button shape="circle" />
                      </Tooltip>
                      <Tooltip>
                        <Button shape="circle" style={{ marginLeft: 10 }} />
                      </Tooltip>
                    </div>
                    <div>
                      <Button type="primary">运行</Button>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>

        <Pagination style={{ float: 'right' }} />

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
