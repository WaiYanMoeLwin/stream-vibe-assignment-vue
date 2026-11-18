<template>
    <header class="main-header">
        <img src="/images/logo.png" alt="Logo" class="logo">
        <nav :class="['main-nav']">
            <ul>
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/movies-and-shows">Movies &amp; Shows</NuxtLink></li>
                <li><NuxtLink to="/support">Support</NuxtLink></li>
                <li><NuxtLink to="/subscriptions">Subscriptions</NuxtLink></li>
            </ul>
        </nav>
        <nav>
            <ul>
                <li><button aria-label="search"><img src="/images/icons/search.svg" alt="Search"></button></li>
                <li><button aria-label="notifications"><img src="/images/icons/noti-bell.svg" alt="Notifications"></button></li>
                <li><NuxtLink to="/login" class="login"><img src="/images/icons/login.svg" alt="Login"></NuxtLink></li>
            </ul>
        </nav>
        <button class="menu" aria-label="Menu">
            <img src="/images/icons/menu.svg" alt="Menu">
        </button>
    </header>
</template>

<script setup lang="ts">

</script>