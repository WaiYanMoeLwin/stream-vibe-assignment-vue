

export default function useScroll(row: Ref<HTMLElement | null>) {
        
    const visibleContentPercentage = ref(0);
    const scrollPercentage = ref(0);

    const measuereVisibleContentPercentage = () => {
        if (row.value) {
            const totalWidth = row.value.scrollWidth;
            const visibleWidth = row.value.clientWidth;
            visibleContentPercentage.value = (visibleWidth / totalWidth) * 100;
        }
    };

    const measureScrollPercentage = () => {
        if (row.value) {
            const scrollLeft = row.value.scrollLeft;
            const totalWidth = row.value.scrollWidth - row.value.clientWidth;
            scrollPercentage.value = (scrollLeft / totalWidth) * 100;
        }
    };

    const handleScroll = (percentage: number) => {
        if (row.value) {
            const totalWidth = row.value.scrollWidth - row.value.clientWidth;
            row.value.scrollLeft = (percentage / 100) * totalWidth;
        }
    };

    let observer: ResizeObserver | null = null;
    onMounted(() => {
        const el = row.value;
        if (!el) return;
        observer = new ResizeObserver(measuereVisibleContentPercentage);
        observer.observe(el);
        Array.from(el.children).forEach(child => observer?.observe(child as Element));
        measuereVisibleContentPercentage();
    });
    onBeforeUnmount(() => observer?.disconnect());

    watchEffect(() => {
        if (row.value) {
            row.value.addEventListener('scroll', measureScrollPercentage);
        }
        return () => {
            if (row.value) {
                row.value.removeEventListener('scroll', measureScrollPercentage);
            }
        };
    });
    return {
        visibleContentPercentage,
        scrollPercentage,
        handleScroll
    };
}