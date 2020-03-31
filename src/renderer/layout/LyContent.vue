<template>
  <div class="ly-content">
    <router-view />
    <div class="viewer">
      <viewer @viewer-completed="viewerCompleted"></viewer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LyContent',
  data() {
    return {}
  },
  methods: {
    viewerCompleted(viewer) {
      viewer && (viewer._comps.mapSwitch.enable = false)
      global.viewer = viewer
      this.$hub.$emit('on-viewer-completed')
    }
  }
}
</script>

<style lang="scss" scoped>
.ly-content {
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
  display: flex;
  .viewer {
    position: relative;
    width: calc(100% - 250px);
    height: 100%;
    overflow: hidden;
  }
}
</style>
