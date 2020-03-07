<template>
  <div class="map module" ref="map">
    <div class="title">
      <span>
        <svg-icon
          icon-class="map"
          class-name="svg-icon"
          style="margin-right:5px"
        ></svg-icon
        >地图列表</span
      >
      <span>
        <svg-icon
          :icon-class="isMax ? 'min' : 'max'"
          @on-click="changeHeight"
          class-name="svg-icon"
        ></svg-icon>
      </span>
    </div>
    <div class="map-list">
      <div
        v-for="(item, index) in mapList"
        :key="index"
        class="map-item"
        @click="changeBaseLayer(item.index)"
      >
        <img :src="item.iconUrl" />
        <p :class="{ active: item.index === currentIndex }">{{ item.name }}</p>
      </div>
    </div>
    <div class="tool">
      <el-button round @click="dialogVisible = true">添加地图</el-button>
    </div>
    <map-dialog
      :visible.sync="dialogVisible"
      @on-close="dialogVisible = false"
      @on-add="handleAdd"
    ></map-dialog>
  </div>
</template>
<script>
import MapDialog from './MapDialog'

export default {
  name: 'Map',
  components: {
    MapDialog
  },
  data() {
    return {
      isMax: true,
      dialogVisible: false,
      currentIndex: 0,
      mapList: []
    }
  },
  methods: {
    changeHeight() {
      this.isMax = !this.isMax
      this.$refs['map'].style.height = this.isMax ? '60vh' : '50px'
    },
    handleAdd(formData) {
      let baselLayer = undefined
      if (formData.type === 'google') {
        baselLayer = DC.ImageryLayerFactory.createGoogleImageryLayer({
          style: formData.style
        })
      } else if (formData.type === 'baidu') {
        baselLayer = DC.ImageryLayerFactory.createBaiduImageryLayer({
          style: formData.style
        })
      } else if (formData.type === 'amap') {
        baselLayer = DC.ImageryLayerFactory.createAmapImageryLayer({
          style: formData.style
        })
      } else if (formData.type === 'tencent') {
        baselLayer = DC.ImageryLayerFactory.createTencentImageryLayer({
          style: formData.style
        })
      } else if (formData.type === 'tdt') {
        baselLayer = DC.ImageryLayerFactory.createTdtImageryLayer({
          key: formData.key
        })
      } else if (formData.type === 'arcgis') {
        baselLayer = DC.ImageryLayerFactory.createArcGisImageryLayer({
          url: formData.url
        })
      } else if (formData.type === 'xyz') {
        baselLayer = DC.ImageryLayerFactory.createXYZImageryLayer({
          url: formData.url
        })
      } else if (formData.type === 'wmts') {
        baselLayer = DC.ImageryLayerFactory.createWMTSImageryLayer({
          url: formData.url
        })
      } else if (formData.type === 'single') {
        baselLayer = DC.ImageryLayerFactory.createSingleTileImageryLayer({
          url: formData.url
        })
      }
      if (global.viewer && baselLayer) {
        if (formData.imgUrl) {
          let bg = DC.ImageryLayerFactory.createSingleTileImageryLayer({
            url: formData.imgUrl
          })
          baselLayer = [bg, baselLayer]
        }
        global.viewer.addBaseLayer(baselLayer, {
          name: formData.name,
          iconUrl: `/static/images/${formData.style}.png`
        })
        this.mapList.push({
          index: this.mapList.length,
          name: formData.name,
          iconUrl: `/static/images/${formData.style}.png`
        })
      }
    },
    changeBaseLayer(index) {
      if (global.viewer) {
        this.currentIndex = index || 0
        global.viewer.changeBaseLayer(index || 0)
      }
    }
  }
}
</script>

<style lang="scss">
.map {
  .el-button {
    width: 150px;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    border-color: #61f7fe;
    color: #fff;
  }
}
</style>
<style lang="scss" scoped>
.map {
  width: 250px;
  height: 60vh;
  .map-list {
    width: 100%;
    height: calc(100% - 105px);
    color: rgb(15, 10, 10);
    overflow: hidden;
    overflow-y: auto;
    .map-item {
      width: 30%;
      display: inline-block;
      overflow: hidden;
      margin: 5px 0px 5px 6.5px;
      cursor: pointer;
      img {
        width: 80px;
        height: 80px;
      }
      p {
        text-align: center;
        color: #fff;
      }
      p.active {
        color: #f00;
      }
    }
  }
  .tool {
    text-align: center;
  }
}
</style>
