<template>
  <div>
    <el-row class="formtop">
      <el-radio-group v-model="radio1" size="small">
        <el-radio-button label="日" />
        <el-radio-button label="月" />
        <el-radio-button label="年" />
        <el-radio-button label="总" />
      </el-radio-group>

      <el-date-picker
        v-if="radio1 != '总'"
        v-model="value1"
        size="small"
        :type="date"
        class="picker"
        placeholder="选择日期"
      />

    </el-row>

    <el-row style="margin-top:16px">
      <div class="chart-container">
        <chart height="416px" width="100%" />
      </div>
    </el-row>

  </div>
</template>

<script>
import Chart from '@/components/Charts/StationChart'
export default {

  components: {
    Chart
  },
  data() {
    return {
      radio1: '日',
      value1: new Date(),
      date: 'date'
    }
  },
  watch: {
    radio1: function(val, oldval) {
      if (val === '月') {
        this.date = 'month'
        this.value1 = new Date()
      } else if (val === '日') {
        this.date = 'date'
        this.value1 = new Date()
      } else {
        this.date = 'year'
        this.value1 = new Date()
      }
    }
  },

  methods: {}
}
</script>

<style scoped>
.formtop{
    display: flex;
}
.picker{
    margin-left: 16px;
}
.chart-container{
  position: relative;
  width: 100%;
}
</style>
