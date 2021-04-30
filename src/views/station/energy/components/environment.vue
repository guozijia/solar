<template>
  <div>

    <el-row :gutter="20">

      <el-col :span="12"><div id="weather-view-he" /></el-col>
      <el-col :span="4">
        <div class="card-body">
          <svg-icon class="icon-left" icon-class="coal" />
          <div>
            <h2>120kg</h2>
            <h5>节约标准煤</h5>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="card-body">
          <svg-icon class="icon-left" icon-class="co2" />
          <div>
            <h2>120kg</h2>
            <h5>二氧化碳减排</h5>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="card-body">
          <svg-icon class="icon-left" icon-class="trees" />
          <div>
            <h2>120㎡</h2>
            <h5>减少森林砍伐</h5>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {

  components: {},
  data() {
    return {
    }
  },
  mounted() {
    window.WIDGET = { ID: 'OCEXxUQqNH' };
    (function(d) {
      var cs = d.createElement('link')
      cs.rel = 'stylesheet'
      cs.href = 'https://apip.weatherdt.com/view/static/css/tqw_widget_view.css?v=0101'
      var s = d.createElement('script')
      s.src = 'https://apip.weatherdt.com/view/static/js/tqw_widget_view.js?v=0101'
      var sn = d.getElementsByTagName('script')[0]
      sn.parentNode.insertBefore(cs, sn)
      sn.parentNode.insertBefore(s, sn)
    })(document)
  },

  methods: {}
}
</script>

<style scoped>
.card-body{
    display: flex;
    margin-top: 42px;
}
.icon-left{
    font-size: 48px;
    margin-top: 30px;
    margin-right: 12px;
    color: #7596b3;
}
h3{
    color: #555;
}
h5{
    color: #999;
}
</style>
