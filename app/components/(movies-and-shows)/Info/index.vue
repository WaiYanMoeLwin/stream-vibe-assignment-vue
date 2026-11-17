<template>
    <div :class="['content-info', `content-${info.toLocaleLowerCase()}`]">
        <Runtime v-if="info.toLowerCase() === 'runtime'" :content="props.content" />
        <View v-else-if="info.toLowerCase() === 'views'" :content="props.content" />
        <ReleaseDate v-else-if="info.toLowerCase() === 'release-date'" :content="props.content" />
        <Season v-else-if="info.toLowerCase() === 'seasons'" :content="props.content" />
        <Rating v-else-if="info.toLowerCase() === 'rating'" :content="props.content" />
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: ContentItem;
        info: string;
    }>();

</script>