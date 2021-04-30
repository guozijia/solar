<template>
  <div>
    <el-row class="formtop">
      <el-radio-group v-model="radio1" size="small">
        <el-radio-button label="本月" />
        <el-radio-button label="本年" />
      </el-radio-group>

      <el-date-picker
        v-model="value1"
        size="small"
        type="month"
        class="picker"
        placeholder="选择日期"
      />

    </el-row>

    <el-row style="margin-top:16px">
      <el-col :span="14">
        <div class="chart-container">
          <chart height="500px" width="100%" />
        </div>
      </el-col>

      <el-col :span="10">
        <chart-r height="500px" width="100%" />
      </el-col>

    </el-row>

  </div>
</template>

<script>
import Chart from '@/components/Charts/Device'
import ChartR from '@/components/Charts/ChartR'
export default {

  components: {
    Chart,
    ChartR
  },
  data() {
    return {
      radio1: '本年',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: ''
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
  height: 500px;
}
</style>
