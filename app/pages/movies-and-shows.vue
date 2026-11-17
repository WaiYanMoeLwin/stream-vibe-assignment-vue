<template>
    <div id="movies-and-shows">
        <TrailerCarousel />
        <div class="tab">
            <button 
                v-for="contentType in contentTypes" 
                :key="contentType.id" 
                :class="['tab-button', { 'active': activeTab === contentType.id }]"
                @click="activeTab = contentType.id"
            >
                {{ contentType.name }}
            </button>
        </div>
        <template v-for="type in contentTypes" :key="type.id">
            <div v-if="activeTab === type.id || (!isMobile && !isTablet)" :id="type.id" class="content-container">
                <h2 class="content-title">{{ type.name }}</h2>
                <GenreRow
                    title="Our Genres"
                    :section-id="`${type.id}-genres`"
                    :container-class-name="'genre-cards'"
                    :is-popular="false"
                    :type="type.type"
                    :shuffle-images="true"
                    :per-page="smallCardLayout"
                />
                <GenreRow
                    title="Popular Top 10 in Genres"
                    :section-id="`${type.id}-popular-genres`"
                    :container-class-name="'popular-genre-cards'"
                    :is-popular="true"
                    :type="type.type"
                    :shuffle-images="false"
                    :per-page="mediumCardLayout"
                />
                <ContentRow
                    :title="`Trending ${type.id === 'shows' ? 'Shows ' : ''}Now`"
                    :content-infos="contentInfosByList.trending[type.type as keyof typeof contentInfosByList.trending]"
                    :content-getter="() => getTrendingContent(type.type)"
                    :section-id="`${type.id}-trending`"
                    :container-class-name="'trending-cards'"
                    :type="type.type"
                    :per-page="type.id === 'shows' ? largeCardLayout : smallCardLayout"
                />
                <ContentRow
                    :title="`New ${type.id === 'shows' ? 'Shows ' : ''}Releases`"
                    :content-infos="contentInfosByList.newReleases[type.type as keyof typeof contentInfosByList.newReleases]"
                    :content-getter="() => getNewReleases(type.type)"
                    :section-id="`${type.id}-new-releases`"
                    :container-class-name="'new-releases-cards'"
                    :type="type.type"
                    :per-page="type.id === 'shows' ? largeCardLayout : smallCardLayout"
                />
                <ContentRow
                    :title="`Must Watch ${type.id === 'shows' ? 'Shows ' : ''}`"
                    :content-infos="contentInfosByList.mustWatch[type.type as keyof typeof contentInfosByList.mustWatch]"
                    :content-getter="() => getMustWatchContent(type.type)"
                    :section-id="`${type.id}-must-watch`"
                    :container-class-name="'must-watch-cards'"
                    :type="type.type"
                    :per-page="largeCardLayout"
                />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import useContentStore from '@/stores/content';
    const contentStore = useContentStore();
    const getTrendingContent = contentStore.getTrendingContent;
    const getNewReleases = contentStore.getNewReleases;
    const getMustWatchContent = contentStore.getMustWatchContent;
    const contentTypes: {id: string, name: string, type: 'movie' | 'series' | 'both'}[] = [
        {id: 'movies', name: 'Movies', type: 'movie'},
        {id: 'shows', name: 'Shows', type: 'series'}
    ]
    const activeTab = ref(contentTypes[0]!.id);
    const viewport = useViewport();
    const isMobile = computed(() => viewport.isLessThan('tablet'));
    const isTablet = computed(() => viewport.isLessThan('laptop') && viewport.isGreaterOrEquals('tablet'));
    const isLaptop = computed(() => viewport.isLessThan('desktop') && viewport.isGreaterOrEquals('laptop'));
    const isDesktop = computed(() => viewport.isGreaterOrEquals('desktop'));
    const smallCardLayout = computed(() => {
        return isDesktop.value ? 5 : isLaptop.value ? 4 : undefined; // For mobile and tablet, we will show all content in one page
    });
    const mediumCardLayout = computed(() => {
        return isDesktop.value ? 4 : isLaptop.value ? 4 : undefined; // For mobile and tablet, we will show all content in one page
    });
    const largeCardLayout = computed(() => {
        return isDesktop.value ? 4 : isLaptop.value ? 3 : undefined; // For mobile and tablet, we will show all content in one page
    });

</script>