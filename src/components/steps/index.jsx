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


class StepList extends PureComponent {
  state = {
    stepList: [1, 2]
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


  componentDidMount() {
    this.initData();
  }

  render() {

    const stepListItems = this.state.stepList.map((item, key) =>
      <div key={key} className={styles.stepClass}>
        <div className="antd- antd-correct">
          {/* <Tooltip title="1">
            <div className={styles.text}>代码扫描</div>
          </Tooltip> */}
        </div >
        <div className={styles.line}></div>
        {/* <div >.........</div> */}
      </div >
    )

    return (
      <div className={styles.stepClass}>
        {stepListItems}
      </div >
    );
  }
}

export default StepList;
