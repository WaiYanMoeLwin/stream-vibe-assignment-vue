<template>
    <article class="main-info">
        <section :class="['episodes-section', { 'hidden': !props.content.seasons || props.content.totalSeasons === 0}]">
            <h2 class="section-title">Seasons and Episodes</h2>
            <SeasonList :content="props.content" />
        </section>
        <section class="description-section">
            <header class="section-header">
                <h2 class="section-title">Description</h2>
            </header>
            <p class="description">{{  props.content.plot }}</p>
        </section>
        <CastSection :content="props.content" />
        <ReviewSection :content="props.content" />
    </article>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: ContentItem;
    }>();
</script>