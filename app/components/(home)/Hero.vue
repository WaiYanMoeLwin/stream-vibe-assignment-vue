<template>
    <section id="hero">
        <img src="/images/abstract-logo.svg" alt="Abstract Logo of StreamVibe" class="hero-logo">
        <article class="hero-content">
            <h1 class="hero-title">The Best Streaming Experience</h1>
            <p class="hero-description">
                StreamVibe is the best streaming experience for watching your favorite movies and shows on demand,
                anytime, anywhere.
                <span class="hero-description-extended">
                    With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters,
                    classic movies, popular TV shows, and more.
                    You can also create your own watchlists, so you can easily find the content you
                    want to watch.
                </span>
            </p>
            <button class="hero-button"><img src="/images/icons/play.svg" alt="Play"> Start Watching
                Now</button>
        </article>
        <BackgroundMashup :number-of-backgrounds="36">
            <div class="fade-out-top" />
            <div class="fade-out-bottom"/>
        </BackgroundMashup>
    </section>
</template>