<script setup>
import { ref } from 'vue'

const rawText = ref('')
const base64Text = ref('')

// Codifica: Texto -> Base64
const encode = () => {
  try {
    const bytes = new TextEncoder().encode(rawText.value)
    const binString = String.fromCodePoint(...bytes)
    base64Text.value = btoa(binString)
  } catch (e) {
    base64Text.value = "Erro na codificação"
  }
}

// Decodifica: Base64 -> Texto
const decode = () => {
  try {
    const binString = atob(base64Text.value)
    const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0))
    rawText.value = new TextDecoder().decode(bytes)
  } catch (e) {
    rawText.value = "Erro: Base64 inválido"
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 h-[calc(100vh-8rem)]">
    <div>
      <h2 class="text-2xl font-bold text-slate-800">Base64 Encoder/Decoder</h2>
      <p class="text-slate-500 text-sm mt-1">Converta textos para Base64 e vice-versa.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
      
      <div class="flex flex-col gap-2 h-full">
        <label class="font-semibold text-slate-700 text-sm">Texto Original</label>
        <textarea 
          v-model="rawText"
          @input="encode"
          class="flex-1 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none outline-none"
          placeholder="Digite o texto aqui..."
        ></textarea>
      </div>

      <div class="flex flex-col gap-2 h-full">
        <label class="font-semibold text-slate-700 text-sm">Base64</label>
        <textarea 
          v-model="base64Text"
          @input="decode"
          class="flex-1 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none outline-none bg-slate-50"
          placeholder="Cole a string Base64 aqui..."
        ></textarea>
      </div>

    </div>
  </div>
</template>