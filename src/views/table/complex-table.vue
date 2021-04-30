<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <el-button class="filter-item" type="danger" icon="el-icon-circle-plus-outline" @click="handleCreate">
          添加电站
        </el-button>
      </div>

      <div>

        <el-select v-model="listQuery.importance" prop="importance" placeholder="全部状态" clearable style="width: 120px" class="filter-item">
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
        </el-select>

        <el-input v-model="listQuery.title" placeholder="请输入站点名" style="width: 200px;margin-left:12px" class="filter-item" @keyup.enter.native="handleFilter" />

        <el-button v-waves class="filter-item" type="primary" style="margin-left:12px" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves class="filter-item" icon="el-icon-refresh" @click="resetFrom">
          重置
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          导出
        </el-button>

      </div>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      :header-cell-style="{background:'#f8f9fa'}"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable align="center" width="80" :class-name="getSortClass('id')">
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

      <el-table-column label="电站类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type | stationFilter(row.type) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="电站名称" align="center">
        <template slot-scope="{row}">
          <span @click="handleLink(row.stationId)"><el-link type="primary">{{ row.stationname }}</el-link></span>
        </template>
      </el-table-column>
      <el-table-column label="电站地址" align="center">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电站业主" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备数量" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.device }}</span>
        </template>
      </el-table-column>
      <el-table-column label="装机容量" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.capacity }}W</span>
        </template>
      </el-table-column>
      <el-table-column label="实时功率" sortable class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.power }}W</span>
        </template>
      </el-table-column>
      <el-table-column label="等效小时" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.hours }}</span>
        </template>
      </el-table-column>
      <el-table-column label="今日发电量" width="120px" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.hours }}kW</span>
        </template>
      </el-table-column>
      <el-table-column label="累计发电量" width="120px" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.hours }}kW</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="编辑电站" placement="top">
              <el-button size="mini" icon="el-icon-edit" @click="handleUpdate(row)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="添加采集器" placement="top">
              <el-button size="mini" icon="el-icon-plus" @click="handleAdd(row)" />
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%" top="5vh">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px">
        <el-form-item label="电站名称" prop="stationname">
          <el-input v-model="temp.stationname" />
        </el-form-item>
        <el-form-item label="电站业主" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

        <el-form-item label="装机容量" prop="capacity">
          <el-input v-model="temp.capacity" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="temp.longitude" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="temp.latitude" />
        </el-form-item>
        <el-form-item label="电站地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="电价" prop="price">
          <el-input v-model="temp.price" />
        </el-form-item>
        <el-form-item label="单位" prop="company">
          <el-input v-model="temp.company" />
        </el-form-item>
        <el-form-item label="建站日期" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="时区" prop="timezoom">
          <el-select v-model="temp.shiqu" class="filter-item" placeholder="请选择">
            <el-option v-for="item in timezoom" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-divider content-position="left">更多（添加设备）</el-divider>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="添加采集器" width="680px" :before-close="handleClose">

      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="domain.key"
          :label="'采集器' + (index + 1)"
          :rules="{
            required: true, message: '内容不能为空', trigger: 'blur'
          }"
          size="small"
        >
          <el-input v-model="domain.name" placeholder="采集器名称" style="width:200px" />
          <el-input v-model="domain.value" placeholder="采集器编码" style="width:200px;margin-left:12px" />
          <el-button style="margin-left:12px" @click.prevent="removeDomain(domain)">删除</el-button>

        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交所有</el-button>
          <el-button @click="addDomain">新增</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
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
    },
    stationFilter(status) {
      if (status === '1') {
        return '用户电站'
      } else if (status === '2') {
        return '工商类电站'
      } else if (status === '3') {
        return '扶贫电站'
      } else {
        return '地面电站'
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        sort: '+id'
      },
      importanceOptions: ['全部', '在线', '离线', '故障'],
      temp: {
        id: undefined,
        stationname: '',
        name: '',
        capacity: undefined,
        longitude: undefined,
        latitude: undefined,
        address: '',
        price: undefined,
        company: '',
        timestamp: new Date(),
        shiqu: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑电站',
        create: '新增电站'
      },
      dialogPvVisible: false,
      dynamicValidateForm: {
        domains: [{
          name: '',
          value: ''
        }],
        email: ''
      },
      timezoom: [
        { key: 1, display_name: 'UTC+1' },
        { key: 2, display_name: 'UTC+2' },
        { key: 3, display_name: 'UTC+3' },
        { key: 4, display_name: 'UTC+4' },
        { key: 5, display_name: 'UTC+5' },
        { key: 6, display_name: 'UTC+6' },
        { key: 7, display_name: 'UTC+7' },
        { key: 8, display_name: 'UTC+8' },
        { key: 9, display_name: 'UTC+9' },
        { key: 10, display_name: 'UTC+10' },
        { key: 11, display_name: 'UTC+11' },
        { key: 12, display_name: 'UTC+12' }

      ],
      pvData: [],
      rules: {
        stationname: [
          { required: true, message: '请输入电站名称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入业主名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5个字符', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    handleLink(stationId) {
      this.$router.push({ path: '/Station/details', query: { stationId }})
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetFrom(formName) {
      // 注意：重置会看 el-form-item 组件元素上的prop上是否指定了字段名，指定了才会重置生效
      // this.$refs[formName].resetFields();
      this.listQuery.title = undefined
      this.listQuery.importance = undefined
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleAdd(row) {
      this.dialogPvVisible = true
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // handleDelete(row, index) { //删除键
    //   this.$notify({
    //     title: 'Success',
    //     message: 'Delete Successfully',
    //     type: 'success',
    //     duration: 2000
    //   })
    //   this.list.splice(index, 1)
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>

<style scoped>
.filter-container{
  display: flex;
  justify-content: space-between;
}
.addcjq{
  display: flex;
}
</style>
