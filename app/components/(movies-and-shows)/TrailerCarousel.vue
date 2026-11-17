<template>
    <Trailer
        v-if="trailers[currentTrailerIndex]"
        :content-id="trailers[currentTrailerIndex]!.id"
        section-id="trailers-carousel"
        :is-carousel="true"
    >
        <Pagination
            :current-page="currentTrailerIndex + 1"
            :total-pages="trailers.length"
            @page-change="(page) => currentTrailerIndex = page - 1"
        />
    </Trailer>
</template>

<script setup lang="ts">
import useContentStore from '@/stores/content';
    const contentStore = useContentStore();
    const { trailers } = storeToRefs(contentStore);
    const currentTrailerIndex = ref(0);

    
</script>