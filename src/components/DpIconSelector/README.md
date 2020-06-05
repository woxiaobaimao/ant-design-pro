

### 使用方式

```vue
<template>
	<div>
       <icon-selector @change="handleIconChange"/>
    </div>
</template>

<script>
import DpIconSelector from '@/components/DpIconSelector'

export default {
  name: 'YourView',
  components: {
    DpIconSelector
  },
  data () {
    return {
    }
  },
  methods: {
    handleIconChange (icon) {
      console.log('change Icon', icon)
    }
  }
}
</script>
```



### 事件


| 名称   | 说明                       | 类型   | 默认值 |
| ------ | -------------------------- | ------ | ------ |
| change | 当改变了 `icon` 选中项触发 | String | -      |
