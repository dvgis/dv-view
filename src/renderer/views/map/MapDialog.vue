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
            v-for="item in mapTypeList"
            :key="item.name"
            :label="item.label"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="style" label="样式：">
        <el-radio
          v-model="mapForm.style"
          v-for="item in mapStyleList"
          :key="item.name"
          :label="item.name"
        >
          <img
            :src="'/static/images/' + item.name + '.png'"
            :title="item.label"
          />
        </el-radio>
      </el-form-item>
      <el-form-item
        prop="url"
        label="地址："
        v-if="
          ['wmts', 'arcgis', 'xyz', 'gaea', 'single'].indexOf(mapForm.type) >= 0
        "
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
        style: 'elec',
        url: '',
        key: '',
        imgUrl: ''
      },
      mapTypeList: [],
      mapStyleList: [],
      dialogVisible: false
    }
  },
  methods: {
    handleClosed() {
      this.$refs['map-form'].resetFields()
      this.mapStyleList = []
      this.$emit('on-close')
    },
    handleAdd() {
      if (!this.mapForm.name || !this.mapForm.type) {
        this.$message.error('必要字段值为空，请填入。')
        return false
      }
      this.$db
        .run(
          'insert into tb_map_list values (:id,:name,:type,:style,:url,:key,:imgUrl);',
          {
            ':id': DC.Util.uuid(),
            ':name': this.mapForm.name,
            ':type': this.mapForm.type,
            ':style': this.mapForm.style,
            ':url': this.mapForm.url,
            ':key': this.mapForm.key,
            ':imgUrl': this.mapForm.imgUrl
          }
        )
        .then(() => {
          this.$message.success({
            message: '添加成功!'
          })
          this.$refs['map-form'].resetFields()
          this.$emit('on-add')
        })
    },
    getStyleList(type) {
      if (type) {
        let typeFilters = this.mapTypeList.filter(item => item.name === type)
        if (typeFilters && typeFilters.length) {
          this.$db
            .prepare(
              'select name,label from tb_map_style where map_type_id is null or map_type_id = :map_type_id ',
              { ':map_type_id': typeFilters[0].id }
            )
            .then(data => {
              this.mapStyleList = data
            })
        }
      }
    },
    getTypeList() {
      this.$db.prepare('select * from tb_map_type').then(data => {
        this.mapTypeList = data
      })
    }
  },
  mounted() {
    this.getTypeList()
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
