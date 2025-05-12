<script setup>
// import {ref} from 'vue';
import { onMounted } from 'vue'
import { usePhotoStore} from "@/stores/photoStore.js";
import Header from "@/components/Header.vue";
import TableView from "@/components/TableView.vue";

const photoStore = usePhotoStore()

onMounted(() => {
  photoStore.fetchPhotos()
})

const handleSearch = (albumIds) => {
  photoStore.fetchPhotos(albumIds)
}
</script>

<template>
  <Header @search="handleSearch" />
  <TableView v-if="!photoStore.loading && photoStore.photos.length" :items="photoStore.photos" />
  <div v-if="photoStore.loading" class="text-center py-8">
    Загрузка данных...
  </div>
  <div v-if="photoStore.error" class="text-red-500 text-center py-8">
    Ошибка: {{ photoStore.error }}
  </div>
</template>

<style scoped>
</style>
