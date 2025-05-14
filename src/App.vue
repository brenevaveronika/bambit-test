<script setup>
import {usePhotoStore} from "@/stores/photoStore.js";
import Header from "@/components/Header.vue";
import TableView from "@/components/TableView.vue";
import FloatingButton from "@/components/FloatingButton.vue";

const photoStore = usePhotoStore();

const handleSearch = (albumIds) => {
  photoStore.saveAlbums(albumIds);
  photoStore.fetchPhotos(albumIds);
}
</script>
<template>
  <body class="dark:bg-black dark:bg-scroll-gray-700 min-h-dvh">
  <FloatingButton/>
  <Header @search="handleSearch"/>
  <TableView v-if="!photoStore.loading && photoStore.photos.length" :items="photoStore.photos"/>
  <div v-if="photoStore.loading" class="text-center py-8 dark:text-white">
    Загрузка данных...
  </div>
  <div v-if="photoStore.error" class="text-red-500 text-center py-8">
    Ошибка: {{ photoStore.error }}
  </div>
  </body>
</template>

<style scoped>
</style>
