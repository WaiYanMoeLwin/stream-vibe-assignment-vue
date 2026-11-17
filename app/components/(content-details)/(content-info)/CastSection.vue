<template>
    <section class="cast-section">
        <header class="section-header">
            <h2 class="section-title">Cast</h2>
            <Pagination :current-page="currentPage" :total-pages="totalPages" :show-pages="false" @page-change="handlePageChange"/>
        </header>
        <div class="cast-list">
            <div v-for="cast in actorsToDisplay" :key="cast" class="cast-item">
                <img src="/images/person-placeholder.jpg" alt="cast" title="cast">
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: ContentItem;
    }>();
    const viewport = useViewport();
    const currentPage = ref(1);
    const perPage = computed(() => {
        return viewport.isLessThan('tablet') ? 4 : 8;
    });
    const totalPages = computed(() => {
        return Math.ceil(props.content.actors.length / perPage.value);
    });
    const handlePageChange = (page: number) => {
        currentPage.value = page;
    };
    const actorsToDisplay = computed(() => {
        if (!props.content.actors) {
            return [];
        }
        const start = (currentPage.value - 1) * perPage.value;
        const end = start + perPage.value;
        return props.content.actors.slice(start, end);
    });
</script>