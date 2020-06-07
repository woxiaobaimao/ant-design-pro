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
import { AppleOutlined, SearchOutlined, BlockOutlined, StarFilled, CloseCircleOutlined } from '@ant-design/icons';
import { templateTypeListXXX, tPipelineTemplateFindByType } from '@/services/pipeline';
import styles from './style.less';
import InfiniteScroll from 'react-infinite-scroller';

const { Search } = Input;
const { TabPane } = Tabs;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class StepList extends PureComponent {
  state = {
    typeList: [],
    pipelineList: [],
    loading: false,
    hasMore: true,
  };
  // 初始化数据
  initData = () => {
    // 类型初始化
    templateTypeListXXX('pipeline_type').then(response => {
      this.setState({
        typeList: response.data.data
      });
      this.getTemplateList()
    });

  };
  // 初始化模板数据
  getTemplateList(type = 'java') {
    tPipelineTemplateFindByType({ pipelineType: type })
      .then(response => {
        this.setState({
          pipelineList: response.data.data
        });
      })
  }
  changeTabs = (key) => {
    let typeParam = {
      typeName: this.state.typeList[key].typeName,
      typeFlag: this.state.typeList[key].typeFlag
    }
    this.getTemplateList(this.state.typeList[key].typeFlag)
  }

  gotoEditor(id) {
    this.props.clickBack(id);
  }
  componentDidMount() {
    this.initData();
  }

  render() {
    let TabPaneItems = this.state.typeList.map((item, key) => (
      <TabPane
        tab={
          <span>
            {item.typeName}
          </span>
        }
        key={key}
      >
        <div style={{ height: 600, overflowX: 'hidden', overflowY: 'auto' }}>
          <List grid={{ gutter: 16, column: 1 }}
            dataSource={this.state.pipelineList}
            renderItem={item => (
              <List.Item>
                <Card className={styles.card} bodyStyle={{ padding: 0 }} onClick={e => { this.gotoEditor(item.pipelineId) }}>
                  <div><AppleOutlined></AppleOutlined> {item.pipelineName}</div>
                  <div className={styles.draw}>
                    {/* {item.phases} */}
                    {(item.phases || []).map((phaseItem, key) => (
                      <div className={styles.stage} key={key}>
                        <div className={styles.block}>

                          <div className={styles.block}>
                            <span>{phaseItem.phaseName}</span>
                          </div>


                        </div>
                        <div className={styles.line}></div>
                      </div>
                    ))}
                  </div>
                </Card>
              </List.Item>
            )}>
          </List>
        </div>
      </TabPane >
    ));

    return (
      <Tabs
        className={styles.step}
        defaultActiveKey="1"
        onChange={this.changeTabs}
        tabBarExtraContent={
          this.props.showAdd &&
          <Button type="primary" icon="plus">新建流水线模板</Button>
        }
      >
        {TabPaneItems}
      </Tabs>
    );
  }
}

export default StepList;
