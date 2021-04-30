<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="16" style="margin-bottom:16px;">
      <el-col :span="6">
        <div class="card card-animate">
          <div class="card-body">
            <div class="avatar-sm float-right">
              <span class="avatar-title bg-soft-primary rounded-circle">
                <svg-icon icon-class="pv" />
              </span>
            </div>
            <h5 class="text-muted text-uppercase mt-0">电站总数</h5>
            <h3 class="my-3">
              <count-to :start-val="0" :end-val="124534" :duration="1000" class="card-panel-num" />
            </h3>
            <div class="card-bot">
              <span class="text-muted text-bot success">在线：666</span>
              <span class="text-muted text-bot primary">离线：666</span>
              <span class="text-muted text-bot danger">故障：666</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card card-animate">
          <div class="card-body">
            <div class="avatar-sm float-right">
              <span class="avatar-title bg-soft-primary rounded-circle">
                <svg-icon icon-class="pv" />
              </span>
            </div>
            <h5 class="text-muted text-uppercase mt-0">当前总功率</h5>
            <h3 class="my-3">
              <count-to :start-val="0" :end-val="124534" :duration="1000" class="card-panel-num" />
            </h3>
            <div class="card-bot">
              <span class="text-muted text-bot">总装机容量：666kw</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card card-animate">
          <div class="card-body">
            <div class="avatar-sm float-right">
              <span class="avatar-title bg-soft-primary rounded-circle">
                <svg-icon icon-class="pv" />
              </span>
            </div>
            <h5 class="text-muted text-uppercase mt-0">累计发电量</h5>
            <h3 class="my-3">
              <count-to :start-val="0" :end-val="124534" :duration="1000" class="card-panel-num" />
            </h3>
            <div class="card-bot">
              <span class="text-muted text-bot">今日发电量：666kw</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card card-animate">
          <div class="card-body">
            <div class="avatar-sm float-right">
              <span class="avatar-title bg-soft-primary rounded-circle">
                <svg-icon icon-class="pv" />
              </span>
            </div>
            <h5 class="text-muted text-uppercase mt-0">累计收益</h5>
            <h3 class="my-3">
              <count-to :start-val="0" :end-val="124534" :duration="1000" class="card-panel-num" />
            </h3>
            <div class="card-bot">
              <span class="text-muted text-bot">今日收益：666元</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-bottom:16px;background: rgb(255, 255, 255);">
      <complex-table />
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import ComplexTable from '../table/complex-table'
export default {

  components: { CountTo, ComplexTable },
  data() {
    return {
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 16px;
  background-color: rgb(240, 242, 245);
  position: relative

}
.card{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid #e9edf3;
    border-radius: .35rem;
}
.card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
}
.avatar-sm {
    height: 3rem;
    width: 3rem;
}
.float-right {
    float: right !important;
}
.avatar-title {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #6d61ea;
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-weight: 700;
    height: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
}
.my-3 {
    margin-bottom: 2rem !important;
    margin-top: 2rem !important;
}
.rounded-circle {
    border-radius: 50% !important;
}

.text-bot{
    font-size: 13px;
    font-family: "Montserrat";
}
h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: .5rem;
}
h3{
  font-family: "Montserrat",sans-serif;
  font-weight: 500;
}
.card-animate {
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
}
.card-animate:hover {
    -webkit-transform: translateY(-0.3rem);
    transform: translateY(-0.3rem);
}
.card-bot{
  display:flex;
  justify-content: space-between;
}
.text-muted{
  color: #666666;
}

.success{
  color: #67C23A;
}
.danger{
  color: #F56C6C;
}
</style>
