import { defineStore } from 'pinia';

const useDevicesStore = defineStore('devices', {
    state: () => ({
        devices: [] as Device[],
    }),
    actions: {
        async loadDevices() {
            if (this.devices && this.devices.length > 0) {
                return;
            }

            const mockDevices: Device[] = await $fetch('http://localhost:3000/temp/devices.json');
            this.devices = mockDevices;
        }
    }
});

interface Device {
    id: string;
    name: string;
    icon: string;
    description: string;
    platforms: string[];
}

export default useDevicesStore;