<template>
    <div class="row">
        <stock v-for="stock in stocks" :stock="stock" :key="stock.id"></stock>
    </div>
</template>
<script>
import Stock from './Stock.vue';

export default {
    computed: {
        stocks() {
            return this.$store.getters.stocks;
        },
    },
    components: {
        'stock': Stock,
    },
}
</script>