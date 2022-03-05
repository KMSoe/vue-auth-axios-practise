<template>
  <div class="container pt-3">
    <app-header></app-header>
    <div class="row">
      <div class="col-xs-12 pt-5">
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from './components/header/header.vue'
  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
    created() {
      this.$store.dispatch('tryAutoLogin');
    }
  }
</script>
<style>
body {
  margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
input.danger,
input.danger:focus {
  border: 1px solid red !important;
}
.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
