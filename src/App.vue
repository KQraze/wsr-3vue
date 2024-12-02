<script setup>
import TheHeader from "@/components/header/TheHeader.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => store.dispatch("init"));
</script>

<template>
  <the-header />
  <router-view />
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
