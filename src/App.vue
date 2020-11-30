<template>
    <Sidebar @selected="changeSelected" :selected="selected" />
    <main class="ml-80 h-screen">
        <Home v-if="selected == 0" />
    </main>
</template>

<script>
import Home from "./components/Home/Home.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";

import { store } from "./store.js";

export default {
    name: "App",
    components: {
        Home,
        Sidebar,
    },
    provide: {
        store,
    },
    data() {
        return {
            selected: 0,
        };
    },
    methods: {
        changeSelected(value) {
            this.selected = value;
        },
    },
};
</script>
