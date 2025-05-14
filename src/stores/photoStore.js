import {defineStore} from "pinia";
import {onMounted, ref} from "vue";

export const usePhotoStore = defineStore('photos', () => {
    const photos = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const savedAlbums = ref([]);

    onMounted(() => {
        loadInitialData();
    });

    const loadInitialData = async () => {
        const saved = localStorage.getItem('selectedAlbums');
        savedAlbums.value = saved ? JSON.parse(saved) : [];

        if (savedAlbums.value.length > 0) {
            await fetchPhotos(savedAlbums.value);
        } else {
            await fetchPhotos();
        }
    };

    const fetchPhotos = async (albumIds = []) => {
        loading.value = true;
        try {
            let url = 'https://jsonplaceholder.typicode.com/photos';
            if (albumIds.length > 0) {
                const params = albumIds.map(id => `albumId=${id}`).join('&')
                url += `?${params}`
            }
            const response = await fetch(url);
            photos.value = await response.json();
        } catch (error) {
            error.value = error;
        } finally {
            loading.value = false;
        }
    }
    const saveAlbums = (albumIds) => {
        savedAlbums.value = albumIds;
        localStorage.setItem('selectedAlbums', JSON.stringify(albumIds));
    };
    return { photos, loading, error, fetchPhotos, loadInitialData, saveAlbums }
})