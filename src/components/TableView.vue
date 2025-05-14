<template>
  <!-- TODO: изменить стили скролла в темной теме -->
  <div class="flex justify-center p-4 font-mono dark:text-white">
    <div class="w-full max-w-[600px] max-h-[600px] overflow-hidden bg-white dark:bg-black">
      <div class="overflow-y-auto h-full">
        <table class="w-full border-collapse table-fixed">
          <thead class="sticky top-0 dark:bg-gray-700 bg-gray-100 z-10">
          <tr>
            <th
                v-for="(header, key) in headers"
                :key="key"
                class="p-3 text-left cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-200"
                @click="sortTable(key)"
            >
              {{ header }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in visibleItems"
              :key="item.id"
              class="border-t dark:hover:bg-gray-900 hover:bg-gray-50
                     transform transition-transform duration-100 active:scale-95"
              @click="openModal(item)"
          >
            <td
                :title="item.id"
                class="p-3 truncate"
            >
              {{ item.id }}
            </td>
            <td
                :title="item.albumId"
                class="p-3 truncate"
            >
              {{ item.albumId }}
            </td>
            <td
                :title="item.title"
                class="p-3 truncate"
            >
              {{ item.title }}
            </td>
            <td
                :title="item.url"
                class="p-3 truncate"
            >
              {{ item.url }}
            </td>
            <td
                :title="item.thumbnailUrl"
                class="p-3 truncate"
            >
              {{ item.thumbnailUrl }}
            </td>
          </tr>
          <ModalView ref="modal"/>
          </tbody>
        </table>
        <div v-if="loading" class="p-4 text-center text-gray-500 dark:text-white">
          Загрузка...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue'
import ModalView from "@/components/ModalView.vue";

const props = defineProps({
  items: Array
})

const headers = {
  id: 'Ид',
  albumId: 'Альбом',
  title: 'Название',
  url: 'Ссылка',
  thumbnailUrl: 'Миниатюра'
}

const loading = ref(false)
const visibleCount = ref(30)
const sortKey = ref(null)
const sortDirection = ref(1) // 1 - asc, -1 - desc

const sortedItems = computed(() => {
  if (!sortKey.value) return props.items

  return [...props.items].sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) return -1 * sortDirection.value
    if (a[sortKey.value] > b[sortKey.value]) return 1 * sortDirection.value
    return 0
  })
})

const visibleItems = computed(() => {
  return sortedItems.value.slice(0, visibleCount.value)
})

const sortTable = (key) => {
  if (sortKey.value === key) {
    sortDirection.value *= -1
  } else {
    sortKey.value = key
    sortDirection.value = 1
  }
  visibleCount.value = 30
}

const handleScroll = (e) => {
  const {scrollTop, scrollHeight, clientHeight} = e.target
  const isBottom = scrollHeight - scrollTop <= clientHeight + 50

  if (isBottom && visibleCount.value < sortedItems.value.length && !loading.value) {
    loading.value = true
    setTimeout(() => {
      visibleCount.value += 30
      loading.value = false
    }, 300)
  }
}

const modal = ref(null)

const openModal = (photo) => {
  modal.value?.open(photo)
}

onMounted(() => {
  const tableContainer = document.querySelector('.overflow-y-auto')
  tableContainer?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  const tableContainer = document.querySelector('.overflow-y-auto')
  tableContainer?.removeEventListener('scroll', handleScroll)
})

</script>
<style scoped>
</style>