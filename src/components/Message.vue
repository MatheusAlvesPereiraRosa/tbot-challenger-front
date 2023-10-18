<template>
  <div class="bg-white w-fit p-4 rounded-md mb-6" :class="{}">
    <p>{{ message.text }}</p>
  </div>
</template>

<script setup>

import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  message: {
    text: String,
    date: String,
    id: Number,
    isUserMessage: Boolean
  }
})

const { message } = toRefs(props)


</script>