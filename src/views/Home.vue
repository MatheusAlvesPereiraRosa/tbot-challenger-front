<template>
  <section class="w-full flex flex-col">
    <div
      class="flex flex-col w-full h-full overflow-y-auto max-h-[calc(100vh-8.985rem)] bg-gradient-to-r from-purple-300 to-pink-300 p-4"
    >
      <div
        v-for="message in reversedMessages"
        :key="message.id"
        class=""
        :class="{
          'place-self-end': message.isUserMessage,
          'place-self-start': !message.isUserMessage,
        }"
      >
        <Message
          class="flex flex-col-reverse w-fit p-3 rounded-md mb-6"
          :class="{
            'bg-orange-200': message.isUserMessage,
            'bg-white': !message.isUserMessage,
          }"
          :message="message"
        />
      </div>
    </div>
    <div class="flex-1 px-4 py-3 bg-orange-500">
      <input
        v-model="messageInput"
        class="bg-black-400 p-2 rounded-md w-full text-md no-outline"
        type="text"
        placeholder="Digite uma mensagem"
        @keyup.enter="sendMessage"
      />
    </div>
  </section>
</template>

<script setup>
  import { ref, computed, onMounted, watchEffect } from 'vue'
  import Message from '../components/Message.vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const messageInput = ref('')

  const messages = computed(() => store.getters['getMessages'])

  const reversedMessages = computed(() => messages.value.slice().reverse())

  const sendMessage = () => {
    const messageText = messageInput.value
    if (messageText) {
      const newMessage = {
        message: messageText,
        userId: 123, // Replace with the actual user ID
        isUserMessage: true,
        timestamp: new Date().toLocaleString(),
      }
      store.dispatch('sendMessage', newMessage)
      messageInput.value = '' // Clear the input field
    }
  }

  // Function to scroll to the bottom of the chat
  /*const scrollToBottomOfChat = () => {
    const chatContainer = document.getElementById('chat-container')
    chatContainer.scrollTop = chatContainer.scrollHeight
  }*/

  // Watch for changes in the `reversedMessages` computed property
  /*watchEffect(() => {
    // Perform any additional logic when `reversedMessages` changes
    // For example, scroll to the bottom of the chat
    scrollToBottomOfChat()
  })*/

  const loadMessages = () => {
    store.dispatch('fetchMessages')
  }

  onMounted(() => {
    loadMessages() // Call the action when the component is mounted
  })
</script>

<style scoped>
  input:focus-visible {
    outline: none;
  }

  div::-webkit-scrollbar {
    width: 0.95rem;
  }

  div::-webkit-scrollbar-track {
    background: rgb(58, 1, 59);
  }

  div::-webkit-scrollbar-thumb {
    background-color: #ff321a;
    border: 3px solid rgb(58, 1, 59);
    border-radius: 20px;
  }
</style>
