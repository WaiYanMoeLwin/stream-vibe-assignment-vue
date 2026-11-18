<template>
    <div id="watch-list">
        <main>
            <h1 class="watch-list-title">Your Watch List</h1>
            <section class="watch-list-section">
                <template v-if="!isEmptyWatchList">
                    <div v-for="content in watchListItems" :key="content?.id" class="watch-list-card" @click.stop="navigateTo(`/content-details/${content!.id}`)">
                        <button class="remove-from-watch-list-button" aria-label="Remove From Watch List" @click="() => handleRemoveFromWatchList(content!.id)">
                            <img src="/images/icons/delete.svg" alt="Remove From Watch List">
                        </button>
                        <img :src="content!.poster" :alt="content!.title">
                        <div class="watch-list-card-info">
                            <Info :content="content!" info="runtime" />
                            <Info v-if="content!.totalSeasons && content!.type==='series'" :content="content!" info="seasons" />
                        </div>
                    </div>
                </template>
                <p v-else class="empty-watch-list-message">Your watch list is empty. Start adding your favorite content!</p>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
    import useUserStore from '@/stores/user';
    const openModal = useModal();
    definePageMeta({
        layout: 'minimal',
        title: 'Watch List',
        middleware: [
            function () {
                const userStore = useUserStore();
                if (!userStore.loggedInUser) {
                    openModal('You must be logged in to view your watch list. Please log in or register to continue.',
                        () => navigateTo('/login')
                    );
                }
            }
        ]
    });
    const userStore = useUserStore();
    const watchListItems = computed(() => userStore.getWatchlist);
    const isEmptyWatchList = computed(() => watchListItems.value.length === 0);

    const handleRemoveFromWatchList = (contentId: string) => {
        try {
            openModal('Are you sure you want to remove this item from your watch list?',
                () => {
                    userStore.removeFromWatchlist(contentId);
                }
            );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            openModal(error.message);
        }
    };
</script>