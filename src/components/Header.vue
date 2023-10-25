<template>
  <header>
    <nav class="bg-orange-500 flex justify-between items-center p-4">
      <div class="text-2xl font-bold text-purple-950">
        <img :src="imgUrl" class="w-[10rem]" alt="" />
      </div>
      <div class="flex space-x-2">
        <div class="relative" @click="toggleChat">
          <span class="cursor-pointer">
            <img class="w-20 h-auto" src="/assets/hamburger.png" alt="" />
          </span>
        </div>
        <RouterLink to="/auth/login" class="text-xl text-purple-950" @click="logout">
          Logout
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
  import { RouterLink } from 'vue-router'
  import imgUrl from '../assets/Tbot-challenge-logo.png'

  const logout = () => {
    // Limpando cookie (token)
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
</script>

<style scoped>
</style>
