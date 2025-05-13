<template>
  <button class="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg
           bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500
           transition-all duration-300 transform hover:scale-110
           focus:outline-none focus:ring-1 focus:ring-black-500"
          @click="toggleTheme"
          aria-label="Переключить тему">

    <!-- смена исконок луны и солнца -->
    <transition name="fade" mode="out-in">
      <MoonIcon v-if="!isDark" class="w-6 h-6 text-gray-700" />
      <SunIcon v-else class="w-6 h-6 text-yellow-300" />
    </transition>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MoonIcon from "@/components/icons/MoonIcon.vue";
import SunIcon from "@/components/icons/SunIcon.vue";

const isDark = ref(false)

onMounted(() => {
  if (localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    enableDarkMode()
  }
})
const toggleTheme = () => {
  isDark.value ? disableDarkMode() : enableDarkMode()
}

const enableDarkMode = () => {
  document.documentElement.classList.add('dark')
  localStorage.theme = 'dark'
  isDark.value = true
  console.log(localStorage.theme)
}

const disableDarkMode = () => {
  document.documentElement.classList.remove('dark')
  localStorage.theme = 'light'
  isDark.value = false
  console.log(localStorage.theme)
}
</script>

<style scoped>
</style>