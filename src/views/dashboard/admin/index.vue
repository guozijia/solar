<template>
  <div class="dashboard-editor-container">
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 16px">
      <station-map />
    </el-row>

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 16px">
      <h5>发电量与收益图</h5>
      <chart-power />
    </el-row>

    <el-row style="margin-bottom: 16px" :gutter="16">
      <el-col :span="6">
        <div class="grid-content" style="background: #fff; padding: 16px 16px 0">
          <h5>电站容量利用率</h5>
          <station-ot />
        </div>
      </el-col>

      <el-col :span="18">
        <div class="grid-content" style="background: #fff; padding: 16px 16px 0">
          <h5>新增电站统计</h5>
          <transaction-table />
          <div class="table-bottom">
            <div class="tabBottom">
              <p class="tabBottom_text">
                本月新增电站：<span class="tabBottom_texts">12000</span>
              </p>
            </div>
            <div class="tabBottom">
              <p class="tabBottom_text">
                累计：<span class="tabBottom_texts">12000</span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 16px">
      <h5>新增设备统计</h5>
      <chart-add />
    </el-row>

    <el-row style="margin-bottom: 16px" :gutter="16">
      <el-col :span="24">
        <div class="grid-content" style="background: #fff; padding: 16px 16px 0">
          <h5>客户问题</h5>
          <Question />
          <div class="table-bottom">
            <div class="tabBottom">
              <p class="tabBottom_text">
                本月咨询次数：<span class="tabBottom_texts">12</span>
              </p>
            </div>
            <div class="tabBottom">
              <p class="tabBottom_text">
                累计：<span class="tabBottom_texts">12000</span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import TransactionTable from './components/TransactionTable'
import StationMap from './components/StationMap'
import ChartPower from './components/ChartPower'
import StationOt from './components/StationOt'
import ChartAdd from './components/ChartAdd'
import Question from './components/Question'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    TransactionTable,
    StationMap,
    ChartPower,
    StationOt,
    ChartAdd,
    Question
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 16px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

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
.el-table__row > td {
  border: none;
}
.el-table::before {
  height: 0px;
}

.tabBottom {
  margin-left: 24px;
}

.tabBottom_text {
  line-height: 26px;
  font-size: 13px;
  color: #7a8281;
}
.tabBottom_texts {
  color: #495057;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
}
.table-bottom {
  display: flex;
}
h5 {
  display: block;
  margin: 0;
  padding-bottom: 20px;
  padding-top: 6px;
  color: #666666;
}
</style>
