<template>
  <div class="codemirror-class">
    <codemirror :options="cmOptions" v-model="content_" ref="cmExpressionsRef"></codemirror>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
// 导入使用的语言语法定义文件
require('codemirror/mode/javascript/javascript.js')
require('codemirror/mode/shell/shell.js')
// 导入选中的theme文件
require('codemirror/theme/blackboard.css')
// 导入自动提示核心文件及样式
require('codemirror/addon/hint/show-hint.js')
// 导入指定语言的提示文件
require('codemirror/addon/hint/javascript-hint.js')
require('codemirror/mode/shell/shell')
export default {
  props: {
    content: String
  },
  data() {
    return {
      cmOptions: {
        mode: 'shell', // 识别的语言javascript
        tabSize: 2,
        lineWrapping: true,
        theme: 'blackboard', // 编辑器的主题
        lineNumbers: true, // 显示行号
        line: true,
        autoRefresh: true

      }
    }
  },
  computed: {
    content_: {
      get() {
        return this.content;
      },
      set(val) {
        this.$emit("saveStepSrcipt", val)
      }
    }
  },
  components: {
    codemirror
  },
  mounted() {
    setTimeout(
      function () {
        this.$refs.cmExpressionsRef.codemirror.refresh();
      }.bind(this),
      0
    );
  },
}
</script>
<style scoped>
.codemirror-class >>> .CodeMirror {
  height: 500px !important;
}
</style>
