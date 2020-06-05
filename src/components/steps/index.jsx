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
import { SearchOutlined, BlockOutlined, StarFilled, CloseCircleOutlined, SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { getPipelineList } from '@/services/pipeline';

import IN_PROGRESS from '@/assets/IN_PROGRESS.svg';
import NOT_PROGRESS from '@/assets/NOT_PROGRESS.svg';
import SUCCESS from '@/assets/SUCCESS.svg';
import FAILURE from '@/assets/FAILURE.svg';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';


class StepList extends PureComponent {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }

  render() {
    const statuFun = (status) => {
      switch (status) {
        case 'IN_PROGRESS':
          return <img src={IN_PROGRESS} style={{ width: 14, height: 14 }} />
          break;
        case 'CANCELED':
          return <img src={FAILURE} style={{ width: 14, height: 14 }} />
          break;
        case 'NOT_PROGRESS':
          return <img src={NOT_PROGRESS} style={{ width: 14, height: 14 }} />
          break;
        case 'SUCCESS':
          return <img src={SUCCESS} style={{ width: 14, height: 14 }} />
          break;
        case 'FAILURE':
          return <img src={FAILURE} style={{ width: 14, height: 14 }} />
          break;
        default:
          return <img src={FAILURE} style={{ width: 14, height: 14 }} />
      }
    }
    const stepListItems = (this.props.stepList || []).map((item, key) => {
      let statuIcon = statuFun(item.status)
      return (
        <div key={key} className={styles.stepClass}>
          <div >
            {statuIcon}
            <Tooltip title={item.phaseName}>
              <div className={styles.text}>{item.phaseName}</div>
            </Tooltip>
          </div>
          {
            this.props.stepList.length != (key + 1) &&
            <div className={styles.line} ></div>
          }
          {/* <div >.........</div> */}
        </div >
      )
    }
    )

    return (
      <div className={styles.stepClass}>
        {stepListItems}
      </div >
    );
  }
}

export default StepList;
