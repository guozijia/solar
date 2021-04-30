<template>
  <div>
    <el-row :gutter="16" style="margin-bottom:16px;">
      <el-col :span="6">
        <div class="card card-animate">
          <div class="card-body">

            <h5 class="text-muted text-uppercase mt-0">实时功率</h5>
            <div class="chart-container">
              <chart height="150px" width="100%" />
            </div>

          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card card-animate">
          <div class="card-body">
            <h5 class="text-muted text-uppercase mt-0">今日发电量</h5>
            <div class="avatar-sm ">
              <span class="avatar-title bg-soft-energy rounded-circle">
                <svg-icon icon-class="energy" />
              </span>
            </div>
            <h2 class="my-3 float-right">
              <count-to :start-val="0" :end-val="124534" :duration="1000" suffix="kwh" class="card-panel-num" />
            </h2>
            <el-divider />
            <div class="card-bot">
              <span class="text-muted text-bot">累计发电量：666kw</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card card-animate">
          <div class="card-body">
            <h5 class="text-muted text-uppercase mt-0">今日收益</h5>
            <div class="avatar-sm ">
              <span class="avatar-title bg-soft-money rounded-circle">
                <svg-icon icon-class="money" />
              </span>
            </div>
            <h2 class="my-3 float-right">
              <count-to :start-val="0" :end-val="124534" :duration="1000" suffix="￥" class="card-panel-num" />
            </h2>
            <el-divider />
            <div class="card-bot">
              <span class="text-muted text-bot">累计收益：666元</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card card-animate">
          <div class="card-body">
            <h5 class="text-muted text-uppercase mt-0">实时告警</h5>
            <div class="avatar-sm ">
              <span class="avatar-title bg-soft-alarm rounded-circle">
                <svg-icon icon-class="alarm" />
              </span>
            </div>
            <h2 class="my-3 float-right">
              <count-to :start-val="0" :end-val="124534" :duration="1000" class="card-panel-num" />
            </h2>
            <el-divider />
            <div class="card-bot">
              <span class="text-muted text-bot success">提示：666</span>
              <span class="text-muted text-bot warning">一般：666</span>
              <span class="text-muted text-bot danger">严重：666</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="16" style="margin-bottom:16px;">
      <el-col :span="6">
        <div class="card-body">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in items" :key="item.id">
              <el-image :src="item.src" />
            </el-carousel-item>
          </el-carousel>
          <div class="stationinfo">
            <div class="stationinfo-left">
              <p>电站名称</p>
              <p>建站时间</p>
              <p>电站类型</p>
              <p>装机容量</p>
              <p>电站业主</p>
              <p>联系电话</p>
              <p>电站地址</p>
            </div>
            <div class="stationinfo-right">
              <p>第一电站</p>
              <p>2020-02-12</p>
              <p>户用类型</p>
              <p>120kW</p>
              <p>胡杨</p>
              <p>13512612796</p>
              <p>广东省深圳市光明新区凤凰街道</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="card-body">
          <chart-mix />
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-bottom:16px;">
      <el-col :span="24">
        <div class="card-body">
          <h5>设备信息</h5>
          <device-list />
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="card-body">
          <h5>环境</h5>

          <environment style="margin-top:16px" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import Chart from '@/components/Charts/RelPower'
import ChartMix from './components/chartmix'
import DeviceList from './components/devicelist'
import Environment from './components/environment'

export default {

  components: { CountTo, Chart, ChartMix, DeviceList, Environment },
  data() {
    return {
      items: [{
        id: 1,
        src: 'http://img2.imgtn.bdimg.com/it/u=3574222506,1703939784&fm=26&gp=0.jpg'
      }, {
        id: 2,
        src: 'http://img4.imgtn.bdimg.com/it/u=2065984606,1876955958&fm=26&gp=0.jpg'
      }],
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        sort: '+id'
      }

    }
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

<style scoped>
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
    background: #fff;
    border-radius: 0.35rem;
}
.avatar-sm {
    height: 3rem;
    width: 3rem;
    margin-top: 2.5rem;
}
.float-right {
    float: right !important;
    margin-top: -40px;
}
.avatar-title {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
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
/* .my-3 {
    margin-bottom: 3rem !important;
    margin-top: 2rem !important;
} */
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
h2{
  font-family: "Montserrat",sans-serif;
  font-weight: 500;
  color: #333;
}
.card-animate {
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    height: 200px;

}
.card-animate:hover {
    -webkit-transform: translateY(-0.3rem);
    transform: translateY(-0.3rem);
}
.card-bot{
  display:flex;
  justify-content: space-between;
  margin-top: -5px;
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
.warning{
  color: #E6A23C;
}
.bg-soft-energy{
  background-color: #5ebdff;
}
.bg-soft-money{
  background-color: #ffc785;
}
.bg-soft-alarm{
  background-color: #ff8080;
}
.stationinfo{
  display: flex;
  justify-content: flex-start;
}
.stationinfo-left p{
  line-height: 30px;
  font-size: 13px;
  color: #999;
  width: 54px;
}
.stationinfo-right{
  margin-left: 30px;
}
.stationinfo-right p{
  line-height: 30px;
  font-size: 13px;
  color: #333;
}
</style>
