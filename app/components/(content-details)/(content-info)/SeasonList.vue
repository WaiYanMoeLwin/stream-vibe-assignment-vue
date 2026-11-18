<template>
    <ol class="seasons-list">
        <li v-for="season in seasons" :key="season.seasonNumber" class="season-item">
            <div class="season-header">
                <div class="season-info">
                    <h3 class="season-title">Season {{ season.seasonNumber.toString().padStart(2, '0') }}</h3>
                    <span class="episode-count">{{ season.totalEpisodes }} Episodes</span>
                </div>
                <button
                    :class="['expand-button', { 'hidden': expandedSeasons.includes(season.seasonNumber) }]"
                    @click="toggleSeason(season.seasonNumber)"
                >
                    <img src="/images/icons/arrow-down.svg" alt="Expand">
                </button>
                <button
                    :class="['collapse-button', { 'hidden': !expandedSeasons.includes(season.seasonNumber) }]"
                    @click="toggleSeason(season.seasonNumber)"
                >
                    <img src="/images/icons/arrow-up.svg" alt="Collapse">
                </button>
            </div>
            <ol v-show="expandedSeasons.includes(season.seasonNumber)" class="episodes-list">
                <li v-for="episode in season.episodes" :key="episode.episodeNumber" class="episode-item">
                    <span class="episode-number">{{ episode.episodeNumber.toString().padStart(2, '0') }}</span>
                    <div class="episode-thumbnail">
                        <img :src="episode.poster" :alt="episode.title" :title="episode.title" class="thumbnail-img">
                        <button class="play-button" aria-label="Play Episode" @click="handlePlayButtonClick(season.seasonNumber, episode.episodeNumber)">
                            <img class="play-icon" src="/images/icons/play-circle.svg" alt="Play">
                        </button>
                    </div>
                    <div class="episode-info">
                        <div class="episode-header">
                            <h4 class="episode-title">{{ episode.title }}</h4>
                            <div class="episode-duration">
                                <img src="/images/icons/clock.svg" alt="Duration">
                                <span class="duration-text">{{ formatRuntime(episode.runtime) }}</span>
                            </div>
                        </div>
                        <p class="episode-description">{{ episode.plot }}</p>
                    </div>
                </li>
            </ol>
        </li>
    </ol>
</template>

<script setup lang="ts">
    import useUserStore from '@/stores/user';
    const props = defineProps<{
        content: ContentItem;
    }>();
    const seasons = computed(() => Object.values(props.content.seasons || {}).map((season) => {
        return {
            seasonNumber: season.seasonNumber,
            episodes: Object.values(season.episodes).toSorted((a, b) => a.episodeNumber - b.episodeNumber),
            totalEpisodes: Object.keys(season.episodes).length
        };
    }).toSorted((a, b) => a.seasonNumber - b.seasonNumber));
    const expandedSeasons = ref<number[]>([]);
    const toggleSeason = (seasonNumber: number) => {
        const index = expandedSeasons.value.indexOf(seasonNumber);
        if (index > -1) {
            expandedSeasons.value.splice(index, 1);
        } else {
            expandedSeasons.value.push(seasonNumber);
        }
    };

    const userStore = useUserStore();
    const isLoggedIn = computed(() => !!userStore.loggedInUser);
    const hasActivePlan = computed(() => userStore.hasActivePlan);
    const openModal = useModal();
    const handlePlayButtonClick = (seasonNumber: number, episodeNumber: number) => {
        if (!isLoggedIn.value) {
            openModal('You must be logged in to play content. Please log in or register to continue.',
                () => navigateTo('/login')
            );
        } else if (!hasActivePlan.value) {
            openModal('You must have an active subscription plan to play content. Please subscribe to continue.',
                () => navigateTo('/subscriptions')
            );
        } else {
            navigateTo(`/playback/${props.content.id}?season=${seasonNumber}&episode=${episodeNumber}`);
        }
    }
</script>