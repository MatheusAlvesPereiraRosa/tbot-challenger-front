<template>
  <header>
    <nav class="bg-gray-100 flex justify-between items-center p-2">
      <RouterLink to="/" class="text-2xl font-bold text-purple-950">
        Your App
      </RouterLink>
      <div class="flex space-x-2">
        <div class="relative" @click="toggleChat">
          <span class="cursor-pointer">
            <img class="w-20 h-auto" src="/assets/hamburger.png" alt="" />
          </span>
          <div v-if="showChat" class="absolute -top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            5 <!-- You can use dynamic content here, like the number of unread messages -->
          </div>
        </div>
        <RouterLink to="/cart" class="text-purple-950">
          Logout
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'

  const showChat = ref(false)

  const toggleChat = () => {
    showChat.value = !showChat.value
  }
</script>

<style scoped>
/* Add Tailwind CSS classes or your custom styles here */
</style>