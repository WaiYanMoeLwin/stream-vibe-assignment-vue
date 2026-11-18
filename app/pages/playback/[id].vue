<template>
    <main id="playback">
        <section class="playback-section">
            <header class="section-header">
                <button class="back-button" aria-label="Back to Movies & Shows" @click="onBackButtonClick">
                    <img src="/images/icons/arrow-left.svg" alt="Back">
                </button>

                <h1 class="title">{{content?.title || 'Loading...'}}</h1>
            </header>
            <div class="video-container">
                <img :src="content?.poster" :alt="content?.title">
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    import useContentStore from '@/stores/content';
    definePageMeta({
        layout: false,
        title: 'Playback',
        middleware: [
            function (to, from) {
                to.query.redirect = from.fullPath || '/movies-and-shows';
            }
        ]
    });
    const route = useRoute();
    const contentId = route.params.id as string;
    const season = parseInt(route.query.season as string) || 1;
    const episode = parseInt(route.query.episode as string) || 1;
    const contentStore = useContentStore();
    const content = computed(() => {
        const item = contentStore.getContentById(contentId);
        if (!item) {
            throw new Error(`Content with ID ${contentId} not found.`);
        }
        if (item.type === 'series' && (!item.seasons || !item.seasons[season] || !item.seasons[season].episodes[episode])) {
            throw new Error(`Episode ${episode} of Season ${season} not found for content ID ${contentId}.`);
        }
        if (item.type === 'series') {
            return item.seasons![season]!.episodes[episode];
        }
        return item;
    });
    const onBackButtonClick = () => {
        navigateTo(route.query.redirect as string || '/movies-and-shows');
    };
</script>