<template>
    <div class="bg-gray-900 h-screen w-screen flex flex-col justify-center items-center text-white">
        <h1 class="text-2xl">nuxt-auth <span class="text-purple-700">Login</span></h1>
        <div class="flex flex-col rounded-md w-96 h-auto p-10 mt-14 bg-gray-800">
            <form class="space-y-6" @submit="(e) => handleLoginSubmit(e, this.form)">
                <input type="hidden" name="remember" value="true">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="login" class="mb-2 block">Login</label>
                        <input v-model="form.login" id="login" name="email" type="text" autocomplete="login" required
                               class="appearance-none rounded-none relative block w-full px-3 py-2
                               border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none
                               focus:ring-purple-700 focus:border-indigo-500 focus:z-10 sm:text-sm">
                    </div>
                </div>
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="password" class="mb-2 block">Password</label>
                        <input v-model="form.password" id="password" name="password" type="password" autocomplete="current-password" required
                               class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                                placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500
                                 focus:border-purple-700 focus:z-10 sm:text-sm">
                    </div>
                </div>

                <div class="pt-8">
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <!-- Heroicon name: solid/lock-closed -->
                        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                      </span>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface LoginForm{
    login: String
    password: String
}

export default Vue.extend({
    name: "login",
    data: () => {
        return{
            form: {
                login: '',
                password: ''
            }
        }
    },
    mounted() {

    },
    methods: {
        handleLoginSubmit: async function (event: Event, loginForm: LoginForm) {
            try {
                event.preventDefault();
                let { login, password } = loginForm;
                await this.$auth.loginWith('local', {
                    data: {
                        login,
                        password
                    }
                })
                console.log(this.$auth);
                await this.$router.push('/protected');
            } catch (e) {
                console.log(e);
            }
        }
    }
}
)
</script>

<style scoped>

</style>
