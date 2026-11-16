<template>
    <div class="genre-item-container">
        <div class="genre-images-container">
            <div v-for="content in selectedContent" :key="content!.id" class="genre-image">
                <img :src="content!.poster" :alt="content!.title">
            </div>
            <div class="fade-out-bottom" />
        </div>
        <div class="genre-title-container">
            <h3 class="genre-title">{{ props.genre.name }}</h3>
            <NuxtLink :to="`/movies-and-shows?genre=${props.genre.name}`" class="view-all-button">
                <img src="/images/icons/arrow-right.svg" alt="View All">
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
    import useContentStore from '@/stores/content';
    const props = defineProps<{
        genre: {
            name: string;
            movies: string[];
            series: string[];
        },
        isPopular?: boolean,
        type?: 'movie' | 'series' | 'both',
    }>();

    const { data: selectedContent } = await useAsyncData(`genre-${props.genre.name}`, async () => {
        const availableContent = props.type === 'movie' ? props.genre.movies : props.type === 'series' ? props.genre.series : [...props.genre.movies, ...props.genre.series];
        const shuffledContent = availableContent.toSorted(() => Math.random() - 0.5);
        return shuffledContent.slice(0, 4).map(id => useContentStore().content[id]);
    });
</script>