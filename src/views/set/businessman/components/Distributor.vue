<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="contop">
          <div>
            <el-button class="filter-item" type="danger" icon="el-icon-circle-plus" @click="handleCreate">
              添加用户
            </el-button>
            <el-button class="filter-item" type="warning" icon="el-icon-refresh" @click="handleCreate">
              重置密码
            </el-button>
          </div>

          <el-form :inline="true" :model="formInline" class="demo-form-inline">

            <el-form-item>
              <el-select v-model="formInline.region" style="width: 130px">
                <el-option key="1" label="第一电站" value="1" />
                <el-option key="2" label="第二电站" value="2" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-date-picker
                v-model="formInline.time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
                导出
              </el-button>
            </el-form-item>
          </el-form>
        </div>

        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          size="small"
          :header-cell-style="{background:'#f8f9fa'}"
          highlight-current-row
          style="width: 100%;"
        >

          <el-table-column
            type="selection"
            align="center"
            width="55"
          />

          <el-table-column label="序号" prop="id" align="center" width="80">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="分销商编码" align="center">
            <template slot-scope="{row}">
              <span @click="handleLink(row.stationId)"><el-link type="primary">{{ row.stationname }}</el-link></span>
            </template>
          </el-table-column>
          <el-table-column label="公司名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备数量" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="区域" align="center">
            <template slot-scope="{row}">
              <span>{{ row.device }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号" align="center">
            <template slot-scope="{row}">
              <span>{{ row.capacity }}W</span>
            </template>
          </el-table-column>
          <el-table-column label="电子邮箱" class-name="status-col">
            <template slot-scope="{row}">
              <span>{{ row.power }}W</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" class-name="status-col">
            <template slot-scope="{row}">
              <span>{{ row.power }}W</span>
            </template>
          </el-table-column>
          <el-table-column label="账户状态" class-name="status-col">
            <template slot-scope="{row}">
              <span>{{ row.power }}W</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" class-name="status-col">
            <template slot-scope="{row}">
              <span>{{ row.power }}W</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getdistributor } from '@/api/set'
export default {

  components: { Pagination },
  filters: {
    // statusFilter(status) {
    //   const statusMap = {
    //     published: 'success',
    //     draft: 'info',
    //     deleted: 'danger'
    //   }
    //   if(status === '1'){
    //       return statusMap.published
    //   }else if(status === '2'){
    //       return statusMap.deleted
    //   }else{
    //       return statusMap.draft
    //   }

    // }
  },
  data() {
    return {
      formInline: {
        region: '1',
        time: ''
      },
      FormType: 'StationForm',
      radio1: '1',
      activeIndex: '1',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        stationid: undefined
      },
      downloadLoading: false
    }
  },

  created() {
    this.getList()
  },

  methods: {
    onSubmit() {
      this.getList()
    },
    getList() {
      this.listLoading = true
      getdistributor().then(res => {
        this.list = res.data.items
        this.total = res.data.total
        this.listLoading = false
      })
    },
    handleCreate() {

    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '状态', '电站类型', '电站名称', '电站地址']
        const filterVal = ['id', 'state', 'type', 'stationname', 'address']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
.contop{
    display: flex;
    justify-content: space-between;
}
</style>
