<template>
    <div class="bg-gray-900 h-screen w-screen flex flex-col justify-center items-center text-white">
        <h1>Protected route</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    middleware: 'auth',
    data: () => {
        return{

        }
    },
    mounted() {
        console.log(this.$auth);
    },
    methods: {

    }
}
)
</script>

<style scoped>

</style>
