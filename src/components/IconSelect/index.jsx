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
  Tabs
} from 'antd';
import { SearchOutlined, BlockOutlined, StarFilled, CloseCircleOutlined } from '@ant-design/icons';
import { getPipelineList } from '@/services/pipeline';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import './iconfont';
import icons from './icons'

const { TabPane } = Tabs;

class StepList extends PureComponent {

  click(item) {
    // this.$emit('change', icon)
    console.log(item);
  }

  render() {
    const tabItems = icons.map((item, key) =>
      <TabPane tab={item.title} key={key}>
        <ul>
          {item.icons.map((item2, key2) =>
            <li key={key2} className={styles.list}>
              <svg className={styles.icon} aria-hidden="true" onClick={e => { this.click(item2) }}>
                <use xlinkHref={'#' + item2}></use>
              </svg>
            </li>
          )}
        </ul>
      </TabPane>
    )
    return (
      <Tabs defaultActiveKey="1">
        {tabItems}
      </Tabs>
    );
  }
}

export default StepList;
