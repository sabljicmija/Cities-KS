<script setup>
import AppInput from './AppInput.vue';
import { ref } from 'vue';
import AppButton from './AppButton.vue';
import authApi from '@/api/auth';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const isSingInMode = ref(true);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const isSubmitting = ref(false);

async function submit() {
    try {
        isSubmitting.value = true;
        if (!isSingInMode.value) {
            // Ako je registracija, pozivamo signup API
            const { token, user } = await authApi.signup({
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
            });

            localStorage.setItem('token', token);  // Spremamo token
            userStore.currentUser = user;  // Sprema korisnika u store

            router.push({ name: 'HomePage' });  // Preusmjeravanje na HomePage
            return;
        }

        // Ako je prijava, pozivamo login API
        const { token, user } = await authApi.login(email.value, password.value);

        localStorage.setItem('token', token);  // Spremamo token
        userStore.currentUser = user;  // Sprema korisnika u store
        router.push({ name: 'HomePage' });  // Preusmjeravanje na HomePage
    } catch (error) {
        console.error("Greška pri prijavi ili registraciji:", error);
    } finally {
        isSubmitting.value = false;  // Oslobađamo dugme nakon što završi proces
    }
}
</script>

<template>
    <form class="form pa-xl" @submit.prevent="submit">
        <h2 class="title mb-md">{{ isSingInMode ? 'Sign in' : 'Sign up' }}</h2>
        <div class="mb-md">
            <div v-if="!isSingInMode" class="flex gap-sm mb-md">
                <AppInput id="firstName" v-model="firstName" label="First name"/>
                <AppInput id="lastName" v-model="lastName" label="Last name"/> 
            </div>
            <AppInput id="email" v-model="email" label="Email" autocomplete="email" required class="mb-md"/>
            <AppInput id="password" v-model="password" label="Password" type="password" autocomplete="current-password" required/>
        </div>
        <AppButton type="submit" :label="isSingInMode ? 'Sign in' : 'Sign up'" primary class="mb-md"/>
        <p v-if="isSubmitting">...Submitting</p>
        <p class="toggle"> 
            {{ isSingInMode ? 'New here?' : 'Already have an account?' }}
            <a class="toggle-link" @click="isSingInMode = !isSingInMode">
                {{ isSingInMode ? 'Sign up' : 'Sign in' }}
            </a>
        </p>
    </form>
</template>

<style lang="css" scoped>
.form {
    background-image: var(--gradient-bg);
    width: 448px;
    max-width: 448px;
    border-radius: 9px;
}
.title {
    font-size: 36px;
    font-weight: 600;
}
.toggle {
    color: var(--on-bg);
}
.toggle-link {
    color: var(--primary);
    cursor: pointer;
    transition: text-decoration 1s;
}
.toggle-link:hover {
    text-decoration: underline;
}
</style>
