<template>
  <div>
    <div class="dashboard-editor-flex">
      <div class="flex-title">
        <h5>物理网卡</h5>
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">

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
          <el-input v-model="formInline.search" placeholder="请输入问题/序列号查找" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
            导出
          </el-button>
        </el-form-item>
      </el-form>

    </div>

    <div class="dashboard-editor-container">
      <div class="card-body">
        <el-row>
          <el-col :span="24">
            <el-button class="filter-item" type="success" icon="el-icon-files" @click="handleCreate">
              批量续费
            </el-button>
            <el-table
              :key="tableKey"
              v-loading="listLoading"
              :data="list"
              border
              fit
              size="small"
              :header-cell-style="{background:'#f8f9fa'}"
              highlight-current-row
              style="width: 100%;margin-top:1.25rem"
            >
              <el-table-column
                type="selection"
                align="center"
                width="55"
              />

              <el-table-column label="ID" prop="id" sortable align="center" width="80">
                <template slot-scope="{row}">
                  <span>{{ row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="卡状态" align="center">
                <template slot-scope="{row}">
                  <el-tag :type="row.state | statusFilter(row.state)">
                    {{ row.state ==='1'?'在线' : (row.state ==='2'?'欠费':'离线') }}
                  </el-tag>
                </template>
              </el-table-column>

              <el-table-column label="设备序列号" align="center">
                <template slot-scope="{row}">
                  <span @click="handleLink(row.stationId)"><el-link type="primary">{{ row.stationname }}</el-link></span>
                </template>
              </el-table-column>
              <el-table-column label="物联卡ICCID卡号" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column label="供应商" width="110px" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="激活时间" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.device }}</span>
                </template>
              </el-table-column>
              <el-table-column label="到期时间" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.capacity }}W</span>
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
    </div>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination'
import { getquestion } from '@/api/operation'

export default {

  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      if (status === '1') {
        return statusMap.published
      } else if (status === '2') {
        return statusMap.deleted
      } else {
        return statusMap.draft
      }
    }
  },
  data() {
    return {
      formInline: {
        search: '',
        region: 'create',
        time: ''
      },
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
      downloadLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        sort: '+id'
      },
      importanceOptions: ['全部', '在线', '离线', '故障']
    }
  },

  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.getList()
      console.log('submit!')
    },
    handleCreate() {

    },
    getList() {
      this.listLoading = true
      getquestion().then(res => {
        this.list = res.data.items
        this.total = res.data.total
        this.listLoading = false
      })
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

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 16px;
  background-color: rgb(240, 242, 245);
  position: relative

}
.dashboard-editor-flex{
  height: 48px;
  background: rgb(255, 255, 255);
  line-height: 48px;
  display: flex;
  justify-content: space-between;
}
.flex-title{
  display:flex;
  h5{
    margin: 0;
    display: block;
    margin-left: 16px;;
  }
  span{
    font-size: 13px;
    margin-left: 24px;;
  }
}
.el-dropdown-link {
  cursor: pointer;
  margin-right: 16px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 13px;
  margin-bottom: 20px;
}
.sel-opt ::v-deep .el-input__inner{
  color: #1682e6;
  font-weight: 600;
  border-color: #fff;
}
.sel-opt ::v-deep .el-select__caret{
  color: #1682e6;
  font-weight: 600;
  border-color: #fff;
}
.sel-opt ::v-deep .el-select__caret::before{
    content: "\e78f";
    font-size: 12px;
}
.demo-form-inline{
  margin-top: 7px;
  margin-right: 16px;
}
.card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
    background: #fff;
    border-radius: 0.35rem;
}
</style>
