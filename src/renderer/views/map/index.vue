<template>
  <div class="map module" ref="map">
    <div class="title">
      <span>
        <svg-icon
          icon-class="map"
          class-name="svg-icon"
          style="margin-right:5px"
        ></svg-icon
        >地图列表
      </span>
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
        <img :src="getImgPath(item.style)" />
        <p :class="{ active: item.index === currentIndex }">
          {{ item.name }}
          <svg-icon
            icon-class="del"
            @on-click="delBaseLayer(item)"
            class-name="del-icon"
            v-if="item.index === currentIndex"
          ></svg-icon>
        </p>
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
      mapList: []
    }
  },
  computed: {
    currentIndex() {
      return this.$store.getters.currentMap
    }
  },
  methods: {
    changeHeight() {
      this.isMax = !this.isMax
      this.$refs['map'].style.height = this.isMax ? '60vh' : '50px'
    },
    handleAdd() {
      this.getMapList()
    },
    getImgPath(style) {
      return require(`../../assets/images/${style}.png`)
    },
    createImageryLayer(options) {
      let baselLayer = undefined
      switch (options.type) {
        case 'google':
          baselLayer = DC.ImageryLayerFactory.createGoogleImageryLayer({
            style: options.style
          })
          break
        case 'baidu':
          baselLayer = DC.ImageryLayerFactory.createBaiduImageryLayer({
            style: options.style
          })
          break
        case 'amap':
          baselLayer = DC.ImageryLayerFactory.createAmapImageryLayer({
            style: options.style
          })
          break
        case 'tencent':
          baselLayer = DC.ImageryLayerFactory.createTencentImageryLayer({
            style: options.style
          })
          break
        case 'tdt':
          baselLayer = DC.ImageryLayerFactory.createTencentImageryLayer({
            key: options.key
          })
          break
        case 'arcgis':
          baselLayer = DC.ImageryLayerFactory.createArcGisImageryLayer({
            url: options.url
          })
          break
        case 'xyz':
          baselLayer = DC.ImageryLayerFactory.createXYZImageryLayer({
            url: options.url
          })
          break
        case 'wmts':
          baselLayer = DC.ImageryLayerFactory.createWMTSImageryLayer({
            url: options.url
          })
          break
        case 'single':
          baselLayer = DC.ImageryLayerFactory.createSingleTileImageryLayer({
            url: options.url
          })
          break
        default:
          break
      }

      if (options.imgUrl) {
        let bg = DC.ImageryLayerFactory.createSingleTileImageryLayer({
          url: options.imgUrl
        })
        baselLayer = [bg, baselLayer]
      }
      return baselLayer
    },
    getMapList() {
      this.$db.prepare('select * from tb_map_list;').then(data => {
        global.viewer &&
          (global.viewer._baseLayerPicker.imageryProviderViewModels = [])
        this.mapList = data.map((item, index) => {
          item.index = index
          return item
        })
        this.mapList.forEach(item => {
          let baselLayer = this.createImageryLayer(item)
          global.viewer && baselLayer && global.viewer.addBaseLayer(baselLayer)
        })
      })
    },
    delBaseLayer(item) {
      this.$confirm('此操作将永久删除该地图, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$db
          .run('delete from tb_map_list where id= :id ;', {
            ':id': item.id
          })
          .then(data => {
            this.$message.success({
              message: '删除成功!'
            })
            this.$store.dispatch('setCurrentMap', 0)
            this.getMapList()
            this.changeBaseLayer(0)
          })
      })
    },
    changeBaseLayer(index) {
      if (global.viewer) {
        this.$store.dispatch('setCurrentMap', index)
        global.viewer.changeBaseLayer(index || 0)
      }
    }
  },
  mounted() {
    this.getMapList()
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
      position: relative;
      width: 40%;
      display: inline-block;
      overflow: hidden;
      margin: 5px 0px 5px 18px;
      cursor: pointer;
      img {
        width: 100px;
        height: 100px;
        overflow: hidden;
      }
      p {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p.active {
        color: orange;
      }
    }
  }
  .tool {
    text-align: center;
  }
}
</style>
