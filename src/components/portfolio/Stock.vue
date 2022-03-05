<template>
  <div class="col-sm-6 col-md-4 mb-3">
    <div class="card">
      <div class="card-header bg-success">
        <h3 class="h5 text-white card-title">
          {{ stock.name }}
          <small
            >(price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small
          >
        </h3>
      </div>
      <div class="card-body d-flex align-items-start">
        <div class="me-3">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-model="quantity"
          />
          <span class="form-text text-danger" v-if="insufficientQuantity"
            >Insufficient Quantity</span
          >
        </div>
        <button
          class="btn btn-success"
          @click="sellStock"
          :disabled="
            insufficientQuantity || quantity <= 0 || !Number.isInteger(quantity)
          "
        >
          Sell
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    stock: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: 0,
    };
  },
  computed: {
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    },
  },
  methods: {
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity,
      };

      this.$store.dispatch("sellStocks", order);
      this.quantity = 0;
    },
  },
};
</script>