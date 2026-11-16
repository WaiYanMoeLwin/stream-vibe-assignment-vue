<template>
    <section id="features">
        <h2 class="feature-comparison-title">Compare our plans and find the right one for you</h2>
        <p class="feature-comparison-description">{{ description }}</p>

        <table :class="['feature-comparison-table', { 'hidden': isMobile}]">
            <thead>
                <tr :style="{gridTemplateColumns: `repeat(${plans.length + 1}, 1fr)`}">
                    <th><h3 class="feature-header-title">Features</h3></th>
                    <th v-for="plan in plans" :key="plan.id">
                        <h3 class="feature-header-title">{{ plan.shortName }}</h3>
                        <span v-if="plan.popular" class="popular-badge">Popular</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in comparisonRows" :key="row.key" :class="['feature-row', row.key]" :style="{gridTemplateColumns: `repeat(${plans.length + 1}, 1fr)`}">
                    <td>{{ row.label }}</td>
                    <td v-for="plan in plans" :key="plan.id" class="plan-cell">
                        <template v-if="row.key !== 'price'">
                            <span v-if="plan.features[row.key]">{{ plan.features[row.key] }}</span>
                            <span v-else class="not-available">N/A</span>
                        </template>
                        <span v-else>{{ currency.symbol }}{{ plan.price[billingCycles[0]!.id] }}{{ billingCycles[0]!.suffix }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <article :class="['feature-comparison-mobile', { 'hidden': !isMobile}]">
            <div class="plan-tab-container">
                <button
                    v-for="plan in plans"
                    :key="plan.id"
                    :class="['plan-tab', { 'active': selectedPlan!.id === plan.id }]"
                    @click="selectedPlan = plan"
                >
                    {{ plan.shortName }}
                </button>
            </div>
            <div class="features-container">
                <div v-for="row in comparisonRows" :key="row.key" :class="['feature-container', row.key]">
                    <span class="feature-name">{{ row.label }}</span>
                    <span v-if="row.key !== 'price'" class="feature-value">{{ selectedPlan!.features[row.key] }}</span>
                    <span v-else class="feature-value">{{ currency.symbol }}{{ selectedPlan!.price[billingCycles[0]!.id] }}{{ billingCycles[0]!.suffix }}</span>
                </div>
            </div>
        </article>
    </section>
</template>

<script setup lang="ts">
import usePricingPlansStore from '@/stores/pricing-plans';
const pricingPlansStore = usePricingPlansStore();
const { plans, comparisonRows, description, currency, billingCycles } = storeToRefs(pricingPlansStore);
const viewport = useViewport();
const isMobile = computed(() => viewport.isLessThan('tablet'));
const selectedPlan = ref(plans.value[0]);
</script>