<template>
    <div class="content-card" @click="handleCardClick">
        <div class="content-image-container">
            <img
                :src="content!.poster"
                :alt="content!.title"
                :title="content!.title"
                class="content-card-image"
            >
        </div>
        <div class="content-info-container">
            <Info v-for="info in contentInfos" :key="info.id" :info="info" :content="content!"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import useContentStore from '@/stores/content';
const props = defineProps<{
    contentId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contentInfos?: any[];
}>();
const contentStore = useContentStore();
const content = computed(() => contentStore.content[props.contentId]);

const handleCardClick = () => {
    // Navigate to the content detail page using the content ID
    if (content.value) {
        const contentId = content.value.id;
        // Use Nuxt's router to navigate to the content detail page
        navigateTo(`/content-details/${contentId}`);
    }
}
</script>