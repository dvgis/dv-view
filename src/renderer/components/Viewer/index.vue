<template>
  <div class="viewer-container" id="viewer-container"></div>
</template>

<script>
export default {
  name: 'Viewer',
  methods: {
    initViewer() {
      let viewer = new DC.Viewer('viewer-container')
      this.$emit('viewer-completed', viewer)
    }
  },
  mounted() {
    DC.ready(this.initViewer)
  }
}
</script>

<style lang="scss" scoped>
.viewer-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
