<script setup>
import { ref, watch } from 'vue'

// 1. Estado Reativo: Variáveis que o Vue vai monitorar
const inputJson = ref('')
const outputJson = ref('')
const errorMessage = ref('')

// 2. Watcher: Fica "olhando" para o inputJson. Sempre que você digitar algo, ele roda.
watch(inputJson, (newValue) => {
  // Se o campo estiver vazio, limpamos tudo
  if (!newValue.trim()) {
    outputJson.value = ''
    errorMessage.value = ''
    return
  }

  try {
    // Tenta converter o texto digitado em um objeto JavaScript real
    const parsed = JSON.parse(newValue)
    
    // Se deu certo, converte de volta para texto, mas com indentação de 2 espaços
    outputJson.value = JSON.stringify(parsed, null, 2)
    errorMessage.value = '' // Limpa qualquer erro anterior
    
  } catch (error) {
    // Se o JSON estiver quebrado (ex: faltando uma aspa), o parse falha e cai aqui
    outputJson.value = ''
    errorMessage.value = error.message
  }
})

// 3. Função para copiar o resultado
const copyToClipboard = () => {
  if (outputJson.value) {
    navigator.clipboard.writeText(outputJson.value)
    // Um alerta simples por enquanto (depois podemos criar um Toast bonitão)
    alert('JSON copiado com sucesso!') 
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 h-[calc(100vh-8rem)]">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Formatador e Validador JSON</h2>
        <p class="text-slate-500 text-sm mt-1">Cole seu código cru para formatar e validar a sintaxe.</p>
      </div>
      
      <button 
        @click="copyToClipboard"
        :disabled="!outputJson"
        class="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Copiar Resultado
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
      
      <div class="flex flex-col gap-2 h-full">
        <label class="font-semibold text-slate-700 text-sm">JSON Original</label>
        <textarea 
          v-model="inputJson"
          class="flex-1 p-4 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none outline-none shadow-sm"
          placeholder='{"cole": "aqui"}'
        ></textarea>
      </div>

      <div class="flex flex-col gap-2 h-full">
        <label class="font-semibold text-slate-700 text-sm">Resultado Formatado</label>
        
        <div 
          v-if="errorMessage" 
          class="flex-1 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-mono text-sm overflow-auto shadow-sm"
        >
          <p class="font-bold mb-2">❌ Erro de Sintaxe:</p>
          {{ errorMessage }}
        </div>

        <pre 
          v-else 
          class="flex-1 p-4 bg-slate-900 text-green-400 rounded-xl font-mono text-sm overflow-auto shadow-sm"
        >
          <code v-if="outputJson">{{ outputJson }}</code>
          <span v-else class="text-slate-500">Aguardando código válido...</span>
        </pre>
      </div>

    </div>
  </div>
</template>