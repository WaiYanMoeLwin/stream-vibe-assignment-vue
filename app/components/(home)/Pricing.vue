<template>
    <section id="pricing">
        <header class="section-header">
            <article>
                <h2 class="section-title">Choose the plan that's right for you</h2>
                <p class="section-description">
                    {{ description }}
                </p>
            </article>
            <div class="billing-cycles-selector">
                <button
                    v-for="cycle in billingCycles"
                    :key="cycle.id"
                    :class="['billing-cycle-button', { 'active': cycle.id === selectedBillingCycle!.id }]"
                    @click="selectedBillingCycle = cycle"
                >
                    {{ cycle.label }}
                </button>
            </div>
        </header>
        <div class="pricing-cards">
            <div v-for="plan in plans" :key="plan.id" class="pricing-card">
                <h3 class="plan-title">{{ plan.name }}</h3>
                <p class="plan-description">{{ plan.description }}</p>
                <div class="plan-price">
                    <span class="plan-price-numeric">{{ currency.symbol }}{{ plan.price[selectedBillingCycle!.id] }}</span>
                    <span class="plan-price-suffix">/ {{ selectedBillingCycle!.label }}</span>
                </div>
                <div class="pricing-card-buttons-container">
                    <button class="start-free-trial-button" @click="navigateTo({ path: '/checkout', query: { plan: plan.id, billingCycle: selectedBillingCycle!.id, freeTrial: true } })">Start Free Trial</button>
                    <button class="choose-plan-button" @click="navigateTo({ path: '/checkout', query: { plan: plan.id, billingCycle: selectedBillingCycle!.id } })">Choose Plan</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import usePricingPlansStore from '@/stores/pricing-plans';
    const pricingPlansStore = usePricingPlansStore();
    const { plans, billingCycles, currency, description } = storeToRefs(pricingPlansStore);
    const selectedBillingCycle = ref(billingCycles.value[0]);
</script>