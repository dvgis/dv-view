<template>
  <div class="home">
    <div>
      <ly-head></ly-head>
      <ly-content></ly-content>
      <ly-foot></ly-foot>
    </div>
    <div class="viewer">
      <viewer @viewer-completed="viewerCompleted"></viewer>
    </div>
  </div>
</template>
<script>
import LyHead from '@/layout/LyHead'
import LyContent from '@/layout/LyContent'
import LyFoot from '@/layout/LyFoot'
export default {
  name: 'Home',
  components: {
    LyHead,
    LyContent,
    LyFoot
  },
  data() {
    return {}
  },
  methods: {
    viewerCompleted(viewer) {
      viewer && (viewer._comps.mapSwitch.enable = false)
      global.viewer = viewer
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .viewer {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
