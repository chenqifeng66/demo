<template>
  <div class="container">
    <Top></Top>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <BackTop :bottom="80" :right="80"></BackTop>
  </div>
</template>

<script>
import Top from "@/components/Top";
import { mapState } from "vuex";
export default {
  components: {
    Top,
  },
  created() {
    // this.getCarts();
  },
  computed: {
    ...mapState(["cart", "carts"]),
  },
  methods: {
    // ...mapMutations(['cart',"saveCarts"]),
    // 获取购物车信息
    getCarts() {
      this.$api
        .get("/carts")
        .then(({ data }) => {
          const { carts } = data;

          // 保存到vuex
          this.saveCarts(carts);
          window.localStorage.setItem("carts", JSON.stringify(carts));
        })
        .catch(() => this.$Message.error("获取购物车信息失败!"));
    },
  },
};
</script>

<style scoped>
.container {
  padding-bottom: 80px;
}
</style>