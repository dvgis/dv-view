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
          <el-menu-item index="widget">组件</el-menu-item>
          <el-menu-item index="scene">场景</el-menu-item>
          <el-menu-item index="tool">工具</el-menu-item>
          <el-menu-item index="setting">设置</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="tool">
      <svg-icon
        icon-class="3d"
        class-name="svg-icon"
        :class="{ active: is3d }"
        @on-click="changeSceneMode"
      ></svg-icon>
      <svg-icon
        icon-class="home"
        class-name="svg-icon home-button"
        @on-click="gotoHome"
      ></svg-icon>
      <svg-icon
        icon-class="fullscreen"
        class-name="svg-icon"
        style="width:20px"
        @on-click="fullScreen"
      ></svg-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LyHead',
  data() {
    return {
      is3d: true
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
    },
    changeSceneMode() {
      this.is3d = !this.is3d
      if (this.is3d) {
        global.viewer && global.viewer.scene.morphTo3D()
      } else {
        global.viewer && global.viewer.scene.morphTo2D()
      }
    },
    gotoHome() {
      global.viewer && global.viewer.camera.flyHome()
    },
    fullScreen() {
      let element = document.getElementById('viewer-container')
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      }
    }
  },
  mounted() {}
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
  height: 60px;
  background-image: linear-gradient(-180deg, #393939 0%, #2d2d2d 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .nav-bar {
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
        background: transparent;
        color: #fff;
      }
    }
  }
  .tool {
    display: flex;
    align-items: center;
    .svg-icon {
      width: 30px;
      height: 30px;
      color: #fff;
      margin-left: 15px;
      cursor: pointer;
      &.active {
        color: rgb(7, 110, 245);
      }

      &.home-button {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
