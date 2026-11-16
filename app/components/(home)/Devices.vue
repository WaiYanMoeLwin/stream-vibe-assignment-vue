<template>
    <section id="devices">
        <header class="section-header">
            <article>
                <h2 class="section-title">We Provide you streaming experience across various devices.</h2>
                <p class="section-description">
                    With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere.
                    Our platform is designed to be compatible with a wide range of devices, ensuring that you
                    never miss a moment of entertainment.
                </p>
            </article>
        </header>
        <article class="device-cards">
            <div v-for="device in devices" :key="device.id" class="device-container">
                <div class="device-header">
                    <img :src="device.icon" :alt="device.name">
                    <h3 class="device-name">{{device.name}}</h3>
                </div>
                <p class="device-description">{{device.description}}</p>
            </div>
        </article>
    </section>
</template>

<script setup lang="ts">
    import useDevicesStore from '@/stores/devices';
    const devicesStore = useDevicesStore();
    const { devices } = storeToRefs(devicesStore);
</script>