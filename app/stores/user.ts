import { defineStore } from 'pinia';
import useContentStore from './content';

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
    getters: {
        getWatchlist: (state) => {
            const watchlistItems = state.loggedInUser?.watchlist || [];
            return watchlistItems.map(contentId => {
                const contentStore = useContentStore();
                // Assuming you have a function to fetch content details by ID
                return contentStore.getContentById(contentId);
            });
        },
        isInWatchlist: (state) => (contentId: string) => {
            return state.loggedInUser?.watchlist?.includes(contentId) || false;
        }
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
        },
        addToWatchlist(contentId: string) {
            if (!this.loggedInUser) {
                throw new Error('User not logged in');
            }
            if (!this.loggedInUser.watchlist) {
                this.loggedInUser.watchlist = [];
            }
            if (this.loggedInUser.watchlist.includes(contentId)) {
                throw new Error('Content already in watchlist');
            }
            this.loggedInUser.watchlist.push(contentId);
            // Update the user in the users array to reflect the change in watchlist
            const userIndex = this.users.findIndex(u => u.id === this.loggedInUser?.id);
            if (userIndex !== -1) {
                this.users[userIndex] = { ...this.loggedInUser };
            }
        },
        removeFromWatchlist(contentId: string) {
            if (!this.loggedInUser) {
                throw new Error('User not logged in');
            }
            if (!this.loggedInUser.watchlist) {
                throw new Error('Watchlist is empty');
            }
            const index = this.loggedInUser.watchlist.indexOf(contentId);
            if (index === -1) {
                throw new Error('Content not found in watchlist');
            }
            this.loggedInUser.watchlist.splice(index, 1);
            // Update the user in the users array to reflect the change in watchlist
            const userIndex = this.users.findIndex(u => u.id === this.loggedInUser?.id);
            if (userIndex !== -1) {
                this.users[userIndex] = { ...this.loggedInUser };
            }
        }
    }
});

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    watchlist?: string[];
}

export default useUserStore;