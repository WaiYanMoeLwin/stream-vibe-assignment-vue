<template>
    <section id="faq">
        <header class="section-header">
            <article>
                <h2 class="section-title">Frequently Asked Questions</h2>
                <p class="section-description">
                    Got questions? We've got answers! Check out our FAQ section to find answers to the most common
                    questions about StreamVibe.
                </p>
            </article>
            <button class="ask-question-button">Ask a Question</button>
        </header>
        <article class="faq-items-container">
            <div v-for="(faqList, index) in faqLists" :key="index" class="faq-list">
                <div v-for="faq in faqList" :key="faq.id" :class="['faq-container', { 'expanded': faq.expanded }]">
                    <FAQInner
                        v-if="viewport.isGreaterOrEquals('tablet')"
                        :faq="faq"
                        @open-faq="handleOpenFAQ"
                        @close-faq="handleCloseFAQ"
                    />

                    <div v-else class="faq-main-container">
                        <FAQInner
                            :faq="faq"
                            @open-faq="handleOpenFAQ"
                            @close-faq="handleCloseFAQ"
                        />
                    </div>
                    <p
                        v-if="viewport.isLessThan('tablet')"
                        :class="['faq-answer', { 'hidden': !faq.expanded }]"
                    >
                        {{ faq.answer }}
                    </p>
                </div>
            </div>
        </article>
    </section>
</template>


<script setup lang="ts">
import useFAQStore from '@/stores/faqs';
const viewport = useViewport();
const faqStore = useFAQStore();
const { faqs } = storeToRefs(faqStore);

const numberOfFAQLists = computed(() => {
    if (viewport.isGreaterOrEquals('laptop')) {
        return 2;
    } else {
        return 1;
    }
});

const faqLists = computed(() => {
    const lists = [];
    const perList = Math.ceil(faqs.value.length / numberOfFAQLists.value);
    for (let i = 0; i < numberOfFAQLists.value; i++) {
        lists.push(faqs.value.slice(i * perList, (i + 1) * perList));
    }
    return lists;
});

const handleOpenFAQ = (faqId: string) => {
    const faq = faqs.value.find(f => f.id === faqId);
    if (faq) {
        faq.expanded = true;
    }
}

const handleCloseFAQ = (faqId: string) => {
    const faq = faqs.value.find(f => f.id === faqId);
    if (faq) {
        faq.expanded = false;
    }
}
</script>