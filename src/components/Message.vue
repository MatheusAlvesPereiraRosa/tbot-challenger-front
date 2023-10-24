<template>
  <div>
    <p class="text-violet-950">{{ message.text }}</p>

    <p class="text-[0.65rem] text-violet-950 ml-auto mt-1">
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
