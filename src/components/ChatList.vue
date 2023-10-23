<template>
  <aside
    class="bg-orange-100 w-3/12 min-h-[87.2vh] border-r border-gray-300 p-4"
  >
    <div class="text-xl font-bold mb-4 text-purple-800">Chat ID's</div>
    <ul>
      <li
        v-for="chat in chats"
        :key="chat.chatId"
        class="flex items-center cursor-pointer mb-4"
        @click="selectChat(chat.chatId, $event)"
      >
        <div class="flex-1">{{ chat.chatId }}</div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
  import { computed, onMounted, watchEffect } from 'vue'
  import { useStore } from 'vuex'
  //import io from 'socket.io-client'

  const store = useStore()

  const chats = computed(() => store.getters['getChats'])

  //console.log(chats)

  const loadChats = () => {
    store.dispatch('fetchChats')
  }

  const selectChat = (chatId, event) => {
    // selecionando o id do chat
    store.dispatch('selectChat', chatId);
  };

  onMounted(() => {
    loadChats()
  })
</script>

<style scoped>
  /* Add Tailwind CSS classes or your custom styles here */
</style>
