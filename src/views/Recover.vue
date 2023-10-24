<template>
  <div
    class="flex flex-col min-w-[500px] max-[650px]: bg-orange-500 p-[3.5rem] rounded-md"
  >
    <p class="text-xl mb-6 font-bold text-purple-950">
      Digite o nome do usuário que você quer recuperar a senha abaixo
    </p>

    <div v-if="token !== ''" class="mb-4 flex flex-col">
      <label for="username" class="text-xl mb-2 text-purple-950">Nova senha</label>
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
      Esqueceu sua senha?
    </RouterLink>

    <button
      v-if="token !== ''"
      class="mt-6 p-5 text-xl font-bold rounded-lg text-center text-white bg-fuchsia-950"
      @click="change"
    >
      Mudar senha
  </button>

    <button
      v-else
      class="mt-6 p-5 text-xl font-bold rounded-lg text-center text-white bg-fuchsia-950"
      @click="recover"
    >
      Pedir token de recuperação
    </button>
  </div>
</template>

<script setup>
  import { RouterLink, useRouter } from 'vue-router'
  import { ref } from 'vue'

  const username = ref('')
  const password = ref('')
  const token = ref('')

  const router = useRouter()

  const recover = async () => {
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
      } else {
        const data = await response.json()
        const message = data.message
        console.error(`Recover failed: ${message}`)
      }
    } catch (error) {
      // Erro de requisição ou erros do servidor
      console.error('Error during login:', error)
    }
  }

  const change = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password.value,
          token: token.value
        }),
      })

      if (response.status === 200) {
        const data = await response.json()
        const message = data.message

        alert(message)

        router.push('/auth/login')
      } else {
        const data = await response.json()
        const message = data.message
        console.error(`Recover failed: ${message}`)
      }
    } catch (error) {
      // Erro de requisição ou erros do servidor
      console.error('Error during login:', error)
    }
  }
</script>

<style scoped>
  input:focus-visible {
    outline: none;
  }
</style>
