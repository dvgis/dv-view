<template>
  <div class="ly-head">
    <div class="nav-bar">
      <div class="title"><img src="../assets/images/favicon.png" /> D V</div>
      <div class="menu-h">
        <el-menu
          :default-active="activeMenu"
          class="menu-list"
          mode="horizontal"
          @select="menuSelectHandler"
        >
          <el-menu-item index="map">地图</el-menu-item>
          <el-menu-item index="layer">图层</el-menu-item>
          <el-menu-item index="scene">场景</el-menu-item>
          <el-menu-item index="tool">工具</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="tool-bar">
      <div
        class="tool scene-tool animated bounceInLeft "
        v-show="activeMenu === 'scene'"
      >
        <span class="tool-item"
          >地球：<el-switch
            size="mini"
            v-model="showGlobe"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch
        ></span>
        <span class="tool-item"
          >太阳：<el-switch
            size="mini"
            v-model="showSun"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch
        ></span>
        <span class="tool-item"
          >月亮：<el-switch
            size="mini"
            v-model="showMoon"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch
        ></span>
        <span class="tool-item"
          >天空盒：<el-switch
            size="mini"
            v-model="showSkyBox"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch
        ></span>
        <span class="tool-item"
          >大气层：<el-switch
            size="mini"
            v-model="showAtmosphere"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch
        ></span>
        <span class="tool-item">
          光照：<el-switch
            size="mini"
            v-model="enableLight"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch
        ></span>
      </div>
      <div
        class=" tool scene-tool animated bounceInLeft "
        v-show="activeMenu === 'layer'"
      >
        <span class="tool-item" @click="showLayerDialog('3dtile')">
          <svg-icon icon-class="layer" class-name="svg-icon"></svg-icon>3D
          Tile</span
        >
        <span class="tool-item" @click="showLayerDialog('cluster')">
          <svg-icon icon-class="layer" class-name="svg-icon"></svg-icon
          >聚合</span
        >
        <span class="tool-item" @click="showLayerDialog('heat')">
          <svg-icon icon-class="layer" class-name="svg-icon"></svg-icon
          >热区</span
        >
        <span class="tool-item" @click="showLayerDialog('geojson')">
          <svg-icon icon-class="layer" class-name="svg-icon"></svg-icon
          >GeoJson</span
        >
        <span class="tool-item" @click="showLayerDialog('czml')">
          <svg-icon icon-class="layer" class-name="svg-icon"></svg-icon
          >Czml</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LyHead',
  data() {
    return {
      showGlobe: true,
      showSun: true,
      showMoon: true,
      showSkyBox: true,
      showAtmosphere: true,
      enableLight: false
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    menuSelectHandler(index) {
      this.$router.push(index).catch(err => {
        err
      })
    },
    showLayerDialog(type) {
      this.$hub.$emit('on-show-layer-dialog', type)
    }
  }
}
</script>

<style lang="scss">
.ly-head {
  .menu-h {
    .el-menu.el-menu--horizontal {
      border-bottom: solid 0px #e6e6e6;
      .el-menu-item {
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-weight: bold;
        background: transparent;
        font-size: 15px;
        &.is-active {
          color: #409eff;
          border-bottom: 2px solid #409eff;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.ly-head {
  position: absolute;
  z-index: 1;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  .nav-bar {
    padding: 10px 0px 5px 20px;
    display: flex;
    .title {
      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      color: #fff;
      font-size: 20px;
      font-style: oblique;
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
    .menu-h {
      display: flex;
      align-items: center;
      .menu-list {
        background: rgba(0, 0, 0, 0);
        color: #fff;
      }
    }
  }

  .tool-bar {
    color: #fff;
    margin: 5px 0px;
    .tool {
      padding-top: 5px;
      padding-left: 15px;
      border-top: 0.5px solid #cecece;
      .tool-item {
        margin-left: 10px;
        cursor: pointer;
        .svg-icon {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
