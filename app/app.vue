<template>
  <NuxtAnnouncer />
  <NuxtLayout>
    <NuxtPage />
    <MessageModal :message="modal.message" :is-open="modal.isOpen" @okay="modal.okay" @close="modal.cancel" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import useContentStore from '@/stores/content';
import useDevicesStore from '@/stores/devices';
import useFAQsStore from '@/stores/faqs';
import usePricingPlansStore from '@/stores/pricing-plans';
const contentStore = useContentStore();
const devicesStore = useDevicesStore();
const faqsStore = useFAQsStore();
const pricingPlansStore = usePricingPlansStore();

const modal = getModal();

onBeforeMount(async () => {
  await Promise.all([
    contentStore.loadContent(),
    devicesStore.loadDevices(),
    faqsStore.loadFaqs(),
    pricingPlansStore.loadPricingPlans()
  ]);
})
</script>

<style lang="scss">
@use './assets/styles/main.scss';
@use './assets/styles/support.scss';
@use './assets/styles/subscriptions.scss';
@use './assets/styles/movies-and-shows.scss';
@use './assets/styles/content-detail.scss';
@use './assets/styles/login.scss';
@use './assets/styles/checkout.scss';
</style>
