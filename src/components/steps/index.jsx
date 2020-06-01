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
import { SearchOutlined, BlockOutlined, StarFilled, CloseCircleOutlined } from '@ant-design/icons';
import { getPipelineList } from '@/services/pipeline';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';
const { Search } = Input;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class StepList extends PureComponent {
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
  addPipeline() { }

  render() {
    const {
      list: { list },
      loading,
    } = this.props;

    return (
      <div className={styles.step}>
        <div  >
          <div >
            <Tooltip title="1">
              <div >11</div>
            </Tooltip>
          </div >
          <div></div>
          <div >.........</div>
        </div >
      </div >
    );
  }
}

export default StepList;
