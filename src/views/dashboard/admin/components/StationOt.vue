<template>
  <div>
    <el-row>
      <div class="chart-container">
        <chart height="268px" width="100%" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Chart from '@/components/Charts/ScalePower'
export default {

  components: {
    Chart
  },
  data() {
    return {
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
