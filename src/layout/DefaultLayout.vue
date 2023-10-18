<template>
  <div class="flex flex-col">
    <Header />

    <div class="flex">
      <ChatList />
      <RouterView />
    </div>
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import Header from '../components/Header.vue'
  import ChatList from '../components/ChatList.vue'
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .flex-1 {
    flex: 1;
  }
</style>
