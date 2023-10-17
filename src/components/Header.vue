<template>
  <header>
    <nav class="bg-orange-500 px-2 flex justify-between items-center">
      <RouterLink to="/" class="p-2 text-2xl text-purple-950 hover:text-white">
        Exemplo
      </RouterLink>
      <ul class="flex items-center">
        <li
          class="p-5 hover:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:cursor-pointer duration-300"
        >
          <RouterLink to="/cart"> Placeholder </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
  import { RouterLink } from 'vue-router'
</script>

<style scoped></style>
