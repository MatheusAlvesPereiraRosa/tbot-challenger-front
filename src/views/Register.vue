<template>
  <div class="flex flex-col min-w-[500px] bg-orange-500 p-[3.5rem] rounded-md">
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
      class="mt-6 p-5 text-xl font-bold rounded-lg text-white bg-fuchsia-950"
      @click="register"
    >
      Logar
    </button>
  </div>
</template>

<script setup>
  import { RouterLink, useRouter } from 'vue-router'
  import { ref } from 'vue'

  const username = ref('')
  const password = ref('')

  const router = useRouter()

  const register = async () => {
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

        alert(message)

        router.push('/auth/login')
      } else {
        const data = await response.json()
        const message = data.message
        console.error(`Register failed:${message}`)
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
