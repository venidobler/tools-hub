<script setup>
import { ref, watch } from 'vue'

const timestamp = ref(Math.floor(Date.now() / 1000))
const dateString = ref(new Date().toISOString())

// De Timestamp para Data
watch(timestamp, (newVal) => {
  if (newVal) {
    const date = new Date(newVal * 1000)
    dateString.value = date.toISOString()
  }
})

// De Data para Timestamp
watch(dateString, (newVal) => {
  const date = new Date(newVal)
  if (!isNaN(date.getTime())) {
    timestamp.value = Math.floor(date.getTime() / 1000)
  }
})

const updateToNow = () => {
  timestamp.value = Math.floor(Date.now() / 1000)
  dateString.value = new Date().toISOString()
}
</script>

<template>
  <div class="flex flex-col gap-6 h-[calc(100vh-8rem)]">
    <div>
      <h2 class="text-2xl font-bold text-slate-800">Unix Timestamp Converter</h2>
      <p class="text-slate-500 text-sm mt-1">Converta entre Epoch (segundos) e ISO 8601.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex flex-col gap-2">
        <label class="font-semibold text-slate-700 text-sm">Timestamp (Unix Epoch)</label>
        <input v-model.number="timestamp" type="number" class="p-4 border rounded-xl font-mono">
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-semibold text-slate-700 text-sm">Data/Hora (ISO 8601)</label>
        <input v-model="dateString" type="text" class="p-4 border rounded-xl font-mono">
      </div>
    </div>

    <button @click="updateToNow" class="mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      Atualizar para o Tempo Atual
    </button>
  </div>
</template>