<template>
  <div>
    <div class="dashboard-editor-flex">
      <div class="flex-title">
        <h5>设备升级</h5>
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">

        <el-form-item>
          <el-input v-model="formInline.search" placeholder="请输入问题/序列号查找" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div class="dashboard-editor-container">
      <div class="card-body">
        <el-row>
          <el-col :span="24">
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
              <el-table-column label="ID" prop="id" sortable align="center" width="80">
                <template slot-scope="{row}">
                  <span>{{ row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="状态" align="center">
                <template slot-scope="{row}">
                  <el-tag :type="row.state | statusFilter(row.state)">
                    {{ row.state ==='1'?'在线' : (row.state ==='2'?'故障':'离线') }}
                  </el-tag>
                </template>
              </el-table-column>

              <el-table-column label="设备序列号" align="center">
                <template slot-scope="{row}">
                  <span @click="handleLink(row.stationId)"><el-link type="primary">{{ row.stationname }}</el-link></span>
                </template>
              </el-table-column>
              <el-table-column label="采集器名称" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column label="程序版本" width="110px" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="所属电站" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.device }}</span>
                </template>
              </el-table-column>
              <el-table-column label="升级进度" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.capacity }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center" width="240" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                  <el-button-group>
                    <el-tooltip class="item" effect="dark" content="采集器升级" placement="top">
                      <el-button size="mini" icon="el-icon-edit" @click="collectorUpdate(row)" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="ARM升级" placement="top">
                      <el-button size="mini" @click="armUpdate(row)">ARM</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="DSP升级" placement="top">
                      <el-button size="mini" @click="armUpdate(row)">DSP</el-button>
                    </el-tooltip>
                  </el-button-group>
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
