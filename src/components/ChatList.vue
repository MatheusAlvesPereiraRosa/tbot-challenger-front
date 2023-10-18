<template>
  <aside class="bg-orange-100 w-3/12 min-h-screen border-r border-gray-300 p-4">
    <div class="text-xl font-bold mb-4 text-purple-800">Contacts</div>
    <ul>
      <li
        v-for="contact in contacts"
        :key="contact.id"
        class="flex items-center mb-2 cursor-pointer"
      >
        <img
          :src="contact.avatar"
          alt="Contact Avatar"
          class="w-10 h-10 rounded-full mr-2"
        />
        <div class="flex-1">{{ contact.name }}</div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
  import { ref } from 'vue'

  const contacts = ref([
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://example.com/avatar1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar2.jpg',
    },
    // Add more contacts as needed
  ])
</script>

<style scoped>
  /* Add Tailwind CSS classes or your custom styles here */
</style>
