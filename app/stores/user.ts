import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
    state: () => ({
        currentId: 0,
        users: [] as User[],
        loggedInUser: null as User | null,
    }),
    persist: {
        key: 'userStore',
        storage: localStorage,
    },
    actions: {
        addUser(user: User) {
            this.users.push(user);
        },
        login(email: string, password: string) {
            const user = this.users.find(u => u.email === email && u.password === password);
            if (user) {
                this.loggedInUser = user;
                return true;
            }
            throw new Error('Invalid email or password');
        },
        logout() {
            this.loggedInUser = null;
        },
        verifyUserRegistration(firstName: string, lastName: string, email: string, password: string): boolean {
            if (!firstName || !lastName || !email || !password) {
                throw new Error('All fields are required');
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error('Invalid email format');
            }
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
            // Check if the email is already registered
            const existingUser = this.users.find(u => u.email === email);
            if (existingUser) {
                throw new Error('Email already registered');
            }
            this.currentId++;

            this.addUser({ id: this.currentId, firstName, lastName, email, password });
            return true; // Registration successful
        }
    }
});

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default useUserStore;