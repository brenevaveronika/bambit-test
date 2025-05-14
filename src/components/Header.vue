<template>
  <header class="w-full bg-white dark:bg-black dark:text-white">
    <div class="container px-[50px] py-[20px] mx-auto flex flex-col md:flex-row gap-4 items-center font-mono">
      <h1 class="text-2xl font-bold whitespace-nowrap mr-4">
        Photo<span class="text-blue-600">Finder</span>
      </h1>
      <div class="flex flex-1 flex-col md:flex-row gap-2 w-full relative">
        <input
            v-model="albumIdsInput"
            @input="validateInput($event.target.value)"
            placeholder="Введите ID альбомов (через пробел)"
            class="px-4 py-2 border focus:outline-none w-full"
            :class="{
      'border-red-500': !isInputValid,
      'border-black dark:border-white': isInputValid
    }"
        />
        <!-- сообщение об ошибке ввода Id -->
        <transition name="fade">
          <div
              v-if="inputError"
              class="absolute top-full mt-1 text-red-500 text-sm dark:text-red-400"
          >
            {{ inputError }}
          </div>
        </transition>
        <button
            @click="handleSearch"
            class="px-4 py-2 border  transition-all duration-300
                hover:bg-blue-600 hover:shadow-lg
                active:bg-blue-700 active:shadow-inner
                  transform hover:-translate-y-0.5"
        >
          Поиск
        </button>
      </div>
    </div>

  </header>
</template>


<script setup>
import {ref, onMounted} from 'vue';
const albumIdsInput = ref(''); // двусторонняя связка с вводом

// переменные для валидации инпута
const inputError = ref(null);
const isInputValid = ref(true);

const validateInput = (value) => {
  if (!value.trim()) {
    inputError.value = null
    isInputValid.value = true
    return true
  }
  const ids = value.split(' ').filter(id => id.trim())
  const invalidIds = ids.filter(id => !/^\d+$/.test(id))
  if (invalidIds.length > 0) {
    inputError.value = `Некорректные ID: ${invalidIds.join(', ')}. Пример: 1 2 3`
    isInputValid.value = false
    return false
  }
  inputError.value = null
  isInputValid.value = true
  return true
}

onMounted(() => {
  const savedAlbums = localStorage.getItem('selectedAlbums')
  if (savedAlbums) {
    albumIdsInput.value = JSON.parse(savedAlbums).join(' ')
  }
})

const emit = defineEmits(['search']);

const handleSearch = () => {
  if (!validateInput(albumIdsInput.value)) {
    return
  }
  const ids = albumIdsInput.value
      .split(' ')
      .map(id => id.trim())
      .filter(id => id !== '')

  emit('search', ids)

}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>