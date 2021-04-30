<template>
  <div class="my_table">
    <el-table :header-cell-style="{background:'#f8f9fa'}" size="small" :data="list" style="width: 100%;">
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="电站类型" align="center">
        <template slot-scope="scope">
          <span style="color:#2777DA">{{ scope.row.order | stationFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本月新增" align="center">
        <template slot-scope="scope">
          {{ scope.row.monthAdd }}
        </template>
      </el-table-column>
      <el-table-column label="电站总数" align="center">
        <template slot-scope="scope">
          {{ scope.row.stationTotal }}
        </template>
      </el-table-column>
      <el-table-column label="月涨幅" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.increase | statusFilter" style="width:72px">
            {{ row.increase }}%
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { transactionList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      if (status > 0) {
        return statusMap.pending
      } else {
        return statusMap.success
      }
    },
    stationFilter(status) {
      const stationMap = {
        a: '用户电站',
        b: '工商类电站',
        c: '扶贫电站',
        d: '地面电站'
      }
      return stationMap[status]
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my_table ::v-deep .el-table th.is-leaf {
    border: none;
}
.my_table ::v-deep .el-table__row>td{
  border: none;
}
</style>
