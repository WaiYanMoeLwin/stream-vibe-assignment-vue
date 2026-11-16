<template>
    <div class="scrollbar hidden" @click="handleClick">
        <div
            class="scrollbar-thumb"
            :style="{ width: `${props.thumbWidth}%`, left: `${thumbPosition}%` }"
            @mousedown="handleThumbDrag"
        />
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        thumbWidth: number;
        scrollPercentage: number;
    }>();
    const emits = defineEmits<{
        (e: 'scroll', percentage: number): void;
    }>();
    
    const thumbPosition = computed(() => (100 - props.thumbWidth) * (props.scrollPercentage / 100));

    const handleClick = (event: MouseEvent) => {
        const scrollbar = event.currentTarget as HTMLElement;
        const clickPosition = event.offsetX;
        const newScrollPercentage = (clickPosition / scrollbar.clientWidth) * 100;
        emits('scroll', newScrollPercentage);
    }
    
    const handleThumbDrag = (event: MouseEvent) => {
        event.preventDefault();
        const scrollThumb = event.currentTarget as HTMLElement;
        const scrollbar = scrollThumb.parentElement as HTMLElement;
        const initialX = event.clientX;
        const initialLeft = parseFloat(getComputedStyle(scrollbar).left);

        const onMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - initialX;
            const newLeft = Math.min(Math.max(initialLeft + deltaX, 0), scrollbar.clientWidth - (props.thumbWidth / 100) * scrollbar.clientWidth);
            const newScrollPercentage = (newLeft / (scrollbar.clientWidth - (props.thumbWidth / 100) * scrollbar.clientWidth)) * 100;
            emits('scroll', newScrollPercentage);
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

</script>