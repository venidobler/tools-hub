<script setup>
import { ref, computed } from 'vue'

const text = ref('')

const stats = computed(() => {
  const content = text.value
  return {
    chars: content.length,
    words: content.trim() ? content.trim().split(/\s+/).length : 0,
    lines: content ? content.split('\n').length : 0,
    noSpaces: content.replace(/\s/g, '').length
  }
})

const clearText = () => text.value = ''
</script>

<template>
  <div class="flex flex-col gap-6 h-[calc(100vh-8rem)]">
    <div class="flex justify-between items-end">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Analisador de Texto</h2>
        <p class="text-slate-500 text-sm mt-1">Conte palavras, caracteres e linhas em tempo real.</p>
      </div>
      <button @click="clearText" class="text-sm text-red-600 hover:underline font-medium">
        Limpar texto
      </button>
    </div>

    <!-- Cards de Estatísticas -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Palavras</p>
        <p class="text-2xl font-mono font-bold text-blue-600">{{ stats.words }}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Caracteres</p>
        <p class="text-2xl font-mono font-bold text-blue-600">{{ stats.chars }}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Sem espaços</p>
        <p class="text-2xl font-mono font-bold text-blue-600">{{ stats.noSpaces }}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Linhas</p>
        <p class="text-2xl font-mono font-bold text-blue-600">{{ stats.lines }}</p>
      </div>
    </div>

    <!-- Editor -->
    <div class="flex-1 min-h-0">
      <textarea 
        v-model="text"
        class="w-full h-full p-6 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-inner resize-none text-lg text-slate-700"
        placeholder="Cole ou digite seu texto aqui..."
      ></textarea>
    </div>
  </div>
</template>