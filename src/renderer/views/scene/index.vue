<template>
  <div class="scene module" ref="scene">
    <div class="title">
      <span>
        <svg-icon
          icon-class="scene"
          class-name="svg-icon"
          style="margin-right:5px"
        ></svg-icon
        >场景设置
      </span>
    </div>
    <div class="content">
      <el-collapse>
        <el-collapse-item title="地球" name="globe">
          <p class="scene_item">
            <label>
              显&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示：
            </label>
            <el-switch
              v-model="globe.show"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </p>
          <p class="scene_item">
            <label>
              颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：
            </label>
            <el-color-picker
              size="mini"
              v-model="globe.color"
            ></el-color-picker>
          </p>

          <p class="scene_item">
            <label>地下模式：</label>
            <el-switch
              v-model="globe.depthTestAgainstTerrain"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </p>
        </el-collapse-item>
        <el-collapse-item title="大气层" name="atmosphere">
          <p class="scene_item">
            <label>
              显&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示：
            </label>

            <el-switch
              v-model="atmosphere.show"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </p>
          <p class="scene_item">
            <label>
              亮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：
            </label>
            <el-input-number
              v-model="atmosphere.brightnessShift"
              :min="-1"
              :max="1"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>
              色&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：
            </label>
            <el-input-number
              v-model="atmosphere.hueShift"
              :min="-1"
              :max="1"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>饱&nbsp;&nbsp;和&nbsp;&nbsp;度：</label>
            <el-input-number
              v-model="atmosphere.saturationShift"
              :min="-1"
              :max="1"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
        </el-collapse-item>
        <el-collapse-item title="天空盒" name="skyBox">
          <p class="scene_item">
            <label
              >显&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示：</label
            >
            <el-switch
              v-model="skyBox.show"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </p>
        </el-collapse-item>
        <el-collapse-item title="地图" name="map">
          <p class="scene_item">
            <label>
              显&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示：
            </label>
            <el-switch
              v-model="map.show"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </p>
          <p class="scene_item">
            <label>透&nbsp;&nbsp;明&nbsp;&nbsp;度：</label>
            <el-input-number
              v-model="map.alpha"
              :min="0"
              :max="1"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>
              亮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：
            </label>
            <el-input-number
              v-model="map.brightness"
              :min="0"
              :max="2"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>对&nbsp;&nbsp;比&nbsp;&nbsp;度：</label>
            <el-input-number
              v-model="map.contrast"
              :min="0"
              :max="2"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>
              色&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;调：
            </label>
            <el-input-number
              v-model="map.hue"
              :min="0"
              :max="1"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>伽&nbsp;&nbsp;玛&nbsp;&nbsp;值：</label>
            <el-input-number
              v-model="map.gamma"
              :min="0"
              :max="2"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>饱&nbsp;&nbsp;和&nbsp;&nbsp;度：</label>
            <el-input-number
              v-model="map.saturation"
              :min="0"
              :max="2"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
        </el-collapse-item>
        <el-collapse-item title="地形" name="terrian"> </el-collapse-item>
        <el-collapse-item title="太阳" name="sun">
          <p class="scene_item">
            <label
              >显&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示：</label
            >
            <el-switch
              v-model="sun.show"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </p>
        </el-collapse-item>
        <el-collapse-item title="泛光" name="bloom">
          <p class="scene_item">
            <label
              >开&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;启：</label
            >
            <el-switch
              v-model="bloom.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </p>
          <p class="scene_item">
            <label>对&nbsp;&nbsp;比&nbsp;&nbsp;度：</label>
            <el-input-number
              v-model="bloom.contrast"
              :min="-255"
              :max="255"
              :step="1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>
              亮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：
            </label>
            <el-input-number
              v-model="bloom.brightness"
              :min="-1"
              :max="1"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>
              &nbsp;&nbsp;&nbsp;&nbsp;Delta&nbsp;&nbsp;&nbsp;&nbsp;：
            </label>
            <el-input-number
              v-model="bloom.delta"
              :min="0"
              :max="5"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>
              &nbsp;&nbsp;&nbsp;Sigma&nbsp;&nbsp;&nbsp;：
            </label>
            <el-input-number
              v-model="bloom.sigma"
              :min="0"
              :max="5"
              :step="0.1"
              size="mini"
            ></el-input-number>
          </p>
          <p class="scene_item">
            <label>
              &nbsp;StepSize&nbsp;：
            </label>
            <el-input-number
              v-model="bloom.stepSize"
              :min="0"
              :max="10"
              :step="1"
              size="mini"
            ></el-input-number>
          </p>
        </el-collapse-item>
        <el-collapse-item title="景深" name="depth"> </el-collapse-item>
        <el-collapse-item title="阴影" name="shadowMap"> </el-collapse-item>
        <el-collapse-item title="抗锯齿" name="fxaa"> </el-collapse-item>
        <el-collapse-item title="灯光" name="lighting"> </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Scene',
  components: {},
  data() {
    return {
      globe: {
        show: true,
        color: '#0000ff',
        depthTestAgainstTerrain: false
      },
      atmosphere: {
        show: true,
        brightnessShift: 0,
        hueShift: 0,
        saturationShift: 0
      },
      skyBox: {
        show: true
      },
      map: {
        show: true,
        alpha: 1,
        brightness: 1,
        contrast: 1,
        hue: 0,
        gamma: 1,
        saturation: 1
      },
      sun: {
        show: true
      },
      bloom: {
        enable: false,
        contrast: 128,
        brightness: -0.3,
        delta: 1,
        sigma: 3.78,
        stepSize: 5
      }
    }
  },
  watch: {
    'globe.show': value => {
      global.viewer && (global.viewer.scene.globe.show = value)
    },
    'globe.depthTestAgainstTerrain': value => {
      global.viewer &&
        (global.viewer.scene.globe.depthTestAgainstTerrain = value)
    },
    'globe.color': value => {
      global.viewer &&
        (global.viewer.scene.globe.baseColor = DC.Color.fromCssColorString(
          value
        ))
    },
    'atmosphere.show': value => {
      global.viewer && (global.viewer.scene.skyAtmosphere.show = value)
    },
    'atmosphere.brightnessShift': value => {
      global.viewer &&
        (global.viewer.scene.skyAtmosphere.brightnessShift = value)
    },
    'atmosphere.hueShift': value => {
      global.viewer && (global.viewer.scene.skyAtmosphere.hueShift = value)
    },
    'atmosphere.saturationShift': value => {
      global.viewer &&
        (global.viewer.scene.skyAtmosphere.saturationShift = value)
    },
    'skyBox.show': value => {
      global.viewer && (global.viewer.scene.skyBox.show = value)
    },
    'map.show': value => {
      global.viewer &&
        global.viewer.scene.imageryLayers._layers.forEach(item => {
          item.show = value
        })
    },
    'map.alpha': value => {
      global.viewer &&
        global.viewer.scene.imageryLayers._layers.forEach(item => {
          item.alpha = value
        })
    },
    'map.brightness': value => {
      global.viewer &&
        global.viewer.scene.imageryLayers._layers.forEach(item => {
          item.brightness = value
        })
    },
    'map.contrast': value => {
      global.viewer &&
        global.viewer.scene.imageryLayers._layers.forEach(item => {
          item.contrast = value
        })
    },
    'map.hue': value => {
      global.viewer &&
        global.viewer.scene.imageryLayers._layers.forEach(item => {
          item.hue = value
        })
    },
    'map.gamma': value => {
      global.viewer &&
        global.viewer.scene.imageryLayers._layers.forEach(item => {
          item.gamma = value
        })
    },
    'map.saturation': value => {
      global.viewer &&
        global.viewer.scene.imageryLayers._layers.forEach(item => {
          item.saturation = value
        })
    },
    'sun.show': value => {
      global.viewer && (global.viewer.scene.sun.show = value)
    },
    'bloom.enable': value => {
      global.viewer &&
        (global.viewer.scene.postProcessStages.bloom.enable = value)
    },
    'bloom.contrast': value => {
      global.viewer &&
        (global.viewer.scene.postProcessStages.bloom.uniforms.contrast = value)
    },
    'bloom.brightness': value => {
      global.viewer &&
        (global.viewer.scene.postProcessStages.bloom.uniforms.brightness = value)
    },
    'bloom.delta': value => {
      global.viewer &&
        (global.viewer.scene.postProcessStages.bloom.uniforms.delta = value)
    },
    'bloom.sigma': value => {
      global.viewer &&
        (global.viewer.scene.postProcessStages.bloom.uniforms.sigma = value)
    },
    'bloom.stepSize': value => {
      global.viewer &&
        (global.viewer.scene.postProcessStages.bloom.uniforms.stepSize = value)
    }
  },
  mounted() {
    this &&
      this.$nextTick(() => {
        this.globe = this.$store.getters.scene.globe
        this.atmosphere = this.$store.getters.scene.atmosphere
        this.skyBox = this.$store.getters.scene.skyBox
        this.map = this.$store.getters.scene.map
        this.sun = this.$store.getters.scene.sun
        this.bloom = this.$store.getters.scene.bloom
      })
  }
}
</script>
<style lang="scss">
.scene {
  .el-collapse-item__header {
    background: transparent;
    color: #12fdfd;
    padding: 0 30px;
    font-weight: 500;
    font-size: 14px;
  }
  .el-collapse-item__wrap {
    border-top: 1px dashed #cecece;
    padding-top: 10px;
    background: transparent;
    position: relative;
  }
  .el-collapse-item__content {
    color: #fff;
  }
  .el-input-number {
    width: 100px;
  }
}
</style>
<style lang="scss" scoped>
.scene {
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
  .content {
    position: relative;
    width: 100%;
    height: calc(100% - 60px);
    overflow: hidden;
    overflow-y: auto;
    .scene_item {
      padding-left: 40px;
      font-size: 15px;
      display: flex;
      margin-top: 10px;
      align-items: center;
    }
  }
}
</style>
