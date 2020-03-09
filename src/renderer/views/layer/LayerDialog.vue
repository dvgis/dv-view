<template>
  <el-dialog
    class="layer-dialog module-dialog"
    :visible.sync="dialogVisible"
    @closed="handleClosed"
    :close-on-click-modal="false"
    :append-to-body="true"
  >
    <el-form
      ref="layer-form"
      :model="layerForm"
      label-width="100px"
      class="layer-form"
    >
      <el-form-item prop="name" label="名称：" required>
        <el-input
          v-model="layerForm.name"
          placeholder="请输入名称"
          class="ipt"
        ></el-input>
      </el-form-item>
      <el-form-item prop="type" label="图层类型：" required>
        <el-select v-model="layerForm.type" class="select" disabled>
          <el-option
            v-for="item in layerTypeList"
            :key="item.name"
            :label="item.label"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="url" label="数据地址：" required>
        <el-input v-model="layerForm.url" class="ipt"></el-input>
      </el-form-item>
      <el-form-item
        prop="imgUrl"
        label="要素图片："
        v-if="['geojson'].indexOf(layerForm.type) >= 0"
      >
        <el-input v-model="layerForm.imgUrl" class="ipt"></el-input>
      </el-form-item>
      <el-form-item prop="visible" label="是否显示：">
        <el-switch
          size="mini"
          v-model="layerForm.visible"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch
      ></el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" round @click="handleAdd">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'LayerDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    layerType: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible(val) {
      this.$nextTick(() => {
        this.dialogVisible = Boolean(val)
      })
    },
    layerType(val) {
      this.$nextTick(() => {
        this.layerForm.type = val
      })
    }
  },
  data() {
    return {
      layerForm: {
        name: '',
        type: '',
        url: '',
        imgUrl: '',
        visible: true
      },
      layerTypeList: global.layerTypeList,
      dialogVisible: false
    }
  },
  methods: {
    handleClosed() {
      this.$refs['layer-form'].resetFields()
      this.$emit('on-close')
    },
    handleAdd() {
      if (!this.layerForm.name || !this.layerForm.type || !this.layerForm.url) {
        this.$message.error('必要字段值为空，请填入。')
        return false
      }
      this.$db
        .run(
          'insert into tb_layer_list values (:id,:name,:type,:url,:visible);',
          {
            ':id': DC.Util.uuid(),
            ':name': this.layerForm.name,
            ':type': this.layerForm.type,
            ':url': this.layerForm.url,
            ':visible': this.layerForm.visible ? '1' : '0'
          }
        )
        .then(() => {
          this.$message.success({
            message: '添加成功!'
          })
          this.$refs['layer-form'].resetFields()
          this.$emit('on-add')
        })
    },
    getTypeList() {
      this.$db.prepare('select name,label from tb_layer_type').then(data => {
        this.layerTypeList = data
      })
    }
  },
  mounted() {
    this.getTypeList()
  }
}
</script>

<style lang="scss" scoped>
.layer-dialog {
  width: 850px;
  left: 20%;
  .layer-form {
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
}
</style>
