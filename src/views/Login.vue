<template>
  <div class="flex flex-col min-w-[500px] bg-orange-500 p-[3.5rem] rounded-md">
    <div v-if="password.value !== ''" class="text-xl text-center mb-5 font-bold text-rose-900">
      {{ error }}
    </div>
    <div class="mb-4 flex flex-col">
      <label for="username" class="text-xl mb-2 text-purple-950">Usuário</label>
      <input
        v-model="username"
        name="username"
        class="text-[1.15rem] rounded-md p-2 bg-orange-100 text-violet-950 no-outline"
        type="text"
        placeholder="Digite seu usuário"
      />
    </div>

    <div class="mb-4 flex flex-col">
      <label for="password" class="text-xl mb-2 text-purple-950">Senha</label>
      <input
        v-model="password"
        name="password"
        class="text-[1.15rem] rounded-md p-2 bg-orange-100 text-violet-950 no-outline"
        type="password"
        placeholder="Digite sua senha"
      />
    </div>

    <div class="flex justify-between">
      <RouterLink to="/auth/register" class="text-sm text-purple-950">
        Não tem uma conta?
      </RouterLink>
      <RouterLink to="/auth/recover" class="text-sm text-purple-950">
        Esqueceu sua senha?
      </RouterLink>
    </div>

    <button
      class="flex justify-center mt-6 p-5 text-xl font-bold rounded-lg text-white bg-fuchsia-950"
      @click="login"
    >
      <span v-if="!loading">Logar</span>
      <Loader v-else />
    </button>
  </div>
</template>

<script setup>
  import { RouterLink, useRouter } from 'vue-router'
  import { ref } from 'vue'
  import Loader from '../components/Loader.vue'

  const router = useRouter()

  const username = ref('')
  const password = ref('')
  const loading = ref(false) // Propriedade para mostrar loader
  const error = ref('') // Tratamento de error

  const login = async () => {
    loading.value = true

    error.value = ''

    if (!username.value || username.value === '' ) {
      loading.value = false

      error.value = "Nome de usuário não informado"
      return
    }

    if (!password.value || password.value === '') {
      loading.value = false

      error.value = "Senha não informada"
      return
    }

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      })

      if (response.status === 200) {
        const data = await response.json()
        const token = data.token

        loading.value = false

        // Salvando o token como um cookie
        document.cookie = `token=${token}; path=/; max-age=3600`

        // Redirecionando usuário para a página de mensagens
        router.push('/home')
      } else {
        // Lidando com erro de login
        loading.value = false
        const data = await response.json()
        error.value = data.message
        //console.error('Usuário inexistente')
      }
    } catch (error) {
      // Erro de requisição ou erros do servidor
      loading.value = false
      error.value = `Erro ao realizar requisição: ${error}`
      //console.error('Erro ao realizar requisição:', error)
    }
  }
</script>

<style scoped>
  input:focus-visible {
    outline: none;
  }
</style>
