<!--
 * @Author: 中原
 * @Date: 2020-04-10 15:01:19
 * @LastEditTime: 2020-04-14 10:34:18
 * @Description: 横向步骤模板
 * @FilePath: \devops-ui\src\components\steps\index.vue
 -->
<template>
  <div class="stepClass flexCenter">
    <div class="flexCenter" v-for="(item, index) in stepList" :key="index" v-if="index<3">
      <div :class="'stateIcon stateIcon-'+item.status">
        <a-tooltip :title="item.phaseName">
          <div class="text">{{ item.phaseName.length>8 ? item.phaseName.substr(0,8)+'...':item.phaseName }}</div>
        </a-tooltip>
      </div>
      <div class="line" v-if="stepList.length!=(index+1) && index<2"></div>
      <div style="margin-top: -8px;letter-spacing: 2px;" v-if=" index==2">.........</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stepList: {
      type: Array,
    }
  }
}
</script>

<style scoped lang="scss">
.flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
// 步骤条
.stepClass {
  height: 30px;
  .stateIcon {
    width: 13px;
    height: 14px;
    .text {
      position: absolute;
      transform: translate(-35%, -25px);
    }
  }
  .stateIcon-IN_PROGRESS {
    background: url("../../assets/u417.png") center/13px 13px no-repeat;
  }
  .stateIcon-CANCELED {
    background: url("../../assets/u408.png") center/13px 13px no-repeat;
  }
  .stateIcon-NOT_PROGRESS {
    background: url("../../assets/u410.svg") center/13px 13px no-repeat;
  }
  .stateIcon-SUCCESS {
    background: url("../../assets/u336.png") center/13px 13px no-repeat;
  }
  .stateIcon-FAILURE {
    background: url("../../assets/u408.png") center/13px 13px no-repeat;
  }
  .line {
    width: 57px;
    height: 1px;
    margin-top: -1px;
    background: #cfcfcf;
  }
}
</style>
