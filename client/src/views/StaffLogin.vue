<template>
    <div class="min-h-screen bg-primary-blue flex">
        <div class="login-rectangle relative m-auto">
        <img class="w-40 h-40 m-auto mt-8" src="../assets/logo.png" />
        <p class="manrope-regular text-3xl text-center mt-2 mb-4">
            Staff Sign In
        </p>
        <p
            class="manrope-bold error-msg-field text-center mb-8"
            id="error-msg"
            :class="{ invisible: state.error !== true }"
        >
            Invalid username or password
        </p>
        <div class="text-center">
            <form @submit.prevent="loginUser">
            <div class="relative">
                <input
                id="username"
                name="username"
                type="text"
                class="manrope-regular login-text-field"
                v-model.trim="state.username"
                />
                <label
                for="email"
                class="
                    absolute
                    manrope-regular
                    left-14
                    -top-3.5
                    text-gray-600 text-md
                "
                >Username</label
                >
            </div>
            <div class="relative mt-12">
                <input
                id="password"
                name="password"
                type="password"
                class="manrope-regular login-text-field"
                v-model.trim="state.password"
                />
                <label
                for="password"
                class="
                    absolute
                    manrope-regular
                    left-14
                    -top-3.5
                    text-gray-600 text-md
                "
                >Password</label
                >
            </div>
            <button 
                class="manrope-bold login-btn mt-10 transition duration-300 hover:bg-link-water hover:text-primary-blue" 
                id="login-btn"
            >
                Sign in
            </button>
            <p
                v-if="state.submitted"
                class="manrope-bold text-primary-blue text-md"
            >
                Signing in, please wait...
            </p>
            </form>
        </div>
        <router-link class="manrope-bold text-primary-blue" to="/">
            <span class="absolute bottom-16 right-16">Sign in as a client</span>
        </router-link>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { reactive } from 'vue';
import * as api from '../api';
export default {
    name: 'StaffLogin',
    setup() {
        const router = useRouter();
        const store = useStore();
        const state = reactive({
        username: '',
        password: '',
        error: false,
        submitted: false,
        });

        async function loginUser() {
        const data = {
            username: state.username,
            password: state.password,
        };
        try {
            state.submitted = true;
            const result = await api.signIn(data);
            console.log(result.data);

            if (result.data.flag == 0) {
                state.error = true;
            } else if (result.data.flag == 1) {
                store.dispatch('loginWorker', result.data);
                router.push({ name: `StaffViewOrder` });
            }
            // else router.push({ name: `Error` });
        } catch (err) {
            console.log(err.response.data);
            state.error = true;
        }
        state.submitted = false;
        }

        return { state, loginUser };
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap');

.login-rectangle {
    width: 35rem;
    height: 42rem;
    background: #ffffff;
    box-sizing: border-box;
    box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
}

.error-msg-field {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: red;
}

.login-text-field {
    outline: 0;
    border-width: 0 0 2px;
    border-bottom-color: #c4c4c4;
    width: 28rem;
    height: 3rem;
}

.login-text-field:focus {
    outline: 0;
    transition: 500ms;
    border-bottom-color: #0f4c81;
}

.login-btn {
    background-color: #0f4c81;
    color: white;
    border-radius: 20px;
    width: 28rem;
    height: 3rem;
}
</style>
