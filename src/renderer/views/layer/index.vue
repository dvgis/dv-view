<template>
  <div class="layer module" ref="layer">
    <div class="title">
      <span>
        <svg-icon
          icon-class="layer"
          class-name="svg-icon"
          style="margin-right:5px"
        ></svg-icon
        >图层
      </span>
    </div>
    <div class="layer-tree">
      <el-tree
        :data="layerList"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :default-checked-keys="checkedList"
        :props="{ label: 'name' }"
        @check-change="handleCheckChange"
      >
        <span class="tree-item" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="data.id !== 'root'">
            <svg-icon
              icon-class="location"
              class-name="svg-icon"
              @on-click="gotoLayer(data)"
            ></svg-icon>
            <svg-icon
              icon-class="del"
              class-name="svg-icon"
              @on-click="delLayer(data)"
            ></svg-icon>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="tool">
      <el-button round @click="dialogVisible = true">添加图层</el-button>
    </div>
    <layer-dialog
      :visible.sync="dialogVisible"
      @on-close="dialogVisible = false"
      @on-add="handleAdd"
    ></layer-dialog>
  </div>
</template>
<script>
import LayerDialog from './LayerDialog'
import point_img from '@/assets/images/point.png'

export default {
  name: 'Layer',
  components: {
    LayerDialog
  },
  data() {
    return {
      isMax: true,
      dialogVisible: false,
      layerType: '',
      layerList: [],
      checkedList: []
    }
  },
  methods: {
    changeHeight() {
      this.isMax = !this.isMax
      this.$refs['layer'].style.height = this.isMax ? '60vh' : '50px'
    },

    handleAdd() {
      this.getLayerList()
    },
    createLayer(options) {
      let layer = undefined
      let dataLayer = undefined
      if (global.viewer) {
        layer = global.viewer.getLayer(options.id)
        if (!layer) {
          switch (options.type) {
            case '3dtile':
              layer = new DC.TilesetLayer(options.id)
              let tileset = new DC.Tileset(options.url)
              tileset.attr = {
                name: options.name
              }
              layer.addOverlay(tileset)
              break
            case 'cluster':
              dataLayer = new DC.GeoJsonLayer('data', options.url)
              layer = new DC.ClusterLayer(options.id)
              dataLayer.eachOverlay(item => {
                if (item.billboard) {
                  layer.addOverlay(
                    new DC.Billboard(
                      DC.T.transformCartesianToWSG84(
                        item.position.getValue(DC.JulianDate.now())
                      ),
                      options.imgUrl || point_img
                    )
                  )
                }
              })

              break
            case 'heat':
              dataLayer = new DC.GeoJsonLayer('data', options.url)
              let bounds = []
              if (options.bounds) {
              }
              layer = new DC.HeatmapLayer(options.id, bounds)
              let positions = []
              dataLayer.eachOverlay(item => {
                if (item.billboard) {
                  positions.push(
                    DC.T.transformCartesianToWSG84(
                      item.position.getValue(DC.JulianDate.now())
                    )
                  )
                }
              })
              layer.setPositions(positions)
              break
            case 'geojson':
              layer = new DC.GeoJsonLayer(options.id, options.url)
              break
            case 'czml':
              layer = new DC.CzmlLayer(options.id, options.url)
              break
            default:
              break
          }
        }
      }
      return layer
    },
    getLayerList() {
      this.$db.prepare('select * from tb_layer_list;').then(data => {
        let checkedList = []
        data.forEach(item => {
          if (item.visible === '1') {
            this.checkedList.push(item.id)
          }
          let layer = this.createLayer(item)
          global.viewer && layer && global.viewer.addLayer(layer)
          global.viewer &&
            (global.viewer.getLayer(item.id).show =
              item.visible === '1' ? true : false)
        })
        this.layerList = [
          {
            id: 'root',
            name: '图层树',
            children: data
          }
        ]
      })
    },
    gotoLayer(data) {
      let layer = global.viewer.getLayer(data.id)
      if (layer && data.type === '3dtile') {
        global.viewer.flyTo(layer.getOverlayByAttr('name', data.name))
      } else if (layer) {
        global.viewer.flyTo(layer)
      }
    },
    delLayer(layer) {
      this.$confirm('此操作将永久删除该图层, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$db
          .run('delete from tb_layer_list where id= :id ;', {
            ':id': layer.id
          })
          .then(data => {
            this.$message.success({
              message: '删除成功!'
            })
            global.viewer.removeLayer(global.viewer.getLayer(layer.id))
            this.getLayerList()
          })
      })
    },
    handleCheckChange(data, checked, indeterminate) {
      let layerId = data.id
      if (layerId === 'root') {
        return
      }
      this.$db
        .run('update tb_layer_list set visible = :visible where id = :id ;', {
          ':id': data.id,
          ':visible': checked ? '1' : '0'
        })
        .then(data => {
          let layer = global.viewer.getLayer(layerId)
          layer && (layer.show = checked)
        })
    }
  },
  mounted() {
    this.getLayerList()
  }
}
</script>

<style lang="scss">
.layer {
  .el-tree {
    background: transparent;
    color: #fff;

    .el-tree-node__content {
      background: transparent !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.layer {
  height: 100%;
  .svg-icon {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .title {
    color: #fff;
    padding: 15px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .layer-tree {
    height: calc(100% - 115px);
    overflow: hidden;
    overflow-y: auto;
    .tree-item {
      flex: 1;
      display: flex;
      justify-content: space-between;
      margin-right: 20px;
    }
  }
}
</style>
