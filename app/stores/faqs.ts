

const useFaqsStore = defineStore('faqs', {
    state: () => ({
        faqs: [] as FaqItem[],
    }),
    persist: {
        key: 'faqs-store',
        storage: localStorage,
    },
    actions: {
        async loadFaqs() {
            if (this.faqs && this.faqs.length > 0) {
                return;
            }

            const mockFaqs: FaqItem[] = await $fetch('http://localhost:3000/temp/faqs.json');
            this.faqs = mockFaqs;
        },
        async addFaq(faq: FaqItem) {
            this.faqs.push(faq);
        }
    }
});


export interface FaqItem {
    id: string;
    question: string;
    answer: string;
    expanded?: boolean;
}

export default useFaqsStore;