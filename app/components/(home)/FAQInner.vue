<template>
    <div class="faq-sub-container">
        <div class="faq-number">{{ props.faq.id }}</div>
        <div class="faq-content">
            <h4 class="faq-question">{{ props.faq.question }}</h4>
            <p
                v-if="viewport.isGreaterOrEquals('tablet')"
                :class="['faq-answer', { 'hidden': !props.faq.expanded }]"
            >
                {{ props.faq.answer }}
            </p>
        </div>
    </div>
    <button
        :class="['faq-toggle-button', 'faq-open-button', { 'hidden': props.faq.expanded }]"
        aria-label="Open FAQ"
        @click="handleOpenFAQ(props.faq.id)"
        >
        <img src="/images/icons/plus.svg" alt="Open FAQ">
    </button>
    <button
        :class="['faq-toggle-button', 'faq-close-button', { 'hidden': !props.faq.expanded }]"
        aria-label="Close FAQ"
        @click="handleCloseFAQ(props.faq.id)"
        >
        <img src="/images/icons/minus.svg" alt="Close FAQ">
    </button>
</template>

<script setup lang="ts">
    const props = defineProps<{
        faq: FaqItem;
    }>();
    const emits = defineEmits<{
        (e: 'open-faq' | 'close-faq', faqId: string): void;
    }>();

    const viewport = useViewport();

    const handleOpenFAQ = (faqId: string) => {
        emits('open-faq', faqId);
    };

    const handleCloseFAQ = (faqId: string) => {
        emits('close-faq', faqId);
    };
</script>