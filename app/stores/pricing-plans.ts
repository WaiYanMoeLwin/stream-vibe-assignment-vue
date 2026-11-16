

const usePricingPlansStore = defineStore('pricingPlans', {
    state: () => ({
        plans: [] as PricingPlan[],
        billingCycles: [] as BillingCycle[],
        currency: {} as Currency,
        description: '',
        comparisonRows: [] as { key: string; label: string }[],
    }),
    actions: {
        loadPricingPlans() {
            if (this.plans.length > 0) {
                return;
            }

            const mockData = $fetch('http://localhost:3000/temp/pricing-plans.json');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mockData.then((data: any) => {
                this.plans = data.plans;
                this.billingCycles = data.billingCycles;
                this.currency = data.currency;
                this.description = data.comparisonDescription;
                this.comparisonRows = data.comparisonRows;
            });
        }
    }
});

export interface PricingPlan {
    id: string;
    name: string;
    shortName: string;
    popular: boolean;
    description: string;
    price: Record<string, number>; // Keyed by billing cycle ID
    freeTrialDays: number;
    features: Record<string, string | number>;
}

export interface BillingCycle {
    id: string;
    label: string;
    suffix: string;
}

export interface Currency {
    code: string;
    symbol: string;
}

export default usePricingPlansStore;