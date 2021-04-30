<template>
  <div class="">
    <div class="filter-container">

      <div>
        <el-input v-model="listQuery.title" placeholder="请输入站点名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" style="margin-left:12px" icon="el-icon-search" @click="handleFilter">
          搜索
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
    >
      <el-table-column label="序号" prop="id" sortable align="center" width="80" :class-name="getSortClass('id')">
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

      <el-table-column label="序列号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备名称" align="center">
        <template slot-scope="{row}">
          <span @click="handleUpdate(row)"><el-link type="primary">{{ row.stationname }}</el-link></span>
        </template>
      </el-table-column>
      <el-table-column label="版本程序" align="center">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备型号" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实时功率" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.device }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日发电量" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.capacity }}W</span>
        </template>
      </el-table-column>
      <el-table-column label="累计发电量" sortable class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.power }}W</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="设置" placement="top">
              <el-button size="mini" icon="el-icon-s-tools" @click="handleUpdate(row)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button size="mini" icon="el-icon-delete" @click="handleDelete(row,$index)" />
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="设置" :visible.sync="dialogFormVisible" width="30%" top="5vh">
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

  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { getstationdevice } from '@/api/station'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'DeviceList',
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
      dialogPvVisible: false,
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
      getstationdevice(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
      this.listQuery.title = undefined
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
    handleDelete(row, index) { // 删除键
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
  padding-top: 10px;
}
.addcjq{
  display: flex;
}
</style>
