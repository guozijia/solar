<template>
  <div>
    <el-badge :value="alarmbar" :max="99" :hidden="this.alarmbar === 0">
      <svg-icon icon-class="alarmbar" class="alarmbar" @click="click" />
    </el-badge>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'alarmbar'
    ])
  },
  components: {},
  created() {

  },
  methods: {

    click: function() {

    }
  }
}
</script>

<style lang="scss" scoped>
.el-badge{
    .el-badge__content{
        margin-top: 5px !important;
    }
}
</style>
