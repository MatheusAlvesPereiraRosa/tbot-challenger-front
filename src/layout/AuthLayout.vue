<template>
  <div
    class="bg-gradient-to-b from-violet-500 to-fuchsia-900 w-full h-[100vh] flex items-center justify-center"
  >
    <RouterView />
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router'
</script>

<style scoped></style>
