<template>
  <div class="row">
      <portfolio-stock v-for="(stock, index) in stocks" :stock="stock" :key="index"></portfolio-stock>
  </div>
</template>
<script>
import Stock from "./Stock.vue";

export default {
  computed: {
    stocks() {
      return this.$store.getters.portfolioStocks;
    },
  },
  components: {
    "portfolio-stock": Stock,
  },
};
</script>