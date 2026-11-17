<template>
    <div id="content-detail">
        <Trailer :content-id="contentId" section-id="thumbnail" :is-carousel="false"/>
        <section id="content-info">
            <MainInfo :content="content!" />
            <SidebarInfo :content="content!" />
        </section>
    </div>
</template>

<script setup lang="ts">
    import useContentStore from '@/stores/content';
    const route = useRoute();
    const contentStore = useContentStore();
    const contentId = computed(() =>route.params.id as string);

    const content = computed(() => contentStore.content[contentId.value]);

    watch([contentId, content], () => {
        console.log('Content ID:', contentId.value);
        console.log('Content:', content.value);
    })
</script>