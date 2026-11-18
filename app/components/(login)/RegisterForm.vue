<template>
    <form class="register-form">
                <div class="form-field first-name">
                    <label for="first-name">First Name</label>
                    <input id="first-name" v-model="model.firstName" type="text" name="first-name" placeholder="Enter First Name" required>
                </div>

                <div class="form-field last-name">
                    <label for="last-name">Last Name</label>
                    <input id="last-name" v-model="model.lastName" type="text" name="last-name" placeholder="Enter Last Name" required>
                </div>

                <div class="form-field email">
                    <label for="email">Email</label>
                    <input id="email" v-model="model.email" type="email" name="email" placeholder="Enter Email" required>
                </div>

                <div class="form-field password">
                    <label for="password">Password</label>
                    <input id="password" v-model="model.password" type="password" name="password" placeholder="Enter Password" required>
                </div>
                <button type="submit" class="submit-button" @click.prevent="handleSubmit">Register</button>
            </form>
</template>

<script setup lang="ts">
    import useUserStore from '@/stores/user';
    const model = defineModel<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }>('model', { required: true, default: () => ({ firstName: '', lastName: '', email: '', password: '' }) });
    const openModal = useModal();
    const userStore = useUserStore();
    const emit = defineEmits<{
        (e: 'success'): void;
    }>();

    const handleSubmit = () => {
        try {
            userStore.verifyUserRegistration(model.value.firstName, model.value.lastName, model.value.email, model.value.password);
            openModal(`Registration successful! Welcome ${model.value.firstName}! You can now log in.`,
                () => emit('success')
            );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            openModal(`Registration failed: ${error.message}`);
        }
    };
</script>