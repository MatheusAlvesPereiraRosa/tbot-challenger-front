<template>
  <aside
    class="bg-orange-100 w-3/12 min-h-[87.2vh] border-r border-gray-300 p-4"
  >
    <div class="flex justify-between items-center mb-4 ">
      <div class="text-xl font-bold text-purple-800">Chat ID's</div>
      <img :src="Refresh" class="w-[25px] h-[25px] cursor-pointer" alt="Refresh" @click="refresh">
    </div>
    <ul>
      <li
        v-for="chat in chats"
        :key="chat.chatId"
        class="flex items-center font-bold text-purple-800 cursor-pointer mb-4"
        @click="selectChat(chat.chatId, $event)"
      >
        <div class="flex-1">{{ chat.chatId }}</div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import Refresh from '../assets/refresh.png'

  const store = useStore()

  const chats = computed(() => store.getters['getChats'])

  const refresh = () => {
    store.dispatch('fetchChats')
  }
  
  const loadChats = () => {
    store.dispatch('fetchChats')
  }

  const selectChat = (chatId, event) => {
    // selecionando o id do chat
    store.dispatch('selectChat', chatId)
  }

  onMounted(() => {
    loadChats()
  })
</script>

<style scoped>
</style>
