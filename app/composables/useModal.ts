const modal = reactive({
    message: '',
    isOpen: false,
    open: () => {
        modal.isOpen = true;
    },
    close: () => {
        modal.isOpen = false;
    },
    okay: () => {
        modal.close();
    },
    cancel: () => {
        modal.close();
    }
})

function openModal(message: string, onOkay?: () => void, onCancel?: () => void) {
    modal.okay = () => {
        if (onOkay) onOkay();
        modal.close();
    };
    modal.cancel = () => {
        if (onCancel) onCancel();
        modal.close();
    };
    modal.message = message;
    modal.open();
}

export function getModal() {
    return modal;
}

export default function useModal() {
    return openModal;
}