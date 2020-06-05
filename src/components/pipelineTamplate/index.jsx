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
    });
    // 列表初始化
    let type = 'java'
    tPipelineTemplateFindByType({ pipelineType: type }).then(response => {
      this.setState({
        pipelineList: response.data.data
      });
      console.log(response.data.data);
    });
  };
  changeTabs = () => {

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
            renderItem={item2 => (
              <List.Item>
                <Card className={styles.card} bodyStyle={{ padding: 0 }} >
                  <div><AppleOutlined></AppleOutlined> {item2.pipelineName}</div>
                  <div className={styles.draw}>
                    {/* {item.phases} */}
                    {/* {item.phases.map((phaseItem, key2) => (
                      <div key={key2}>
                        1
                      </div>
                    ))} */}
                    <div className={styles.block} >
                      <div>
                        <div >
                          <div className={styles.block}>
                            <span>test</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.line}></div>
                    </div>

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
          <Button type="primary" icon="plus">新建流水线模板</Button>
        }
      >
        {TabPaneItems}
      </Tabs>
    );
  }
}

export default StepList;
