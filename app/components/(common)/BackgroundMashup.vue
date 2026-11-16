<template>
    <div class="background-mashup">
        <img v-for="image in backgroundImages" :key="image" :src="image" alt="Background">
        <slot />
    </div>
</template>

<script setup lang="ts">
    import useContentStore from '@/stores/content';
import { storeToRefs } from 'pinia';

    const props = withDefaults(defineProps<{
        numberOfBackgrounds?: number;
    }>(), {
        numberOfBackgrounds: 36
    });
    const { content } = storeToRefs(useContentStore());
    
    const { data: backgroundImages } = await useAsyncData('content-posters', async () => {
        const images: string[] = [];
        const contentImages = Object.values(content.value).map(item => item.poster);
        while (images.length < props.numberOfBackgrounds) {
            const shuffledImages = contentImages.toSorted(() => Math.random() - 0.5);
            images.push(...shuffledImages);
        }
        return images.slice(0, props.numberOfBackgrounds);
    });
</script>