<template>
  <div class="layer module" ref="layer">
    <div class="title">
      <span>
        <svg-icon
          icon-class="layer"
          class-name="svg-icon"
          style="margin-right:5px"
        ></svg-icon
        >图层树</span
      >
      <span>
        <svg-icon
          :icon-class="isMax ? 'min' : 'max'"
          @on-click="changeHeight"
          class-name="svg-icon"
        ></svg-icon>
      </span>
    </div>
    <div class="map-list"></div>
    <layer-dialog
      :visible.sync="dialogVisible"
      :layer-type="layerType"
      @on-close="dialogVisible = false"
      @on-add="handleAdd"
    ></layer-dialog>
  </div>
</template>
<script>
import LayerDialog from './LayerDialog'

export default {
  name: 'Map',
  components: {
    LayerDialog
  },
  data() {
    return {
      isMax: true,
      dialogVisible: false,
      layerTree: {},
      layerType: ''
    }
  },
  methods: {
    changeHeight() {
      this.isMax = !this.isMax
      this.$refs['layer'].style.height = this.isMax ? '60vh' : '50px'
    },
    handleAdd(formData) {},

    showDialog(type) {
      this.layerType = type
      this.dialogVisible = true
    }
  },
  mounted() {
    this.$hub.$on('on-show-layer-dialog', this.showDialog)
  }
}
</script>

<style lang="scss" scoped>
.layer {
  position: fixed;
  overflow: hidden;
  width: 250px;
  height: 60vh;
  top: 150px;
  left: 30px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
  border: 1px solid #cecece;
  box-shadow: 2px 2px 4px #cecece;
  transition: height 0.8s;
  .title {
    color: #fff;
    padding: 15px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .svg-icon {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
}
</style>
