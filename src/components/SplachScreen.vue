<script setup>
import {onMounted, ref} from 'vue';

const show = ref(true);
onMounted(() => {
  setTimeout(() => {
    show.value = false;
  }, 3000)
})
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="font-mono fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black">
      <div class="text-center animate-bounce">
        <h1 class="text-5xl font-bold text-black dark:text-white mb-2">PhotoSearch</h1>
        <p class="text-gray-500 dark:text-gray-400">made by @brenevaveronika</p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-leave-to {
  opacity: 0;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>