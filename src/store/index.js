import { createStore } from 'vuex'
import chat from '../store/modules/chat'

export default createStore({
  modules: {
    chat: chat,
  },
})
