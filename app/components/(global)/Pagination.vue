<template>
    <div class="pagination">
        <button
            class="pagination-button"
            aria-label="Previous"
            @click="handlePreviousPage"
        >
            <img src="/images/icons/arrow-left.svg" alt="Previous">
        </button>
        <div v-if="props.showPages !== false" class="pages">
            <button
                v-for="page in props.totalPages"
                :key="page"
                :value="page"
                :class="['pagination-page', page=== props.currentPage ? 'active' : '']"
                @click="handlePageChange(page)"
            />
        </div>
        <button
            class="pagination-button"
            aria-label="Next"
            @click="handleNextPage"
        >
            <img src="/images/icons/arrow-right.svg" alt="Next">
        </button>
    </div>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        totalPages: number;
        currentPage: number;
        showPages?: boolean;
    }>(), {
        showPages: true
    });
    const emits = defineEmits<{
        (e: 'page-change', page: number): void;
    }>();

    const handlePageChange = (page: number) => {
        emits('page-change', page);
    };

    const handlePreviousPage = () => {
        if (props.currentPage > 1) {
            emits('page-change', props.currentPage - 1);
        } else {
            emits('page-change', props.totalPages); // Wrap around to the last page
        }
    };
    const handleNextPage = () => {
        if (props.currentPage < props.totalPages) {
            emits('page-change', props.currentPage + 1);
        } else {
            emits('page-change', 1); // Wrap around to the first page
        }
    };

</script>