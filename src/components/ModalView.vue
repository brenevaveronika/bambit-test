<script setup>
import {ref} from "vue";

const isOpen = ref(false);
const photo = ref(null);

// функция для перевода полей объекта photo
const formatKey = (key) => {
  const keysMap = {
    id: 'ID',
    albumId: 'ID альбома',
    title: 'Название',
    url: 'URL',
    thumbnailUrl: 'Миниатюра'
  }
  return keysMap[key] || key
}

const open = (photoData) => {
  photo.value = photoData;
  isOpen.value = true;
}

const close = () => {
  isOpen.value = false;
}

defineExpose({open, close})
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-bold dark:text-white">Детали фото</h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700 dark:hover:text-white text-2xl">
            &times;
          </button>
        </div>

        <div class="space-y-3">
          <div v-for="(value, key) in photo" :key="key" class="flex border-b pb-2 last:border-0">
            <span class="font-semibold text-gray-500 dark:text-gray-400 w-1/3 capitalize">{{ formatKey(key) }}:</span>
            <span class="dark:text-white break-all">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>