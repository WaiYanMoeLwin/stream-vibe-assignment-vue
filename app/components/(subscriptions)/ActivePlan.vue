<template>
    <section class="active-plan">
        <h2 class="section-title">Current Plan</h2>
        <div class="active-plan-details">
            <template v-if="hasActiveSubscription">
                <span class="plan-name-label">Plan: </span>
                <span class="plan-name">{{activePlan!.shortName}}</span>
                <span class="billing-cycle-label">Billing Cycle: </span>
                <span class="billing-cycle">{{activePlan!.billingCycle}}</span>
                <span class="renew-at-label">Next Billing Date: </span>
                <span class="renew-at">{{activePlan!.renewAt}}</span>
                <button class="cancel-subscription-button" @click="cancelSubscription">Cancel Subscription</button>
            </template>
            <p v-else class="no-active-plan-message">
                You currently do not have no active subscription plan.
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
    import useUserStore from '@/stores/user';
    const userStore = useUserStore();
    const hasActiveSubscription = computed(() => userStore.hasActivePlan);
    const {activePlan} = storeToRefs(userStore);
    const openModal = useModal();

    const cancelSubscription = () => {
        try {
            openModal('Are you sure you want to cancel your subscription?', () => {
                userStore.cancelActivePlan();
                openModal('Your subscription has been successfully canceled.');
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            openModal(`Failed to cancel subscription: ${error.message}`);
        }
    };
</script>