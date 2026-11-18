<template>
    <header class="main-header">
        <img src="/images/logo.png" alt="Logo" class="logo">
        <nav :class="['main-nav', { 'active': isMenuOpen }]">
            <ul>
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/movies-and-shows">Movies &amp; Shows</NuxtLink></li>
                <li><NuxtLink to="/support">Support</NuxtLink></li>
                <li><NuxtLink to="/subscriptions">Subscriptions</NuxtLink></li>

                <ProfileMenu v-if="isMediumOrSmallerScreen" v-model:is-open="isProfileMenuOpen" />
            </ul>
        </nav>
        <nav :class="{'active': isMenuOpen}">
            <ul>
                <li><button aria-label="search" @click="handleSearch"><img src="/images/icons/search.svg" alt="Search"></button></li>
                <li><button aria-label="notifications"><img src="/images/icons/noti-bell.svg" alt="Notifications"></button></li>
                <li>
                    <NuxtLink to="/login" :class="['login', { 'hidden': isLoggedIn }]"><img src="/images/icons/login.svg" alt="Login"></NuxtLink>
                    <div v-if="isLoggedIn" class="profile-container" :style="{ position: 'relative'}">
                        <button class="user-profile" aria-label="User Profile" @click="toggleProfileMenu">
                            {{ loggedInUser?.firstName?.charAt(0).toUpperCase() }}{{ loggedInUser?.lastName?.charAt(0).toUpperCase() }}
                        </button>
                        <ProfileMenu v-if="!isMediumOrSmallerScreen" v-model:is-open="isProfileMenuOpen" />
                    </div>
                </li>
            </ul>
        </nav>
        <SearchScreen v-model:is-open="isSearchScreenOpen" />
        <button class="menu" aria-label="Menu" @click="toggleMenu">
            <img src="/images/icons/menu.svg" alt="Menu">
        </button>
    </header>
</template>

<script setup lang="ts">
    import useUserStore from '@/stores/user';
    const viewport = useViewport();
    const isMediumOrSmallerScreen = computed(() => viewport.isLessThan('laptop'));
    const isMenuOpen = ref(false);
    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    };


    const userStore = useUserStore();
    const { loggedInUser } = storeToRefs(userStore);

    const isLoggedIn = computed(() => !!loggedInUser.value);

    const isProfileMenuOpen = ref(false);
    const toggleProfileMenu = () => {
        if (isMediumOrSmallerScreen.value) {
            return; // Do not toggle the profile menu on medium or smaller screens
        }
        isProfileMenuOpen.value = !isProfileMenuOpen.value;
    };

    watch(isMediumOrSmallerScreen, (newVal) => {
        if (!newVal) {
            isProfileMenuOpen.value = false;
        } else {
            isProfileMenuOpen.value = true;
        }
    });

    const isSearchScreenOpen = ref(false);
    const handleSearch = () => {
        isSearchScreenOpen.value = true;
    };

</script>