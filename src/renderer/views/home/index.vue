<template>
  <div class="home">
    <ly-head></ly-head>
    <ly-content></ly-content>
    <ly-foot></ly-foot>
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
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
