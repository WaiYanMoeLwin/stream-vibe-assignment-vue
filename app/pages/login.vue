<template>
    <div id="login">
        <article class="tab">
            <button :class="['tab-button', { 'active': currentTab === 'login' }]" aria-label="Login" aria-target="login-section" @click="switchTab('login')">Login</button>
            <button :class="['tab-button', { 'active': currentTab === 'register' }]" aria-label="Register" aria-target="register-section" @click="switchTab('register')">Register</button>
        </article>
        <section id="login-section" :class="{ 'hidden': currentTab !== 'login' }">
            <LoginForm v-model:model="loginInputModel" />
        </section>
        <section id="register-section" :class="{ 'hidden': currentTab !== 'register' }">
            <RegisterForm v-model:model="registerInputModel" @success="switchTab('login')" />
        </section>
    </div>
</template>

<script setup lang="ts">
    import useUserStore from '@/stores/user';
    definePageMeta({
        layout: 'minimal',
        title: 'Login',
        middleware: [
            function (to, from) {
                to.query.redirect = from.fullPath || '/';
                const userStore = useUserStore();
                if (userStore.loggedInUser) {
                    if (to.query.redirect === '/login') {
                        return navigateTo('/');
                    }
                    return navigateTo(to.query.redirect as string || '/');
                }
            }
        ]
    });

    const loginInputModel = ref({
        email: '',
        password: ''
    });
    const registerInputModel = ref({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const currentTab = ref<'login' | 'register'>('login');
    const switchTab = (tab: 'login' | 'register') => {
        currentTab.value = tab;
        loginInputModel.value = { email: '', password: '' };
        registerInputModel.value = { firstName: '', lastName: '', email: '', password: '' };
    };
</script>