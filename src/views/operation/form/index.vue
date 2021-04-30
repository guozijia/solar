<template>
  <div>
    <div class="dashboard-editor-flex">
      <div class="flex-title">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">电站报表</el-menu-item>
          <el-menu-item index="2">发电量统计表</el-menu-item>
          <el-menu-item index="3">等效小时数</el-menu-item>
        </el-menu>
      </div>
    </div>

    <div class="dashboard-editor-container">
      <div class="card-body">
        <component :is="FormType" />
      </div>
    </div>
  </div>
</template>

<script>

import StationForm from './components/StationForm'
import Electricity from './components/Electricity'
import Equivalent from './components/Equivalent'

export default {

  components: { StationForm, Equivalent, Electricity },
  data() {
    return {
      formInline: {
        search: '',
        region: 'create',
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
        importance: undefined,
        title: undefined,
        sort: '+id'
      },
      importanceOptions: ['全部', '在线', '离线', '故障']
    }
  },

  created() {

  },
  methods: {
    handleSelect(key, keyPath) {
      if (key === '1') {
        this.FormType = 'StationForm'
      } else if (key === '2') {
        this.FormType = 'Electricity'
      } else {
        this.FormType = 'Equivalent'
      }
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
.dashboard-editor-flex ::v-deep .el-menu-item{
    height: 48px;
    line-height: 48px;
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
.el-menu-demo{

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
