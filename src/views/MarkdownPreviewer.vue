<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const markdownText = ref('# Olá Mundo!\n\nEste é o seu **Tools Hub**.\n\n* Item 1\n* Item 2')

const renderedHtml = computed(() => {
  // 1. Converte Markdown para HTML
  const rawHtml = marked.parse(markdownText.value)
  // 2. Limpa o HTML para evitar XSS
  return DOMPurify.sanitize(rawHtml)
})
</script>

<template>
  <div class="flex flex-col gap-6 h-[calc(100vh-8rem)]">
    <div>
      <h2 class="text-2xl font-bold text-slate-800">Markdown Previewer</h2>
      <p class="text-slate-500 text-sm mt-1">Escreva em Markdown e veja o resultado formatado.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
      <!-- Editor -->
      <div class="flex flex-col gap-2 h-full">
        <label class="font-semibold text-slate-700 text-sm">Editor Markdown</label>
        <textarea 
          v-model="markdownText"
          class="flex-1 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none outline-none shadow-sm"
          placeholder="# Título..."
        ></textarea>
      </div>

      <!-- Preview -->
      <div class="flex flex-col gap-2 h-full">
        <label class="font-semibold text-slate-700 text-sm">Preview</label>
        <div 
          class="flex-1 p-6 bg-white border border-slate-200 rounded-xl overflow-auto shadow-sm prose prose-slate max-w-none"
          v-html="renderedHtml"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss"; /* Adicionando a referência obrigatória do v4 */

/* Estilização básica para o conteúdo renderizado */
.prose :deep(h1) { @apply text-3xl font-bold mb-4 text-slate-800; }
.prose :deep(h2) { @apply text-2xl font-bold mb-3 mt-4 text-slate-700; }
.prose :deep(p) { @apply mb-3 text-slate-600; }
.prose :deep(ul) { @apply list-disc ml-5 mb-3 text-slate-600; }
.prose :deep(strong) { @apply font-bold text-slate-900; }
</style>