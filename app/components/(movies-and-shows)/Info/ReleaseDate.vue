<template>
    <span>Released at {{ props.content.releaseDate }}</span>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: ContentItem;
    }>();
</script>