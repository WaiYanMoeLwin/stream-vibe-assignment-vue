<template>
    <Teleport to="body">
        <div v-if="props.isOpen" class="message-screen">
        <div class="message-box">
            <button class="message-close-button" @click="onClose">
                <img src="/images/icons/close.svg" alt="Close Message">
            </button>
            <p class="message-text">{{ props.message }}</p>

            <button ref="ok-button" class="message-ok-button"  @click="onOkay">
                OK
            </button>
        </div>
    </div>
    </Teleport>
</template>

<script setup lang="ts">
    const props = defineProps<{
        message: string;
        isOpen: boolean;
    }>();
    const emit = defineEmits<{
        (e: 'okay' | 'close'): void;
    }>();
    const okButton = useTemplateRef<HTMLButtonElement | null>('ok-button');
    
    const onOkay = () => {
        emit('okay');
    };
    const onClose = () => {
        emit('close');
    };
    
    watch(() => props.isOpen, () => {
        if (props.isOpen) {
            nextTick(() => {
                okButton.value?.focus();
            });
        }
    });
</script>