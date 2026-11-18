<template>
    <section class="reviews-section">
        <header class="section-header">
            <h2 class="section-title">Reviews</h2>
            <button class="add-review-button" aria-label="Add Review">
                <img src="/images/icons/plus.svg" alt="Add Review">
                Add Your Review
            </button>
        </header>
        <div class="reviews-list">
            <template v-if="props.content.reviews && props.content.reviews?.length > 0">
            <article v-for="review in reviewsToDisplay" :key="review.id" class="review-item">
                <header class="review-header">
                    <div class="reviewer">
                        <h3 class="reviewer-name">{{ review.name }}</h3>
                        <span class="reviewer-location">{{ review.country }}</span>
                    </div>
                    <div class="rating-container">
                        <div class="rating-stars">
                            <template v-for="star in 5" :key="star">
                                <img
                                    v-if="star <= review.rating"
                                    src="/images/icons/star-filled.svg"
                                    alt="Filled Star"
                                    title="Filled Star"
                                >
                                <img
                                    v-else-if="star === Math.ceil(review.rating)"
                                    src="/images/icons/star-half-filled.svg"
                                    alt="Half Star"
                                    title="Half Star"
                                >
                                <img
                                    v-else
                                    src="/images/icons/star-empty.svg"
                                    alt="Empty Star"
                                    title="Empty Star"
                                >
                            </template>
                        </div>
                        <span class="rating-value">{{ review.rating }}</span>
                    </div>
                </header>
                <p class="review-content">{{ review.review }}</p>
            </article>
            </template>
            <p v-else class="no-reviews-message">No reviews available</p>
        </div>
        <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange"/>
    </section>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: ContentItem;
    }>();
    const viewport = useViewport();
    const currentPage = ref(1);
    const perPage = computed(() => {
        return viewport.isLessThan('tablet') ? 1 : 2;
    });
    const totalPages = computed(() => {
        return Math.ceil((props.content.reviews? props.content.reviews.length : 0) / perPage.value);
    });
    const handlePageChange = (page: number) => {
        currentPage.value = page;
    };
    const reviewsToDisplay = computed(() => {
        if (!props.content.reviews) {
            return [];
        }
        const start = (currentPage.value - 1) * perPage.value;
        const end = start + perPage.value;
        return props.content.reviews.slice(start, end);
    });
</script>