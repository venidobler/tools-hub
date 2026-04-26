<script setup>
import { ref, computed } from 'vue'

const textInput = ref('')

const slug = computed(() => {
  return textInput.value
    .toString()
    .normalize('NFD') // Normaliza para decompor acentos
    .replace(/[\u0300-\u036f]/g, '') // Remove marcas de acento
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Espaços viram hífens
    .replace(/[^\w-]+/g, '') // Remove caracteres especiais
    .replace(/--+/g, '-') // Remove hífens duplicados
})

const copySlug = () => {
  navigator.clipboard.writeText(slug.value)
  alert('Slug copiado!')
}
</script>

<template>
  <div class="flex flex-col gap-6 h-[calc(100vh-8rem)]">
    <div>
      <h2 class="text-2xl font-bold text-slate-800">Gerador de Slug</h2>
      <p class="text-slate-500 text-sm mt-1">Transforme títulos em URLs amigáveis.</p>
    </div>

    <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
      <div class="flex flex-col gap-4">
        <input 
          v-model="textInput" 
          type="text" 
          class="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Digite seu título aqui..."
        />

        <div class="p-4 bg-slate-100 rounded-xl font-mono text-slate-700 flex justify-between items-center">
          <span>{{ slug || 'slug-aqui' }}</span>
          <button 
            @click="copySlug" 
            :disabled="!slug"
            class="text-blue-600 font-medium hover:text-blue-800 disabled:opacity-50"
          >
            Copiar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>