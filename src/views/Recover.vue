<template>
  <div
    class="flex flex-col min-w-[500px] max-[650px]: bg-orange-500 p-[3.5rem] rounded-md"
  >
    <div
      v-if="password.value !== ''"
      class="text-xl text-center mb-5 font-bold text-rose-900"
    >
      {{ error }}
    </div>
    <p class="text-xl mb-6 font-bold text-purple-950">
      Digite o nome do usuário que você quer recuperar a senha abaixo
    </p>

    <div v-if="token !== ''" class="mb-4 flex flex-col">
      <label for="username" class="text-xl mb-2 text-purple-950"
        >Nova senha</label
      >
      <input
        v-model="password"
        name="password"
        class="text-[1.15rem] rounded-md p-2 bg-orange-100 text-violet-950 no-outline"
        type="text"
        placeholder="Digite sua nova senha"
      />
    </div>

    <div v-else class="mb-4 flex flex-col">
      <label for="username" class="text-xl mb-2 text-purple-950">Usuário</label>
      <input
        v-model="username"
        name="username"
        class="text-[1.15rem] rounded-md p-2 bg-orange-100 text-violet-950 no-outline"
        type="text"
        placeholder="Digite seu usuário"
      />
    </div>

    <RouterLink to="/" class="text-sm text-right text-purple-950">
      Voltar ao login?
    </RouterLink>

    <button
      v-if="token !== ''"
      class="mt-6 p-5 text-xl font-bold rounded-lg text-center text-white bg-fuchsia-950"
      @click="change"
    >
      <span v-if="!loading">Mudar senha</span>
      <Loader v-else />
    </button>

    <button
      v-else
      class="flex justify-center mt-6 p-5 text-xl font-bold rounded-lg text-white bg-fuchsia-950"
      @click="recover"
    >
      <span v-if="!loading">Solicitar mudança de senha</span>
      <Loader v-else />
    </button>
  </div>
</template>

<script setup>
  import { RouterLink, useRouter } from 'vue-router'
  import { ref } from 'vue'
  import Loader from '../components/Loader.vue'

  const username = ref('')
  const password = ref('')
  const token = ref('')
  const loading = ref(false) // Propriedade para mostrar loader
  const error = ref('') // Tratamento de error

  const router = useRouter()

  const recover = async () => {
    loading.value = true

    if (!username.value || username.value === '') {
      error.value = 'Nome de usuário não informado'
      loading.value = false
      return
    }

    try {
      const response = await fetch('http://localhost:5000/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
        }),
      })

      if (response.status === 200) {
        const data = await response.json()
        token.value = data.token
        loading.value = false
      } else {
        const data = await response.json()
        error.value = data.message
        loading.value = false
        console.error(`Recover failed: ${error.value}`)
      }
    } catch (error) {
      // Erro de requisição ou erros do servidor
      loading.value = false
      error.value = `Erro ao realizar requisição: ${error}`
    }
  }

  const change = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/auth/changePassword',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: password.value,
            token: token.value,
          }),
        },
      )

      if (response.status === 200) {
        const data = await response.json()
        const message = data.message

        alert(message)

        router.push('/auth/login')
      } else {
        const data = await response.json()
        error.value = data.message
        console.error(`Recover failed: ${error.value}`)
      }
    } catch (error) {
      // Erro de requisição ou erros do servidor
      error.value = error
      console.error('Error during login:', error)
    }
  }
</script>

<style scoped>
  input:focus-visible {
    outline: none;
  }
</style>
