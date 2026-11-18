<template>
    <aside class="sidebar-info">
        <section class="released-year-section">
            <header class="section-header">
                <img src="/images/icons/calendar.svg" alt="Calendar Icon">
                <h2 class="section-title">
                    Released Year
                </h2>
            </header>
            <p class="released-year">{{ props.content.year }}</p>
        </section>
        <section class="available-languages-section">
            <header class="section-header">
                <img src="/images/icons/language.svg" alt="Language Icon">
                <h2 class="section-title">
                    Available Languages
                </h2>
            </header>
            <ul class="available-languages-list">
                <li v-for="language in props.content.language" :key="language" class="language-item">
                    {{ language }}
                </li>
            </ul>
        </section>
        <section class="content-rating-section">
            <header class="section-header">
                <img src="/images/icons/star-rating.svg" alt="Star Icon">
                <h2 class="section-title">
                    Ratings
                </h2>
            </header>
            <div class="content-rating">
                <div v-for="rating in ratings" :key="rating.source" class="rating-item">
                    <span class="rating-source">{{ rating.source }}</span>
                    <div class="rating-stars">
                        <template v-for="star in 5" :key="star">
                            <img
                                v-if="star <= rating.starRating"
                                src="/images/icons/star-filled.svg"
                                alt="Filled Star"
                                title="Filled Star"
                            >
                            <img
                                v-else-if="star === Math.ceil(rating.starRating)"
                                src="/images/icons/star-half-filled.svg"
                                alt="Half Star"
                                title="Half Star"
                            >
                            <img
                                v-else
                                src="/images/icons/star-empty.svg"
                                alt="Empty Star"
                                title="Empty Star"
                            >
                        </template>
                        <span class="rating-value">{{ rating.value }}</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="genres-section">
            <header class="section-header">
                <img src="/images/icons/genres.svg" alt="Genre Icon">
                <h2 class="section-title">
                    Genres
                </h2>
            </header>
            <ul class="genres-list">
                <li v-for="genre in props.content.genre" :key="genre" class="genre-item">
                    {{ genre }}
                </li>
            </ul>
        </section>
        <section class="director-section">
            <header class="section-header">
                <h2 class="section-title">
                    Director
                </h2>
            </header>
            <ul class="director-names">
                <li v-for="director in props.content.director" :key="director.name" class="director-name">
                    <img src="/images/person-placeholder.jpg" alt="director" title="director">
                    <div class="info">
                        <h3 class="name-text">{{ director.name }}</h3>
                        <span class="location">{{ director.country }}</span>
                    </div>
                </li>
            </ul>
        </section>
        <section v-if="props.content.music" class="music-section">
            <header class="section-header">
                <h2 class="section-title">
                    Music
                </h2>
            </header>
            <ul class="music-composers">
                <li v-for="composer in props.content.music" :key="composer.name" class="music-composer">
                    <img src="/images/person-placeholder.jpg" alt="composer" title="composer">
                    <div class="info">
                        <h3 class="name-text">{{ composer.name }}</h3>
                        <span class="location">{{ composer.country }}</span>
                    </div>
                </li>
            </ul>
        </section>
    </aside>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: ContentItem;
    }>();

    const ratings = computed(() => {
        return props.content.rating.map(rating => {
            const starRating = normalizeRating(rating.value);
            return {
                source: rating.source,
                value: rating.value,
                starRating: starRating || 0
            };
        });
    })
</script>