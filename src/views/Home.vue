<template>
  <section
    class="flex flex-col w-full bg-gradient-to-r from-purple-300 to-pink-300 p-4"
  >
    <div v-for="message in messages" :key="message.id">
      <Message :message="message"/>
    </div>
  </section>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import Message from '../components/Message.vue'

  const messages = ref([
    {
      id: 1,
      text: "Olá bom dia",
      userId: 5198,
      timestamp: "18/10/2023 19:48",
      isUserMessage: false,
    },
    {
      id: 2,
      text: "Opa, tudo tranquilo?",
      userId: 6298,
      timestamp: "18/10/2023 19:48",
      isUserMessage: true,
    },
  ])
</script>

<style scoped></style>
