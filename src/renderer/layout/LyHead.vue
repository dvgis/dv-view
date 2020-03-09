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
          <el-menu-item index="setting">设置</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="tool-bar">
      <div
        class="tool scene-tool animated bounceInLeft "
        v-show="activeMenu === 'layer'"
      >
        <span
          class="tool-item"
          v-for="item in layerTypeList"
          @click="showLayerDialog(item.name)"
          :key="item.name"
        >
          <svg-icon icon-class="layer" class-name="svg-icon"></svg-icon
          >{{ item.label }}</span
        >
      </div>

      <div class="tool  animated bounceInLeft " v-show="activeMenu === 'tool'">
        <span
          class="tool-item"
          v-for="item in tooTypeList"
          @click="showLayerDialog(item.name)"
          :key="item.name"
        >
          <svg-icon icon-class="tool" class-name="svg-icon"></svg-icon
          >{{ item.label }}</span
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
      layerTypeList: [],
      tooTypeList: []
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
    getTypeList() {
      this.$db
        .exec(
          `select name,label from tb_layer_type;
         select name,label from tb_tool_type;`
        )
        .then(data => {
          if (data && data.length) {
            this.layerTypeList = data[0] || []
            this.tooTypeList = data[1] || []
          }
        })
    }
  },
  mounted() {
    this.getTypeList()
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
