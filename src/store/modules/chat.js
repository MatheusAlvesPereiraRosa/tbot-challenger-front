export default {
  state: {
    messages: [],
    chats: [], // Guardando ids do chats
    selectedChatId: '', // Guardando o id do chat selecionado
  },
  mutations: {
    addMessage(state, message) {
      state.messages.unshift(message);
      console.log(state)
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    setChats(state, chats) {
      state.chats = chats;
    },
    selectedChat(state, chatId) {
      state.selectedChatId = chatId;
    },
  },
  actions: {
    async fetchMessages({ commit }) {
      try {
        const response = await fetch('http://localhost:5000/api/getHistory');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();

        commit('setMessages', data); 

      } catch (error) {
        console.error(error);
      }
    },
    async fetchChats({ commit }) {
      try {
        const response = await fetch('http://localhost:5000/api/getChats');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();

        //console.log(data)

        commit('setChats', data); 

      } catch (error) {
        console.error(error);
      }
    },
    async sendMessage({ commit }, message) {
      try {
        const response = await fetch('http://localhost:5000/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        // Send the message and update the Vuex store
        const sentMessage = await response.json();
        commit('addMessage', sentMessage.message);

        // After sending the message, refetch the messages
        //dispatch('fetchMessages');
      } catch (error) {
        console.error(error);
      }
    },
    selectChat({commit}, chatId) {
      commit('selectedChat', chatId)
    }
  },
  getters: {
    // Getters to retrieve messages
    getMessages: (state) => state.messages,
    // Filter messages based on the selectedChatId
    getChats: (state) => state.chats,
    getSelectedChatId: (state) => state.selectedChatId
  },
};