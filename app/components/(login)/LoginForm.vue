<template>
    <form class="login-form">
        <div class="form-field email">
            <label for="email">Email</label>
            <input id="email" v-model="model.email" type="email" name="email" placeholder="Enter Email" required>
        </div>

        <div class="form-field password">
            <label for="password">Password</label>
            <input id="password" v-model="model.password" type="password" name="password" placeholder="Enter Password" required>
        </div>
        <button type="submit" class="submit-button" @click.prevent="handleSubmit">Login</button>
    </form>
</template>

<script setup lang="ts">
    import useUserStore from '@/stores/user';
    const userStore = useUserStore();
    const model = defineModel<{
        email: string;
        password: string;
    }>('model', { required: true, default: () => ({ email: '', password: '' }) });
    const route = useRoute();

    const openModal = useModal();

    const handleSubmit = () => {
        try {
            const redirectPath = route.query.redirect as string || '/';
            userStore.login(model.value.email, model.value.password);
            openModal(`Login successful! Welcome back ${userStore.loggedInUser?.firstName}!`,
                () => navigateTo(redirectPath),
                () => navigateTo(redirectPath)
            );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            openModal(`Login failed: ${error.message}`);
        }
    };
</script>