<template>
    <footer>
        <section class="footer-links">
            <div class="footer-column">
                <h3 class="footer-column-title"><NuxtLink to="/">Home</NuxtLink></h3>
                <ul class="footer-column-list">
                    <li><NuxtLink to="/#categories">Categories</NuxtLink></li>
                    <li><NuxtLink to="/#devices">Devices</NuxtLink></li>
                    <li><NuxtLink to="/#pricing">Pricing</NuxtLink></li>
                    <li><NuxtLink to="/#faq">FAQ</NuxtLink></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3 class="footer-column-title"><NuxtLink to="/movies-and-shows">Movies</NuxtLink></h3>
                <ul class="footer-column-list">
                    <li><NuxtLink to="/movies-and-shows#movies-genres">Genres</NuxtLink></li>
                    <li><NuxtLink to="/movies-and-shows#movies-trending">Trending</NuxtLink></li>
                    <li><NuxtLink to="/movies-and-shows#movies-new-releases">New Releases</NuxtLink></li>
                    <li><NuxtLink to="/movies-and-shows#movies-popular">Popular</NuxtLink></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3 class="footer-column-title"><NuxtLink to="/movies-and-shows">Shows</NuxtLink></h3>
                <ul class="footer-column-list">
                    <li><NuxtLink to="/movies-and-shows#shows-genres">Genres</NuxtLink></li>
                    <li><NuxtLink to="/movies-and-shows#shows-trending">Trending</NuxtLink></li>
                    <li><NuxtLink to="/movies-and-shows#shows-new-releases">New Releases</NuxtLink></li>
                    <li><NuxtLink to="/movies-and-shows#shows-popular">Popular</NuxtLink></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3 class="footer-column-title"><NuxtLink to="/support">Support</NuxtLink></h3>
                <ul class="footer-column-list">
                    <li><NuxtLink to="/support">Contact Us</NuxtLink></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3 class="footer-column-title"><NuxtLink to="/subscriptions">Subscriptions</NuxtLink></h3>
                <ul class="footer-column-list">
                    <li><NuxtLink to="/subscriptions#plans">Plans</NuxtLink></li>
                    <li><NuxtLink to="/subscriptions#features">Features</NuxtLink></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3 class="footer-column-title">Connect With Us</h3>
                <ul class="social-media-links">
                    <li><a 
                        href="https://www.facebook.com" class="social-media-link" target="_blank"
                            rel="noopener noreferrer">
                            <img src="/images/icons/facebook.svg" alt="Facebook">
                        </a>
                    </li>
                    <li><a 
                        href="https://www.x.com" class="social-media-link" target="_blank"
                            rel="noopener noreferrer">
                            <img src="/images/icons/x.svg" alt="X">
                        </a>
                    </li>
                    <li><a 
                        href="https://www.instagram.com" class="social-media-link" target="_blank"
                            rel="noopener noreferrer">
                            <img src="/images/icons/instagram.svg" alt="Instagram">
                        </a>
                    </li>
                </ul>
            </div>
        </section>

        <section class="footer-info">
            <p>&copy; 2023 StreamVibe. All rights reserved.</p>
            <div class="footer-legal-links">
                <a href="terms-of-use.html">Terms of Use</a> |
                <a href="privacy-policy.html">Privacy Policy</a> |
                <a href="cookie-policy.html">Cookie Policy</a>
            </div>
        </section>
    </footer>
</template>

<script setup lang="ts"></script>