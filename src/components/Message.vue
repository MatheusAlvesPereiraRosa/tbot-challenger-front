<template>
  <div>
    <p>{{ message.text }}</p>

    <p class="text-[0.65rem] text-gray-500 ml-auto mt-1">
      {{ message.timestamp }}
    </p>
  </div>
</template>

<script setup>
  import { toRefs } from 'vue'

  const props = defineProps({
    message: {
      text: String,
      date: String,
      id: Number,
      isUserMessage: Boolean,
    },
  })

  const { message } = toRefs(props)
</script>
