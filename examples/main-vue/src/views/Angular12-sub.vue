<template>
  <WujieVue class="angular-container" name="angular12" :url="url" :attrs="attrs"></WujieVue>
</template>

<script>
import hostMap from "../hostMap";
import wujieVue from "wujie-vue2";
export default {
  data() {
    return {
      url: hostMap("//localhost:7400/") + this.$route.params.path,
      attrs: process.env.NODE_ENV === "production" ? { src: hostMap("//localhost:7400/") + this.$route.params.path } : {},
    };
  },
  watch: {
    "$route.params.path": {
      handler: function () {
        wujieVue.bus.$emit("angular12-router-change", `/${this.$route.params.path}`);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="css" scoped>
.angular-container {
  width: 100%;
  height: 100%;
}
</style>
