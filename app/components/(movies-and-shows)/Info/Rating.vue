<template>
    <div class="star-container">
        <img
            v-for="(star, index) in stars"
            :key="index"
            :src="star"
            alt="Star Icon"
        >
    </div>
    <span>{{ votes }}</span>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: ContentItem;
    }>();
    const rating = computed(() => {
        return normalizeRating(props.content.imdbRating);
    });
    const stars = ref<string[]>([]);
    const maxStars = 5;
    const fullStars = computed(() => Math.floor(rating.value!));
    const hasHalfStar = computed(() => rating.value! % 1 >= 0.5);
    const emptyStars = computed(() => maxStars - fullStars.value - (hasHalfStar.value ? 1 : 0));
    const updateStars = () => {
        stars.value = [];
        for (let i = 0; i < fullStars.value; i++) {
            stars.value.push('/images/icons/star-filled.svg');
        }
        if (hasHalfStar.value) {
            stars.value.push('/images/icons/star-half-filled.svg');
        }
        for (let i = 0; i < emptyStars.value; i++) {
            stars.value.push('/images/icons/star-empty.svg');
        }
    }
    const votes = computed(() => formatNumberWithUnit(props.content.imdbVotes));
    watch(rating, updateStars, { immediate: true });
</script>