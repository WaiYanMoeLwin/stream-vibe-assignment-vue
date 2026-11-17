<template>
    <section id="categories">
        <header class="section-header">
            <article>
                <h2 class="section-title">Explore our wide variety of categories</h2>
                <p class="section-description">Whether you're looking for a comedy to make you laugh, a drama to
                    make
                    you
                    think, or a documentary to learn something
                    new</p>
            </article>
            <Pagination :current-page :total-pages @page-change="handlePageChange" />
        </header>
        <article ref="categoriesElement" class="category-cards" >
            <GenreCard
                v-for="genre in genresToDisplay"
                :key="genre.name"
                :genre="genre"
                :shuffle-images="true"
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
    const viewport = useViewport();
    const perPage = computed(() => {
        if (viewport.isGreaterOrEquals('desktop')) {
            return 5;
        } else if (viewport.isLessThan('desktop') && viewport.isGreaterThan('tablet')) {
            return 4;
        } else {
            return null; // For mobile, we will show all categories
        }
    });
    const currentPage = ref(1);
    const contentStore = useContentStore();
    const { genres } = storeToRefs(contentStore);
    const totalPages = computed(() => {
        if (perPage.value) {
            return Math.ceil(Object.keys(genres.value).length / perPage.value);
        } else {
            return 1; // For mobile, we will show all categories in one page
        }
    });

    const handlePageChange = (page: number) => {
        currentPage.value = page;
    };

    const genresToDisplay = computed(() => {
        if (perPage.value) {
            const start = (currentPage.value - 1) * perPage.value;
            const end = start + perPage.value;
            return Object.values(genres.value).slice(start, end);
        } else {
            return Object.values(genres.value);
        }
    });

    const categoriesElement = useTemplateRef<HTMLElement | null>('categoriesElement');
    const { visibleContentPercentage, scrollPercentage, handleScroll } = useScroll(categoriesElement);

</script>