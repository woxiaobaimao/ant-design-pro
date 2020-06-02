<template>
  <div class="modelClass">
    <a-tabs @change="tabsChange" style="height:600px;overflow-y: auto;" defaultActiveKey="1">
      <a-button slot="tabBarExtraContent" type="primary" @click="addPipeline" icon="plus" v-if="showAdd" style="margin-right:20px">新建流水线模板</a-button>
      <a-tab-pane :tab="typeItem.typeName" v-for="(typeItem,key) in typeList" :key="key+1">
        <div>
          <div v-for="(pipelineItem,key) in pipelineList" :key="key" style="margin-top:20px">
            <div class="block_parents" @click="gotoEditor(pipelineItem.pipelineId)">
              <div>
                <img v-if="typeItem.typeName=='JAVA'" :src="JAVA" style="width: 20px;height: 20px;margin-top: -5px;margin-right: 10px;">
                <img v-if="typeItem.typeName=='NodeJs'" :src="NodeJs" style="width: 20px;height: 20px;margin-top: -5px;margin-right: 10px;">
                <img v-if="typeItem.typeName=='Go'" :src="Go" style="width: 20px;height: 20px;margin-top: -5px;margin-right: 10px;">
                <span>{{ pipelineItem.pipelineName }}</span>
              </div>
              <div class="draw">
                <!-- 阶段和横线 -->
                <div v-for="phaseItem in pipelineItem.phases" :key="phaseItem.id" class="stage">
                  <div>
                    <!-- 节点 -->
                    <div style="z-index: 99;">
                      <div class="block" style="margin-top: -13px;">
                        <span>{{ phaseItem.phaseName }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- 阶段横线 -->
                  <div class="line blockLine"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {
  templateTypeListXXX
} from '@/api/pipeline/templateType/index'
import {
  tPipelineTemplateFindByType
} from '@/api/pipeline/tPipelineTemplate/index'
import javaIcon from '@/assets/javaIcon.svg'
import NodeJsIcon from '@/assets/NodeJsIcon.svg'
import goIcon from '@/assets/goIcon.svg'
export default {
  name: 'PipelineTamplate',
  data() {
    return {
      typeList: [],
      taskTypeList: [],
      pipelineList: [],
      typeParam: {},
      JAVA: javaIcon,
      NodeJs: NodeJsIcon,
      Go: goIcon
    }
  },
  props: ['showAdd'],
  methods: {
    getImage() {
      return require('@/assets/javaIcon.svg')
    },
    tabsChange(key) {
      this.typeParam = {
        typeName: this.typeList[key - 1].typeName,
        typeFlag: this.typeList[key - 1].typeFlag
      }
      this.getTemplateList(this.typeList[key - 1].typeFlag)
    },
    getTypeList() {
      templateTypeListXXX('pipeline_type')
        .then(response => {
          this.typeList = response.data
        })
    },
    // 初始化模板数据
    getTemplateList(type = 'java') {
      tPipelineTemplateFindByType({ pipelineType: type })
        .then(response => {
          this.pipelineList = response.data
        })
    },
    addPipeline() {

      if (JSON.stringify(this.typeParam) == "{}") {
        this.typeParam = {
          typeName: this.typeList[0].typeName,
          typeFlag: this.typeList[0].typeFlag
        }
      }
      this.$emit('addPipeline', this.typeParam)
    },
    gotoEditor(id) {
      this.$emit('clickBack', id)
    }
  },
  mounted() {
    this.getTypeList()
    this.getTemplateList()
  }
}
</script>

<style scoped lang="scss">
.modelClass {
  background-color: white;
  padding: 18px;
}
.active .taskTypePic {
  border-color: rgba(45, 140, 240, 1);
}
.block_parents {
  height: 136px;
  background: #f6f6f5;
  padding: 20px;
  cursor: pointer;
}
.draw {
  display: flex;
  margin-top: 32px;
}
.circle {
  width: 10px;
  height: 10px;
  background: #787f88;
  border-radius: 50%;
  border: 1px solid #787f88;
}
.line {
  width: 40px;
  height: 1px;
  border-top: solid rgba(197, 200, 203, 1) 1px;
  margin-top: 5px;
}
.blockLine::before {
  content: " ";
  position: absolute;
  right: 36px;
  top: 2px;
  width: 7px;
  height: 7px;
  background-color: #acb0b6;
  border-radius: 4px;
}
.blockLine::after {
  content: " ";
  position: absolute;
  right: -2px;
  top: 2px;
  z-index: 9;
  width: 7px;
  height: 7px;
  background-color: #acb0b6;
  border-radius: 4px;
}

.block {
  width: 100px;
  height: 40px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: rgba(27, 27, 27, 0.6);
}
.draw .stage:last-child .blockLine {
  display: none;
}
.stage {
  display: flex;
  position: relative;
}
</style>
