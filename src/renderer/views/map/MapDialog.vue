<template>
  <el-dialog
    class="map-dialog module-dialog"
    :visible.sync="dialogVisible"
    @closed="handleClosed"
    :close-on-click-modal="false"
    :append-to-body="true"
  >
    <el-form
      ref="map-form"
      :model="mapForm"
      label-width="100px"
      class="map-form"
    >
      <el-form-item prop="name" label="名称：" required>
        <el-input
          v-model="mapForm.name"
          placeholder="请输入名称"
          class="ipt"
        ></el-input>
      </el-form-item>
      <el-form-item prop="type" label="供应商：" required>
        <el-select
          v-model="mapForm.type"
          placeholder="请选择供应商"
          class="select"
          @change="getStyleList"
        >
          <el-option
            v-for="item in mapList"
            :key="item.name"
            :label="item.label"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="style" label="样式：" required>
        <el-radio v-model="mapForm.style" label="elec">
          <img src="/static/images/elec.png" title="电子图" />
        </el-radio>
        <el-radio
          v-model="mapForm.style"
          label="img"
          :disabled="mapForm.type === 'tencent'"
        >
          <img src="/static/images/img.png" title="影像图" />
        </el-radio>
        <el-radio
          v-model="mapForm.style"
          v-for="item in styleList"
          :key="item.value"
          :label="item.value"
        >
          <img
            :src="'/static/images/' + item.value + '.png'"
            :title="item.label"
          />
        </el-radio>
      </el-form-item>
      <el-form-item
        prop="url"
        label="地址："
        v-if="['wmts', 'arcgis', 'xyz', 'gaea'].indexOf(mapForm.type) >= 0"
      >
        <el-input v-model="mapForm.url" class="ipt"></el-input>
      </el-form-item>

      <el-form-item prop="key" label="Key：" v-if="mapForm.type === 'tdt'">
        <el-input v-model="mapForm.key" class="ipt"></el-input>
      </el-form-item>

      <el-form-item
        prop="imgUrl"
        label="底部图片："
        v-if="['xyz', 'gaea'].indexOf(mapForm.type) >= 0"
      >
        <el-input v-model="mapForm.imgUrl" class="ipt"></el-input>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" round @click="handleAdd">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'MapDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      this.$nextTick(() => {
        this.dialogVisible = Boolean(val)
      })
    }
  },
  data() {
    return {
      mapForm: {
        name: '',
        type: '',
        style: '',
        url: '',
        key: '',
        imgUrl: ''
      },
      mapList: [
        {
          name: 'google',
          label: '谷歌',
          styleList: [
            {
              value: 'ter',
              label: '地形'
            }
          ]
        },
        {
          name: 'baidu',
          label: '百度',
          styleList: [
            {
              value: 'dark',
              label: '黑色'
            },
            {
              value: 'midnight',
              label: '午夜蓝'
            }
          ]
        },
        {
          name: 'amap',
          label: '高德'
        },
        {
          name: 'tencent',
          label: '腾讯'
        },
        {
          name: 'tdt',
          label: '天地图'
        },
        {
          name: 'arcgis',
          label: 'ArcGis'
        },
        {
          name: 'wmts',
          label: 'WMTS'
        },
        {
          name: 'xyz',
          label: 'XYZ'
        },
        {
          name: 'single',
          label: '单图片'
        }
      ],
      styleList: [],
      dialogVisible: false
    }
  },
  methods: {
    handleClosed() {
      this.$refs['map-form'].resetFields()
      this.$emit('on-close')
    },
    handleAdd() {
      if (!this.mapForm.name || !this.mapForm.style || !this.mapForm.style) {
        this.$message.error('必要字段值为空，请填入。')
        return false
      }
      this.$emit('on-add', this.mapForm)
    },
    getStyleList(val) {
      let filter = this.mapList.filter(item => item.name === val)
      if (filter && filter.length) {
        this.styleList = filter[0].styleList || []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map-dialog {
  width: 850px;
  left: 20%;
  .map-form {
    width: 100%;
    .ipt,
    .select {
      width: 80%;
    }
    border-bottom: 1px solid #cecece;
  }
  .btns {
    text-align: center;
  }
  img {
    width: 1.8rem;
    transform: translateY(25%);
  }
}
</style>
