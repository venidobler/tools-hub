<script setup>
import { ref, watch } from 'vue'
import QRCode from 'qrcode'

const text = ref('https://vuejs.org')
const qrDataUrl = ref('')

// Gera o QR Code sempre que o texto mudar
const generateQR = async () => {
  try {
    qrDataUrl.value = await QRCode.toDataURL(text.value, { width: 300, margin: 2 })
  } catch (err) {
    console.error(err)
  }
}

// Gera assim que carregar
watch(text, generateQR, { immediate: true })
</script>

<template>
  <div class="flex flex-col gap-6 h-[calc(100vh-8rem)]">
    <div>
      <h2 class="text-2xl font-bold text-slate-800">Gerador de QR Code</h2>
      <p class="text-slate-500 text-sm mt-1">Transforme links ou textos em QR Codes instantaneamente.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div class="flex flex-col gap-4">
        <textarea 
          v-model="text"
          class="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32"
          placeholder="Digite o texto ou URL..."
        ></textarea>
      </div>

      <div class="flex justify-center items-center bg-slate-100 p-6 rounded-2xl min-h-[300px]">
        <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR Code" class="shadow-lg rounded-lg" />
        <p v-else class="text-slate-400">Digite algo para gerar o QR Code</p>
      </div>
    </div>
  </div>
</template>