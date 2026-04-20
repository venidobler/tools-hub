<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex h-screen bg-gray-50 text-gray-800 font-sans">
    
    <aside class="w-64 bg-slate-800 text-white flex flex-col">
      <div class="p-6">
        <h1 class="text-2xl font-bold tracking-wider text-blue-400">Tools Hub</h1>
        <p class="text-sm text-slate-400 mt-1">Seu canivete suíço dev</p>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <RouterLink 
          to="/" 
          class="block px-4 py-3 rounded-lg transition-colors hover:bg-slate-700 active-link"
        >
          Formatador JSON
        </RouterLink>
      </nav>
    </aside>

    <main class="flex-1 p-8 overflow-y-auto">
      <div class="max-w-5xl mx-auto">
        <RouterView />
      </div>
    </main>

  </div>
</template>

<style scoped>
@reference "tailwindcss"; /* <-- Adicionamos esta linha para o Tailwind v4 */

.router-link-active {
  @apply bg-blue-600 text-white font-medium hover:bg-blue-500;
}
</style>