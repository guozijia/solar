<template>
  <div>
    <div class="dashboard-editor-flex">
      <div class="flex-title">
        <h5>诊断记录</h5>
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">

        <el-form-item>
          <el-date-picker
            v-model="formInline.time"
            type="daterange"
            align="right"
            unlink-panels
            style="width:300px"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.search" placeholder="请输逆变器序列号" />
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
            <el-button class="filter-item" type="danger" icon="el-icon-circle-plus" @click="handleCreate">
              新增诊断任务
            </el-button>
            <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="deletion">
              批量删除
            </el-button>
            <el-table
              :key="tableKey"
              ref="multipleTable"
              v-loading="listLoading"
              :data="list"
              border
              fit
              size="small"
              highlight-current-row
              :header-cell-style="{background:'#f8f9fa'}"
              style="width: 100%;margin-top:1.25rem"
              @selection-change="handleSelectionChange"
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

              <el-table-column label="设备序列号" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.intervercode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="组串数量" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.series }}</span>
                </template>
              </el-table-column>
              <el-table-column label="所属电站" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.stationname }}</span>
                </template>
              </el-table-column>
              <el-table-column label="检测结果" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.result }}</span>
                </template>
              </el-table-column>
              <el-table-column label="检测时间" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.time }}</span>
                </template>
              </el-table-column>
              <el-table-column label="任务进度" align="center">
                <template slot-scope="{row}">
                  <el-tag :type="row.state | statusFilter(row.state)">
                    {{ row.state ==='1'?'已完成' : (row.state ==='2'?'进行中':'已取消') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                  <el-button-group>
                    <el-button v-if="row.state ===&quot;1&quot;" size="mini" @click="handleData(row.intervercode)">查看详情</el-button>
                    <el-button v-if="row.state ===&quot;2&quot;" type="danger" size="mini" @click="Canceldiagnosis(row)">取消诊断</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>

            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

            <el-dialog title="新增诊断任务" :visible.sync="diagnosisVisible" custom-class="diagnosis" width="780px" top="5vh">
              <el-form ref="dataForm" :inline="true" :rules="rules" :model="temp" label-position="left" label-width="160px">
                <el-form-item label="逆变器序列号" prop="intervercode">
                  <el-input v-model="temp.intervercode" />
                </el-form-item>
                <el-form-item label="组串组件数(块/串)" prop="series">
                  <el-input v-model="temp.series" />
                </el-form-item>
                <el-form-item label="参数配置" prop="parameter">
                  <el-select v-model="temp.parameter" class="filter-item" placeholder="请选择" @change="Parameter(temp.parameter)">
                    <el-option v-for="item in peizhi" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
                <el-button type="primary" @click="handleConfig">管理</el-button>

                <el-divider content-position="left">组串配置</el-divider>

                <el-form-item label="组件最大功率" prop="param.powermax">
                  <el-input v-model="temp.param.powermax" />
                </el-form-item>
                <el-form-item label="组件最佳工作电压" prop="param.optimumvoltage">
                  <el-input v-model="temp.param.optimumvoltage" />
                </el-form-item>
                <el-form-item label="组件最佳工作电流" prop="param.optimumcurrent">
                  <el-input v-model="temp.param.optimumcurrent" />
                </el-form-item>
                <el-form-item label="组件开路电压" prop="param.voltage">
                  <el-input v-model="temp.param.voltage" />
                </el-form-item>
                <el-form-item label="组件短路电流" prop="param.current">
                  <el-input v-model="temp.param.current" />
                </el-form-item>
                <el-form-item label="最大功率(Pmax)温度系数" prop="param.company">
                  <el-input v-model="temp.param.company" />
                </el-form-item>
                <el-form-item label="开路电压(Voc)温度系数" prop="param.company">
                  <el-input v-model="temp.param.company" />
                </el-form-item>
                <el-form-item label="短路电流(Isc)温度系数" prop="param.company">
                  <el-input v-model="temp.param.company" />
                </el-form-item>
                <el-form-item label="组件类型" prop="param.company">
                  <el-input v-model="temp.param.company" />
                </el-form-item>
                <el-form-item label="组件制造商" prop="param.company">
                  <el-input v-model="temp.param.company" />
                </el-form-item>
                <el-form-item label="组件首年衰减率" prop="param.company">
                  <el-input v-model="temp.param.company" />
                </el-form-item>
                <el-form-item label="组件逐年衰减率" prop="param.company">
                  <el-input v-model="temp.param.company" />
                </el-form-item>
                <el-form-item label="组件电池片数" prop="param.company">
                  <el-input v-model="temp.param.company" />
                </el-form-item>
                <el-form-item label="组件并网日期" prop="param.company">
                  <el-input v-model="temp.param.company" />
                </el-form-item>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="diagnosisVisibleClose">
                  取消
                </el-button>
                <el-button type="primary" @click="submitIv">
                  确定
                </el-button>
              </div>
            </el-dialog>

            <el-dialog title="参数配置模板" :visible.sync="configure" width="780px" top="5vh">

              <el-button size="small" type="primary">
                新增
              </el-button>

              <el-table
                :data="peizhi"
                size="small"
                style="width: 100%"
              >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="组件最大功率:">
                        <span>{{ props.row.powermax }}</span>
                      </el-form-item>
                      <el-form-item label="组件最佳工作电压:">
                        <span>{{ props.row.optimumvoltage }}</span>
                      </el-form-item>
                      <el-form-item label="组件最佳工作电流:">
                        <span>{{ props.row.optimumcurrent }}</span>
                      </el-form-item>
                      <el-form-item label="组件开路电压:">
                        <span>{{ props.row.voltage }}</span>
                      </el-form-item>
                      <el-form-item label="组件短路电流:">
                        <span>{{ props.row.current }}</span>
                      </el-form-item>
                      <el-form-item label="最大功率(Pmax)数的温度系数:">
                        <span>{{ props.row.type }}</span>
                      </el-form-item>
                      <el-form-item label="开路电压(Voc)的温度系数:">
                        <span>{{ props.row.level }}</span>
                      </el-form-item>
                      <el-form-item label="短路电流(Isc)的温度系数:">
                        <span>{{ props.row.level }}</span>
                      </el-form-item>
                      <el-form-item label="组件类型:">
                        <span>{{ props.row.time }}</span>
                      </el-form-item>
                      <el-form-item label="组件制造商:">
                        <span>{{ props.row.endtime }}</span>
                      </el-form-item>
                      <el-form-item label="组件首年衰减率:">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                      <el-form-item label="组件逐年衰减率:">
                        <span>{{ props.row.desc }}</span>
                      </el-form-item>
                      <el-form-item label="组件电池片数:">
                        <span>{{ props.row.solve }}</span>
                      </el-form-item>
                      <el-form-item label="组件并网日期:">
                        <span>{{ props.row.level }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>

                <el-table-column
                  label="序号"
                  prop="id"
                />

                <el-table-column
                  label="模板名称"
                  prop="name"
                />

                <el-table-column
                  label="简要描述"
                  prop="desc"
                />

                <el-table-column
                  label="创建时间"
                  prop="createtime"
                />

                <el-table-column
                  label="操作"
                  width="100px"
                >
                  <template slot-scope="{}">
                    编辑
                  </template>
                </el-table-column>
              </el-table>

            </el-dialog>

            <el-dialog v-loading="ivloading" title="诊断结果" :visible.sync="diagnosisData" custom-class="diagnosis" width="780px" top="5vh">
              <el-form :model="ivforminfo" label-position="left" inline class="demo-table-expand">
                <el-form-item label="逆变器序列号:">
                  <span>{{ ivforminfo.intervercode }}</span>
                </el-form-item>
                <el-form-item label="逆变器型号:">
                  <span>{{ ivforminfo.type }}</span>
                </el-form-item>
                <el-form-item label="逆变器额定功率:">
                  <span>{{ ivforminfo.power }}W</span>
                </el-form-item>
                <el-form-item label="组串组件数:">
                  <span>{{ ivforminfo.series }}</span>
                </el-form-item>
                <el-form-item label="电站名称:">
                  <span>{{ ivforminfo.name }}</span>
                </el-form-item>
                <el-form-item label="电站地址:">
                  <span>{{ ivforminfo.address }}</span>
                </el-form-item>
                <el-form-item label="建站时间:">
                  <span>{{ ivforminfo.createtime }}</span>
                </el-form-item>
                <el-form-item label="诊断时间:">
                  <span>{{ ivforminfo.diagnosistime }}</span>
                </el-form-item>
              </el-form>
              <h3>曲线</h3>
              <div class="ivcurve">
                <iv-curve ref="ivcurve" :iv-data="ivdata" height="500px" width="100%" />
              </div>
              <h3>组串分析</h3>

              <el-table
                :data="DiagnosisResults"
                size="small"
                style="width: 100%"
              >

                <el-table-column
                  label="组串"
                  prop="id"
                />

                <el-table-column
                  label="健康状态"
                  prop="name"
                />

                <el-table-column
                  label="建议操作"
                  prop="desc"
                />

              </el-table>

              <h3>天气信息</h3>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination'
import { diagnosis, configlist } from '@/api/operation'
import { mapGetters } from 'vuex'
import IvCurve from '@/components/Charts/IvCurve'
import { getivcurve } from '@/api/station'

export default {
  components: { Pagination, IvCurve },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'warning',
        deleted: 'danger'
      }
      if (status === '1') {
        return statusMap.published
      } else if (status === '3') {
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
      diagnosisVisible: false,
      configure: false,
      diagnosisData: false,
      rules: {

      },
      temp: {
        intervercode: undefined,
        series: undefined,
        parameter: undefined,
        param: {
          powermax: undefined,
          optimumvoltage: undefined,
          optimumcurrent: undefined,
          voltage: undefined,
          current: undefined,
          company: undefined
        }
      },
      parameter: undefined,
      peizhi: [],
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
      ivloading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        sort: '+id'
      },
      importanceOptions: ['全部', '在线', '离线', '故障'],
      ivdata: {
      },
      ivforminfo: {},
      DiagnosisResults: [],
      tableDataAmount: []
    }
  },
  created() {
    this.getList()
    // this.getParameter()
  },
  methods: {
    onSubmit() {
      this.getList()
    },
    handleCreate() {
      this.diagnosisVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields('temp')
      })
      configlist(this.$store.getters.name).then(res => this.peizhi = res.data.items)
    },
    getParameter() {
      configlist(this.$store.getters.name).then(res => this.peizhi = res.data.items)
    },
    Parameter(parameter) {
      this.temp.param = this.peizhi.filter(v => v.id === parameter)[0]
    },
    diagnosisVisibleClose(formName) {
      this.diagnosisVisible = false
    },
    handleConfig() {
      this.configure = true
    },
    getList() {
      this.listLoading = true
      diagnosis().then(res => {
        this.list = res.data.items
        this.total = res.data.total
        this.listLoading = false
      })
    },
    handleData(id) {
      this.diagnosisData = true
      this.ivloading = true
      this.$nextTick(() => {
        this.$refs.ivcurve.resize()
      })
      getivcurve(id).then(res => {
        this.ivdata = res.data.chart
        this.ivforminfo = res.data.info
        this.ivloading = false
      }).catch(err => {
        this.ivloading = false
        this.diagnosisData = false
        this.$notify.error({
          title: '错误',
          message: '未能获取到数据，请重新获取'
        })
      })
    },
    handleSelectionChange(val) {
      this.tableDataAmount = val
    },
    deletion() {
      if (this.tableDataAmount.length > 0) {
        this.tableDataAmount.forEach((item, index) => {
          this.list.forEach((itemT, indexT) => {
            if (item.id === itemT.id) {
              this.list.splice(indexT, 1)
            }
          })
        })
      } else {
        this.$message({
          message: '请选择至少一条记录！',
          type: 'warning'
        })
      }
      this.$refs.multipleTable.clearSelection()
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
    submitIv() {
      alert('提交信息')
    },
    Canceldiagnosis(val) {
      alert(val.stationname)
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
.el-form-item ::v-deep label{
  color: #505050;
  white-space:nowrap;
  font-weight: 400;
  font-size: 13px;
}

.el-form ::v-deep .el-input__inner{
  width: 200px;
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
