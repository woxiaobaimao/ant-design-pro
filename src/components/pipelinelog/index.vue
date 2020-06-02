<template>
  <div class="container">
    <div>
      <a-row v-loading="loading">
        <a-col :span="5">
          <div class="menu">
            <div v-for="(item, index) in items" :key="index" style="cursor: pointer;font-size: 16px;padding: 5px 10px;" :class="{'active':divIndex==index}" @click="lookLog(item,index)">
              <span v-if="item.result=='SUCCESS'" style="padding-right: 10px;">
                <a-icon type="check-circle" style="color:#15ad31" />
              </span>
              <span v-if="item.result=='FAILURE'" style="padding-right: 10px;">
                <a-icon type="close-circle" style="color:red" />
              </span>
              <span v-if="item.result=='NOT_BUILT'" style="padding-right: 10px;">
                <a-icon type="logout" style="color:gray" />
              </span>
              <span v-if="item.result=='RUNNING'" style="padding-right: 10px;">
                <a-icon type="sync" style="color:#4395ff" spin />
              </span>
              <span style="color:black">{{item.stepName +(item.durationInMillis?' ( '+item.durationInMillis+' )':'')}}</span>
            </div>
          </div>
        </a-col>
        <a-col :span="19">
          <div>
            <codemirror :content="content"></codemirror>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import codemirror from '@/components/codemirror'
import {
  rStepRunRecordgetSteps, rStepRunRecordgetStepeLog
} from '@/api/pipeline/rStepRunRecord/index'
export default {
  components: { codemirror },
  props: ['taskId', 'number'],
  data() {
    return {
      divIndex: 0,
      items: [],
      content: "",
      loading: true
    }
  },
  methods: {
    initData() {
      rStepRunRecordgetSteps(this.taskId, { taskId: this.taskId, buildNumber: this.number })
        .then(response => {
          this.items = response.data
          if (this.items.length > 0 && this.items[0].result != 'NOT_BUILT') {
            this.lookLog(this.items[0], 0)
          } else {
            this.loading = false
          }
        })
    },
    // 点击查看日志
    lookLog(item, index) {
      if (item.result != 'NOT_BUILT') {
        this.loading = true
        this.divIndex = index
        rStepRunRecordgetStepeLog(item)
          .then(response => {
            this.loading = false
            this.content = response.data.log.replace(/\\n/g, ' \n').replace(/1;33m|1;34m|\\r|\[m|\\u001B/g, '')
          })
      } else {
        this.$notification["info"]({
          message: "提示",
          description: "无法查看当前日志",
          duration: 8
        });
      }
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
}
.active {
  background: #e5e5e5;
}
</style>
