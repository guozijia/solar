<template>
  <div>
    <el-row type="flex" class="panel-group">
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              电站总数
            </div>
            <count-to :start-val="0" :end-val="124534" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              设备总数
            </div>
            <count-to :start-val="0" :end-val="921123" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              总装机容量
            </div>
            <count-to :start-val="0" :end-val="13" :duration="2600" suffix="GW" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日发电量
            </div>
            <count-to :start-val="0" :end-val="165560" :duration="2600" suffix="kwh" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              累计发电量
            </div>
            <count-to :start-val="0" :end-val="120" :duration="2600" suffix="mW" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="homemap">
      <el-col :span="24">
        <baidu-map class="bm-view" ak="Zvcod3UiTozZFvb6zKGxzwTuxowgPl0Z" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" @ready="handler">
          <!-- 定位功能 -->
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />

          <!-- 网点坐标 -->
          <!-- 地图 这里的BUG是地图CSS的定位问题 -->
          <bm-marker-clusterer :average-center="true">
            <bm-marker
              v-for="marker of markerPoint"
              :key="marker.code"
              :position="{lng: marker.lng, lat: marker.lat}"
              :dragging="false"
              :icon="marker.state === '1'?icon:icon1"
            />
          </bm-marker-clusterer>
        </baidu-map>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmMarkerClusterer from 'vue-baidu-map/components/extra/MarkerClusterer'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation'

import { fetchList } from '@/api/station'

export default {

  components: {
    CountTo,
    BaiduMap,
    BmScale,
    BmNavigation,
    BmMarkerClusterer,
    BmMarker,
    BmGeolocation
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 6,
      markerPoint: [],
      total: 0,
      showlist: false,
      tabName: 'second',
      icon: { url: require('@/assets/images/marker.png'), size: { width: 40, height: 40 }},
      icon1: { url: require('@/assets/images/marker1.png'), size: { width: 40, height: 40 }}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getbank()
    })
  },
  methods: {
    handler({ BMap, map }) {
      this.center.lng = 116.404
      this.center.lat = 31.915
      this.zoom = 6
    },
    getbank() {
      fetchList().then(response => {
        this.markerPoint = response.data.rows
        this.total = response.data.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {

  .card-panel-col {
    margin-bottom: 5px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-description {
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      text-align: center;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size:14px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
        font-family: "Montserrat";
        font-weight: 600;
        color: #495057;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
 .bm-view {
/*         position: absolute;
        top: 0px;
        left: 0px;
        right: 0;
        padding: 4px;
        overflow-y:auto;
        bottom: 0; */
        width: 100%;
        height: 480px;
        border-radius: 30px;
}
.homemap{
    margin-bottom: 16px;
    border-radius: 30px;
}
</style>
