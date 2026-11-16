<template>
  <NuxtAnnouncer />
  <NuxtLayout>
    <NuxtPage />
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

contentStore.loadContent();
devicesStore.loadDevices();
faqsStore.loadFaqs();
pricingPlansStore.loadPricingPlans();
</script>

<style lang="scss">
@use './assets/scss/main.scss';
</style>
