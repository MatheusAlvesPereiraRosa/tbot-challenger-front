<template>
  <section class="w-full flex flex-col">
    <div
      id="chat-container"
      class="flex flex-col w-full h-full overflow-y-auto max-h-[calc(100vh-8.985rem)] bg-gradient-to-r from-purple-300 to-pink-300 p-4"
    >
      <div
        v-for="message in filteredMessages"
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
      <div v-if="filteredMessages.length === 0" class="m-auto">
        <h1 class="text-2xl font-bold text-purple-800 p-2 rounded-md">
          Selecione um Chat
        </h1>
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
  import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
  import Message from '../components/Message.vue'
  import { useStore } from 'vuex'
  import io from 'socket.io-client'

  const socket = ref(null)

  const store = useStore()

  const messageInput = ref('')

  const messages = computed(() => store.getters['getMessages'])

  // Invertendo a ordem das mensagens
  const reversedMessages = computed(() => messages.value.slice().reverse())

  // Chat/conversa selecionada
  const selectedChatId = computed(() => store.getters['getSelectedChatId'])

  // Mensagens filtradas por chatId
  const filteredMessages = computed(() => {
    return reversedMessages.value.filter(
      (message) => message.chatId === selectedChatId.value,
    )
  })

  const loadMessages = () => {
    store.dispatch('fetchMessages')
  }

  // Estabelecendo conexão com websocket para receber mensagens em tempo real
  onMounted(() => {
    loadMessages()
    // Conectando ao websocket para receber as mensagens em tempo real
    socket.value = io('http://localhost:3000')

    // Recebendo as mensagens que chegam
    socket.value.on('message', (message) => {
      // Commitando as mensagens no Vuex store
      store.commit('addMessage', message)
      nextTick(() => {
        scrollToBottomOfChat()
      })
    })

    nextTick(() => {
      scrollToBottomOfChat()
    })
  })

  onUnmounted(() => {
    socket.value.disconnect()
    console.log("Desconectei")
  })

  const sendMessage = () => {
    const messageText = messageInput.value
    if (messageText) {
      const newMessage = {
        message: messageText,
        userId: 123,
        isUserMessage: true,
        chatId: selectedChatId.value,
        timestamp: new Date().toLocaleString(),
      }
      store.dispatch('sendMessage', newMessage)
      messageInput.value = '' // Limpando o input de mensagens
      nextTick(() => {
        scrollToBottomOfChat()
      })
    }
  }

  // Função para fazer o scroll para o final da tela
  const scrollToBottomOfChat = () => {
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }
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
