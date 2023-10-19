<template>
  <div class="flex flex-col">
    <Header />

    <div class="flex w-full">
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

<style scoped></style>
