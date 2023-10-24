<template>
  <div class="flex flex-col min-w-[500px] bg-orange-500 p-[3.5rem] rounded-md">
    <div
      v-if="password.value !== ''"
      class="text-xl text-center mb-5 font-bold text-rose-900"
    >
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

    <RouterLink to="/auth/login" class="text-sm text-right text-purple-950">
      Já tem uma conta?
    </RouterLink>

    <button
      class="flex justify-center mt-6 p-5 text-xl font-bold rounded-lg text-white bg-fuchsia-950"
      @click="register"
    >
      <span v-if="!loading">Registrar</span>
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
  const loading = ref(false) // Propriedade para mostrar loader
  const error = ref('') // Tratamento de error

  const router = useRouter()

  const register = async () => {
    error.value = ''
    loading.value = true

    if (!username.value || username.value === '') {
      error.value = 'Nome de usuário não informado'
      loading.value = false
      return
    }

    if (!password.value || password.value === '') {
      error.value = 'Senha não informada'
      loading.value = false
      return
    }

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
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
        const message = data.message

        loading.value = false

        alert(message)

        router.push('/auth/login')
      } else {
        const data = await response.json()
        error.value = data.message
        loading.value = false
        console.error(`Register failed:${error.value}`)
      }
    } catch (error) {
      // Erro de requisição ou erros do servidor
      loading.value = false
      error.value = `Erro ao realizar requisição: ${error}`
    }
  }
</script>

<style scoped>
  input:focus-visible {
    outline: none;
  }
</style>
