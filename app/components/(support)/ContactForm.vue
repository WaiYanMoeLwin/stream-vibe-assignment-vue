<template>
    <section id="contact-us">
        <article class="contact-us-content">
            <div class="contact-us-text">
                <h1 class="title">Welcome to our support page!</h1>
                <p class="description">
                    We're here to help you with any problems you may be having with our product.
                </p>
            </div>
            <div class="banner-image">
                <BackgroundMashup />
            </div>
        </article>
        <form id="contact-form" class="contact-form">
            <div class="form-field first-name">
                <label for="first-name">First Name</label>
                <input id="first-name" type="text" name="first-name" placeholder="Enter First Name" required>
            </div>

            <div class="form-field last-name">
                <label for="last-name">Last Name</label>
                <input id="last-name" type="text" name="last-name" placeholder="Enter Last Name" required>
            </div>
            <div class="form-field email">
                <label for="email">Email</label>
                <input id="email" type="email" name="email" placeholder="Enter your Email" required>
            </div>

            <div class="form-field phone">
                <label for="phone">Phone Number</label>
                <input id="phone" type="tel" name="phone" placeholder="Enter your Phone Number" required>
            </div>

            <div class="form-field message">
                <label for="message">Message</label>
                <textarea id="message" name="message" placeholder="Enter your Message" rows="5" required />
            </div>

            <div class="form-field form-footer">
                <div class="form-field privacy-policy">
                    <label for="privacy-policy">I agree with Terms of Use and Privacy Policy</label>
                    <input id="privacy-policy" type="checkbox" name="privacy-policy" required>
                </div>

                <button id="submit-button" type="submit">Send Message</button>

            </div>
        </form>
    </section>
</template>