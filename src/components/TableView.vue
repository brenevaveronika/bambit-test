<template>

  <!-- TODO: имплементить темную тему -->
  <div class="flex justify-center p-4 font-mono">
    <div class="w-full max-w-[600px] max-h-[600px] overflow-hidden bg-white">
      <div class="overflow-y-auto h-full">
        <table class="w-full border-collapse">
          <thead class="sticky top-0 bg-gray-100 z-10">
          <tr>
            <th
                v-for="(header, key) in headers"
                :key="key"
                @click="sortTable(key)"
                class="p-3 text-left cursor-pointer hover:bg-gray-200"
            >
              {{ header }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in visibleItems"
              :key="item.id"
              class="border-t hover:bg-gray-50"
          >
            <td
                class="p-3 max-w-[150px] truncate"
                :title="item.id"
            >
              {{ item.id }}
            </td>
            <td
                class="p-3 max-w-[150px] truncate"
                :title="item.albumId"
            >
              {{ item.albumId }}
            </td>
            <td
                class="p-3 max-w-[150px] truncate"
                :title="item.title"
            >
              {{ item.title }}
            </td>
            <td
                class="p-3 max-w-[150px] truncate"
                :title="item.url"
            >
              {{ item.url }}
            </td>
            <td
                class="p-3 max-w-[150px] truncate"
                :title="item.thumbnailUrl"
            >
              {{ item.thumbnailUrl }}
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="loading" class="p-4 text-center text-gray-500">
          Загрузка...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
  const { scrollTop, scrollHeight, clientHeight } = e.target
  const isBottom = scrollHeight - scrollTop <= clientHeight + 50

  if (isBottom && visibleCount.value < sortedItems.value.length && !loading.value) {
    loading.value = true
    setTimeout(() => {
      visibleCount.value += 30
      loading.value = false
    }, 300)
  }
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