<template>
    <section :id="props.sectionId" :style="trailerStyle">
        <article class="section-header">
            <h1 :class="props.isCarousel ? 'trailer-title' : 'title'">{{ contentItem!.title }}</h1>
            <p :class="props.isCarousel ? 'trailer-description' : 'description'">{{ contentItem!.plot }}</p>
        </article>
        <article class="media-buttons-container">
            <button class="play-button"><img src="/images/icons/play.svg" alt="Play"> Play Now</button>
            <div class="watch-list-buttons">
                <button class="add-to-watch-list-button" aria-label="Add to Watch List">
                    <img src="/images/icons/plus.svg" alt="Add to Watch List">
                </button>
                <button class="like-button" aria-label="Like">
                    <img src="/images/icons/like.svg" alt="Like">
                </button>
                <button class="mute-button muted" aria-label="Mute/Unmute">
                    <img src="/images/icons/audio.svg" alt="Unmute">
                    <img src="/images/icons/mute.svg" class="hidden" alt="Mute">
                </button>
            </div>
        </article>
        <slot />
    </section>
</template>

<script setup lang="ts">
    import useContentStore from '@/stores/content';
    const props = defineProps<{
        contentId: string;
        sectionId: string;
        isCarousel: boolean;
    }>();
    const contentStore = useContentStore();
    const contentItem = computed(() => contentStore.content[props.contentId]);
    const trailerStyle = computed(() => ({
        'background-image': `linear-gradient(to bottom, rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${contentItem.value?.poster})`,
        'background-size': 'cover',
        'background-position': 'center',
        'background-clip': 'padding-box',
    }));
</script>