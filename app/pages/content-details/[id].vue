<template>
    <div v-if="!isLoading" id="content-detail">
        <Trailer v-if="content" :content-id="contentId" section-id="thumbnail" :is-carousel="false"/>
        <section id="content-info">
            <MainInfo v-if="content" :content="content!" />
            <SidebarInfo v-if="content" :content="content!" />
        </section>
    </div>
    <LoadingScreen v-else />
</template>

<script setup lang="ts">
    import useContentStore from '@/stores/content';
    const route = useRoute();
    const contentStore = useContentStore();
    const contentId = computed(() =>route.params.id as string);

    const content = ref<ContentItem | null>(null);
    const isLoading = computed(() => contentStore.isLoading);
    
    onBeforeMount(async () => {
        try {
            await contentStore.loadContentById(contentId.value);
            const item = contentStore.getContentById(contentId.value);
            console.log('Fetched content:', item);
            if (item) {
                content.value = item;
            }
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    });

    watch([contentId, content], () => {
        console.log('Content ID:', contentId.value);
        console.log('Content:', content.value);
    })
</script>