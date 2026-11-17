<template>
    <img src="/images/icons/eye.svg" alt="View Icon">
    <span>{{ formatNumberWithUnit(props.content.imdbVotes) }}</span>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: ContentItem;
    }>();
</script>