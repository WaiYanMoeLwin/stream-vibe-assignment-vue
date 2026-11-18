<template>
    <div id="checkout">
    <section class="checkout-section">
        <h1 class="checkout-title">Checkout</h1>
        <form class="checkout-form">
            <div class="label">Select Plan:</div>
            <div class="form-field plan">
                <template v-for="plan in plans" :key="plan.id">
                    <input
                        :id="plan.id"
                        v-model="selectedPlanId"
                        type="radio"
                        :value="plan.id"
                    >
                    <label :for="plan.id">{{ plan.shortName }}</label>
                </template>
            </div>
            <div class="label">Select Billing Cycle:</div>
            <div class="form-field billing-cycle">
                <template v-for="cycle in billingCycles" :key="cycle.id">
                    <input
                        :id="cycle.id"
                        v-model="selectedBillingCycle"
                        type="radio"
                        :value="cycle.id"
                    >
                    <label :for="cycle.id">{{ cycle.label }}</label>
                </template>
            </div>
            <div class="form-field free-trial">
                <label for="free-trial">Free Trial:</label>
                <input id="free-trial" v-model="freeTrial" type="checkbox" name="free-trial">
            </div>
            <div class="label">Select Payment Method:</div>
            <div class="form-field payment-method">
                <template v-for="method in paymentMethods" :key="method">
                    <input
                        :id="method"
                        v-model="selectedPaymentMethod"
                        type="radio"
                        :value="method"
                    >
                    <label :for="method">{{ method }}</label>
                </template>
            </div>
            <div class="form-field card-number">
                <label for="card-number">Card Number: </label>
                <input id="card-number" v-model.trim="cardNumber" type="text" name="card-number" placeholder="Enter Card Number" required>
            </div>
            <div class="form-field expiration-date">
                <label for="expiration-date">Expiration Date: </label>
                <input id="expiration-date" v-model.trim="expirationDate" type="text" name="expiration-date" placeholder="MM/YY" required>
            </div>
            <div class="form-field cvv">
                <label for="cvv">CVV: </label>
                <input id="cvv" v-model.trim="cvv" type="text" name="cvv" placeholder="Enter CVV" required>
            </div>
            <span class="subtotal">
                Subtotal: <span class="subtotal-amount">
                    {{ currency.symbol }}{{ selectedPlan ? selectedPlan.price[selectedBillingCycle] : 0 }}
                </span>
            </span>
            <button type="submit" class="submit-button" @click.prevent="handleSubmit">Complete Purchase</button>
        </form>
    </section>
    </div>
</template>

<script setup lang="ts">
    import usePricingPlansStore from '@/stores/pricing-plans';
import useUserStore from '@/stores/user';
import { prepareSubscriptionDetails } from '@/utils/subscription-utils';
    definePageMeta({
        layout: 'minimal',
        title: 'Checkout'
    });
    const route = useRoute();
    const openModal = useModal();

    const paymentMethods = ['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay'];
    const pricingStore = usePricingPlansStore();
    const userStore = useUserStore();
    const { plans, billingCycles, currency } = storeToRefs(pricingStore);

    const selectedPlanId = ref<string>(route.query.plan as string || plans.value[0]?.id || '');
    const selectedBillingCycle = ref<string>(route.query.billingCycle as string || billingCycles.value[0]?.id || '');
    const freeTrial = ref<boolean>(route.query.freeTrial === 'true');
    const selectedPaymentMethod = ref<string>(paymentMethods[0]!);
    const cardNumber = ref<string>('');
    const expirationDate = ref<string>('');
    const cvv = ref<string>('');
    const selectedPlan = computed(() => plans.value.find(plan => plan.id === selectedPlanId.value));

    watch(cardNumber, (newVal) => {
        // Remove all non-digit characters
        const digitsOnly = newVal.replace(/\D/g, '');
        // Limit to 16 digits and group them in groups of 4
        cardNumber.value = digitsOnly.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    });

    watch(expirationDate, (newVal) => {
        // Remove all non-digit characters
        let digitsOnly = newVal.replace(/\D/g, '');
        // Remove padding zero
        digitsOnly = digitsOnly.replace(/^0/, '');
        if (digitsOnly.length === 3) {
            digitsOnly = '0' + digitsOnly; // Prepend a '0' if the user enters 3 digits
        }
        // Limit to 4 digits
        expirationDate.value = digitsOnly.slice(0, 2) + (digitsOnly.length > 2 ? '/' + digitsOnly.slice(2, 4) : '');
    });

    watch(cvv, (newVal) => {
        // Remove all non-digit characters
        const digitsOnly = newVal.replace(/\D/g, '');
        // Limit to 3 digits
        cvv.value = digitsOnly.slice(0, 3);
    });

    const handleSubmit = () => {
        if (!selectedPlan.value) {
            openModal('Please select a valid plan.');
            return;
        }
        if (!selectedBillingCycle.value) {
            openModal('Please select a billing cycle.');
            return;
        }
        if (!selectedPaymentMethod.value) {
            openModal('Please select a payment method.');
            return;
        }
        if (!cardNumber.value || !expirationDate.value || !cvv.value) {
            openModal('Please fill in all payment details.');
            return;
        }

        const subscriptionDetails = prepareSubscriptionDetails(selectedPlan.value, selectedBillingCycle.value, {
            cardNumber: cardNumber.value,
            expirationDate: expirationDate.value,
            cvv: cvv.value
        }, freeTrial.value);
        
        userStore.setActivePlan(subscriptionDetails);
        // Simulate successful purchase
        openModal(`Purchase successful! You have subscribed to the ${selectedPlan.value.shortName} plan with ${selectedBillingCycle.value} billing cycle.`,
            () => navigateTo('/subscriptions')
        );
    }
</script>