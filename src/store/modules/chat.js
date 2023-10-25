export default {
  state: {
    messages: [],
    chats: [], // Guardando ids do chats
    selectedChatId: '', // Guardando o id do chat selecionado
  },
  mutations: {
    // Adicionando novas mensagens no store
    addMessage(state, message) {
      state.messages.unshift(message)
    },
    // Setando mensagens iniciais
    setMessages(state, messages) {
      state.messages = messages
    },
    // Setando chats/conversas
    setChats(state, chats) {
      state.chats = chats
    },
    // Setando qual chat será mostrado
    selectedChat(state, chatId) {
      state.selectedChatId = chatId
    },
  },
  actions: {
    // Recolhendo mensagens
    async fetchMessages({ commit }) {
      try {
        const token = document.cookie.split('=')[1];

        const response = await fetch('http://localhost:5000/api/getHistory', {
          headers: {
            'Authorization': `${token}`,
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch messages')
        }
        const data = await response.json()

        commit('setMessages', data)
      } catch (error) {
        console.error(error)
      }
    },
    // Recolhendo chats
    async fetchChats({ commit }) {
      try {
        const token = document.cookie.split('=')[1];

        const response = await fetch('http://localhost:5000/api/getChats', {
          headers: {
            'Authorization': `${token}`,
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch messages')
        }
        const data = await response.json()

        commit('setChats', data)
      } catch (error) {
        console.error(error)
      }
    },
    // Enviando mensagem
    async sendMessage({ commit }, message) {
      try {
        const token = document.cookie.split('=')[1];

        const response = await fetch('http://localhost:5000/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
          body: JSON.stringify(message),
        })

        if (!response.ok) {
          throw new Error('Failed to send message')
        }

        // Enviado a mensagem e atualizando o store
        const sentMessage = await response.json()
        commit('addMessage', sentMessage.message)
      } catch (error) {
        console.error(error)
      }
    },
    // Selecionando mensagem
    selectChat({ commit }, chatId) {
      commit('selectedChat', chatId)
    },
  },
  getters: {
    getMessages: (state) => state.messages,
    getChats: (state) => state.chats,
    getSelectedChatId: (state) => state.selectedChatId,
  },
}
