<template>
    <section>
        <header class="section-header">
            <h3 class="section-title">{{ props.title }}</h3>
            <Pagination
                :current-page="currentPage"
                :total-pages="totalPages"
                @page-change="handlePageChange"
            />
        </header>
        <article ref="contentRow" :class="[props.containerClassName, 'content-cards']">
            <ContentCard
                v-for="content in contentsToDisplay"
                :key="`${props.sectionId}-${content.id}`"
                :content-id="content.id"
                :content-infos="props.contentInfos"
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
    const props = defineProps<{
        title: string,
        sectionId: string,
        contentInfos?: string[],
        contentGetter: () => ContentItem[],
        containerClassName: string,
        type?: 'movie' | 'series' | 'both',
        perPage?: number,
    }>();

    const contents = computed(() => props.contentGetter());
    const currentPage = ref(1);
    const totalPages = computed(() => {
        if (props.perPage) {
            return Math.ceil(contents.value.length / props.perPage);
        } else {
            return 1; // For mobile, we will show all contents in one page
        }
    });

    const contentsToDisplay = computed(() => {
        if (props.perPage) {
            const start = (currentPage.value - 1) * props.perPage;
            const end = start + props.perPage;
            return contents.value.slice(start, end);
        } else {
            return contents.value;
        }
    });

    const handlePageChange = (page: number) => {
        currentPage.value = page;
    };
    const contentRow = useTemplateRef<HTMLElement | null>('contentRow');
    const { visibleContentPercentage, scrollPercentage, handleScroll } = useScroll(contentRow);
</script>