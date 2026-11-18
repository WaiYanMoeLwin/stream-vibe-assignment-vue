<template>
    <Teleport to="body">
        <div v-if="isOpen" class="search-screen">
            <div class="search-bar">
                <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Search for movies or series..." @keydown="onKeyPressed">
                <button aria-label="search">
                    <img src="/images/icons/search.svg" alt="Search" @click="handleSearch">
                </button>
                <button aria-label="close search" @click="handleCloseSearch">
                    <img src="/images/icons/close.svg" alt="Close">
                </button>
            </div>
            <div class="search-results">
                <div v-for="result in searchResults" :key="result.imdbID" class="search-result-card" @click="handleClickCard(result.imdbID)">
                    <img :src="result.Poster" :alt="result.Title">
                    <h4>{{ result.Title }} ({{ result.Year }})</h4>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
    const isOpen = defineModel('isOpen', { type: Boolean, default: false });
    const searchQuery = ref('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchResults = ref<any[]>([]);
    const searchInput = useTemplateRef<HTMLInputElement>('searchInput');
    const handleCloseSearch = () => {
        searchQuery.value = '';
        isOpen.value = false;
    };
    const handleSearch = () => {
        if (!searchQuery.value.trim()) {
            return;
        }
        $fetch(`http://localhost:3000/api/searchContent?keyword=${encodeURIComponent(searchQuery.value)}`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((results: any) => {
                searchResults.value = results.Search || [];
                console.log('Search results for ', searchQuery.value, ':', results);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };
    const onKeyPressed = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        } else if (event.key === 'Escape') {
            handleCloseSearch();
        }
    };

    const handleClickCard = (imdbID: string) => {
        navigateTo(`/content-details/${imdbID}`);
        handleCloseSearch();
    };

    watch(isOpen, (newVal) => {
        if (newVal) {
            nextTick(() => {
                searchInput.value?.focus();
            });
        }
    });
</script>