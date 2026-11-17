<template>
    <img src="/images/icons/clock.svg" alt="Runtime Icon">
    <span>{{ formatRuntime(props.content.runtime) }}</span>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: ContentItem;
    }>();
</script>