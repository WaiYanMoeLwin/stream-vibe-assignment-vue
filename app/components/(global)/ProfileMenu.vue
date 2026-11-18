<template>
    <div class="profile-menu" :class="{hidden: !isOpen}">
        <button class="watch-list-button" @click="navigateTo('/watch-list')">Watch List</button>
        <button class="logout-button" @click="handleLogout">Logout</button>
    </div>
</template>

<script setup lang="ts">
    import useUserStore from '@/stores/user';
    const userStore = useUserStore();
    const isOpen = defineModel<boolean>('isOpen', { required: true, default: false });
    
    const handleLogout = () => {
        userStore.logout();
        isOpen.value = false;
        reloadNuxtApp();
    };
</script>