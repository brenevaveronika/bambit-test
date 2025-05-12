<template>
  <header class="w-screen">
    <div class="container p-[50px] mx-auto flex flex-col md:flex-row gap-4 items-center font-mono">
      <div class="flex flex-1 flex-col md:flex-row gap-2 w-full">
        <!-- TODO: анимация скролла у placeholder на маленьких экранах -->
        <input
            v-model="albumIdsInput"
            placeholder="Введите ID альбомов (через пробел)"
            class="px-4 py-2 border focus:outline-none w-full"
        />
        <button
            @click="handleSearch"
            class="px-4 py-2 border "
        >
          Поиск
        </button>
      </div>
    </div>
  </header>
</template>


<script setup>
import {ref} from 'vue';
const albumIdsInput = ref('') // двусторонняя связка с вводом

const emit = defineEmits(['search']);

const handleSearch = () => {
  const ids = albumIdsInput.value
      .split(' ')
      .map(id => id.trim())
      .filter(id => id !== '');

  // валидация ввода
  // TODO: добавить параллельную валидацию с вводом + подсветка
  const isValid = ids.every(id => !isNaN(id));
  if (!isValid) alert('Введите только числа!');

  emit('search', ids);

}
</script>