<template>
    <section :id="props.sectionId">
        <header class="section-header">
            <h3 class="section-title">{{ props.title }}</h3>
            <Pagination
                :current-page="currentPage"
                :total-pages="totalPages"
                @page-change="handlePageChange"
            />
        </header>
        <article ref="genreRow" :class="props.containerClassName">
            <GenreCard
                v-for="genre in genresToDisplay"
                :key="`${props.sectionId}-${genre.name}`"
                :genre="genre"
                :type="props.type"
                :is-popular="props.isPopular"
                :shuffle-images="props.shuffleImages ?? true"
            />
        </article>
        <ScrollBar
            :scroll-percentage="scrollPercentage"
            :thumb-width="visibleContentPercentage"
            @scroll="handleScroll"
        />
    </section>
</template>

<script setup lang="ts">
import useContentStore from '@/stores/content';
const props = defineProps<{
    title: string,
    sectionId: string,
    containerClassName: string,
    isPopular?: boolean,
    type?: 'movie' | 'series' | 'both',
    shuffleImages?: boolean,
    perPage?: number,
}>();
const contentStore = useContentStore();
const { genres } = storeToRefs(contentStore);

const filteredGenres = computed(() => {
    if (props.type === 'movie') {
        return Object.values(genres.value).filter(genre => genre.movies.length > 0);
    } else if (props.type === 'series') {
        return Object.values(genres.value).filter(genre => genre.series.length > 0);
    } else {
        return Object.values(genres.value);
    }
})

const currentPage = ref(1);
const totalPages = computed(() => {
    if (props.perPage) {
        return Math.ceil(filteredGenres.value.length / props.perPage);
    } else {
        return 1; // For mobile, we will show all categories in one page
    }
});

const handlePageChange = (page: number) => {
    currentPage.value = page;
};

const genresToDisplay = computed(() => {
    if (props.perPage) {
        const start = (currentPage.value - 1) * props.perPage;
        const end = start + props.perPage;
        return filteredGenres.value.slice(start, end);
    } else {
        return filteredGenres.value;
    }
});
const genreRow = useTemplateRef<HTMLElement | null>('genreRow');
const { visibleContentPercentage, scrollPercentage, handleScroll } = useScroll(genreRow);
</script>