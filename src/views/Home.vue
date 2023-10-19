<template>
  <section
    class="flex flex-col w-full bg-gradient-to-r from-purple-300 to-pink-300 p-4"
  >
    <div
      v-for="message in messages"
      :key="message.id"
      class=""
      :class="{
        'place-self-end': message.isUserMessage,
        'place-self-start': !message.isUserMessage,
      }"
    >
      <Message
        class="flex flex-col w-fit p-3 rounded-md mb-6"
        :class="{
          'bg-orange-200': message.isUserMessage,
          'bg-white': !message.isUserMessage,
        }"
        :message="message"
      />
    </div>
  </section>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import Message from '../components/Message.vue'

  const messages = ref([
    {
      id: 1,
      text: 'Olá bom dia',
      userId: 5198,
      timestamp: '18/10/2023 19:48',
      isUserMessage: false,
    },
    {
      id: 2,
      text: 'Opa, tudo tranquilo?',
      userId: 6298,
      timestamp: '18/10/2023 19:48',
      isUserMessage: true,
    },
  ])
</script>

<style scoped></style>
