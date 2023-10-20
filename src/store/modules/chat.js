export default {
  state: {
    messages: [], //
  },
  mutations: {
    // Mutations to update the messages state
    addMessage(state, message) {
      state.messages.unshift(message);
      console.log(state)
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
  },
  actions: {
    // Actions to interact with messages
    async fetchMessages({ commit }) {
      try {
        const response = await fetch('http://localhost:5000/api/getHistory');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        commit('setMessages', data); // Set the fetched messages in the store
      } catch (error) {
        console.error(error);
      }
    },
    async sendMessage({ commit, dispatch }, message) {
      try {
        // Simulate a response from the server
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
        dispatch('fetchMessages');
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    // Getters to retrieve messages
    getMessages: (state) => state.messages,
  },
};