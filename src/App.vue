<template>
    <Sidebar @selected="changeSelected" :selected="selected" />
    <main class="ml-80 h-screen">
        <Home v-show="selected == 0" />
        <Scheduler v-show="selected == 1" />
    </main>
</template>

<script>
import Home from "./components/Home/Home.vue";
import Scheduler from "./components/Calendar/Scheduler.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";

import { store } from "./store.js";

export default {
    name: "App",
    components: {
        Home,
        Scheduler,
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
