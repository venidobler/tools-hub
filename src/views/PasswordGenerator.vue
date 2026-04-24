<script setup>
import { ref, watch } from 'vue'

const length = ref(16)
const includeNumbers = ref(true)
const includeSymbols = ref(true)
const password = ref('')

const generatePassword = () => {
  const charset = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
  }
  
  let allChars = charset.upper + charset.lower
  if (includeNumbers.value) allChars += charset.numbers
  if (includeSymbols.value) allChars += charset.symbols
  
  let generated = ''
  for (let i = 0; i < length.value; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length)
    generated += allChars[randomIndex]
  }
  password.value = generated
}

// Gera uma senha assim que carregar ou mudar alguma opção
watch([length, includeNumbers, includeSymbols], generatePassword, { immediate: true })

const copyPassword = () => {
  navigator.clipboard.writeText(password.value)
  alert('Senha copiada!')
}
</script>

<template>
  <div class="flex flex-col gap-6 h-[calc(100vh-8rem)]">
    <div>
      <h2 class="text-2xl font-bold text-slate-800">Gerador de Senhas</h2>
      <p class="text-slate-500 text-sm mt-1">Crie senhas aleatórias e seguras.</p>
    </div>

    <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-lg">
      <div class="mb-8 p-4 bg-slate-900 rounded-lg flex justify-between items-center">
        <span class="text-green-400 font-mono text-xl">{{ password }}</span>
        <button @click="copyPassword" class="text-slate-400 hover:text-white">Copiar</button>
      </div>

      <div class="space-y-6">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-slate-700">Tamanho: {{ length }}</label>
          <input v-model="length" type="range" min="8" max="32" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
        </div>

        <div class="flex flex-col gap-3">
          <label class="flex items-center gap-2 text-slate-700 cursor-pointer">
            <input type="checkbox" v-model="includeNumbers" class="w-4 h-4"> Incluir Números
          </label>
          <label class="flex items-center gap-2 text-slate-700 cursor-pointer">
            <input type="checkbox" v-model="includeSymbols" class="w-4 h-4"> Incluir Símbolos
          </label>
        </div>
      </div>
    </div>
  </div>
</template>