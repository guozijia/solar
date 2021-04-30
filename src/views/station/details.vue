<template>
  <div>
    <div class="dashboard-editor-flex">
      <el-select v-model="value" class="sel-opt" value-key="id" placeholder="请选择" size="small" style="margin-left:16px;margin-top:2px;" filterable @change="sss">
        <el-option-group
          v-for="group in options"
          :key="group.type"
          :label="group.type"
        >
          <el-option
            v-for="item in group.options"
            :key="item.id"
            :label="item.name"
            :value="item"
          />
        </el-option-group>
      </el-select>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          电站操作<svg-icon icon-class="morelist" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit">管理电站</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">添加采集器</el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete">删除电站</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="dashboard-editor-container">
      <component :is="StationType" />
    </div>
  </div>
</template>

<script>
import { getstationinfo } from '@/api/station'
import PvStation from './pvstation/index'
import Energy from './energy/index'
export default {

  components: { PvStation, Energy },
  data() {
    return {
      options: [],
      value: '',
      StationType: 'PvStation'
    }
  },

  created() {
    this.Getstationinfo()
    this.value = this.$route.query.stationId
  },
  methods: {
    Getstationinfo() {
      getstationinfo().then(res => {
        this.options = res.data.options
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: '未能获取到电站信息'
        })
      })
    },
    sss() {
      console.log(this.value)
      if (this.value.type === '1') {
        this.StationType = 'PvStation'
      } else if (this.value.type === '2') {
        this.StationType = 'Energy'
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
</style>
