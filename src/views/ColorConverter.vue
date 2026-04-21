<script setup>
import { ref, computed } from 'vue'

const hexInput = ref('#3b82f6')

const isValidHex = computed(() => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hexInput.value)
})

const rgbColor = computed(() => {
  if (!isValidHex.value) return 'Formato inválido'
  
  let hex = hexInput.value.replace('#', '')
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('')
  }
  
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  return `rgb(${r}, ${g}, ${b})`
})

const copyColor = (colorString) => {
  if (colorString && isValidHex.value) {
    navigator.clipboard.writeText(colorString)
    alert(`Copiado: ${colorString}`)
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 h-[calc(100vh-8rem)]">
    <div>
      <h2 class="text-2xl font-bold text-slate-800">Conversor de Cores</h2>
      <p class="text-slate-500 text-sm mt-1">Converta códigos HEX para RGB em tempo real.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <label class="font-semibold text-slate-700 text-sm">Código HEX</label>
          <input 
            v-model="hexInput"
            type="text"
            maxlength="7"
            class="p-4 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 font-mono text-lg uppercase outline-none shadow-sm transition-all"
            :class="{'border-red-400 focus:ring-red-400': !isValidHex}"
            placeholder="#000000"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-semibold text-slate-700 text-sm">Resultado RGB</label>
          <div class="flex gap-2">
            <input 
              :value="rgbColor"
              readonly
              type="text"
              class="flex-1 p-4 border border-slate-200 rounded-xl bg-slate-50 font-mono text-lg outline-none shadow-sm text-slate-600"
            />
            <button 
              @click="copyColor(rgbColor)"
              :disabled="!isValidHex"
              class="px-6 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              Copiar
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-semibold text-slate-700 text-sm">Preview da Cor</label>
        <div 
          class="flex-1 rounded-2xl shadow-inner border border-slate-200 min-h-[200px] transition-colors duration-300"
          :style="{ backgroundColor: isValidHex ? hexInput : '#f8fafc' }"
        >
        </div>
      </div>
    </div>
  </div>
</template>