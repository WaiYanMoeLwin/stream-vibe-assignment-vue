<template>
    <img src="/images/icons/stacks.svg" alt="Season Icon">
    <span>{{ seasonCount }} {{ seasonCount === 1 ? 'Season' : 'Seasons' }}</span>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: ContentItem;
    }>();
    const seasonCount = props.content.totalSeasons ? props.content.totalSeasons : 0;
</script>