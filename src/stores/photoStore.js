import {defineStore} from "pinia";
import {ref} from "vue";

export const usePhotoStore = defineStore('photos', () => {
    const photos = ref([]);
    const loading = ref(false);
    const error = ref(null);


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
    return { photos, loading, error, fetchPhotos }
})