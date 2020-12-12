<template>
    <nav class="nav-bar">
        <div class="nav-header" @click="selectItem('Home')">
            <h1>-UPgrow-</h1>
        </div>
        <ul class="nav-list">
            <li
                class="nav-item hover:text-opacity-100"
                v-for="[key, value] in items"
                :key="value.id"
                :selected="value.id == selected"
                @click="selectItem(value.id)"
            >
                <component :is="value.icon" class="text-2xl" />
                <p class="capitalize pl-1" v-show="value.id == selected">
                    {{ key }}
                </p>
            </li>
        </ul>
        <div class="nav-content mt-10">
            <div class="nav-tasks">
                <Tasks />
            </div>
        </div>
        <div class="nav-footer">
            <button
                class="new-task focus:outline-none hover:bg-yellow-400"
                @click="toggleModal = !toggleModal"
            >
                Add Task
            </button>
        </div>
    </nav>
    <CreateTask v-show="toggleModal" @closeModal="toggleModal = false" />
</template>

<script>
import Tasks from "./Tasks.vue";
import CreateTask from "./CreateTask.vue";
import { navItems } from "../../utils/constants.js";

export default {
    name: "Sidebar",
    components: {
        Tasks,
        CreateTask,
    },
    props: ["selected"],
    data() {
        return {
            items: ["Home", "Calendar", "Settings"],
            toggleModal: false,
        };
    },
    computed: {
        items: function () {
            var items = [];

            for (var key in navItems) {
                items.push([key, navItems[key]]);
            }

            return items;
        },
    },
    methods: {
        selectItem(item) {
            this.$emit("selected", item);
        },
    },
};
</script>

<style lang="postcss" scoped>
.nav-bar {
    @apply bg-white h-screen w-80 fixed z-10 shadow text-main;
}
.nav-item {
    @apply cursor-pointer text-main text-opacity-50 font-medium flex items-center px-4;
}
.nav-item[selected="true"] {
    @apply text-light;
}
.nav-header {
    @apply mt-5 mb-10 text-xl flex justify-center cursor-pointer px-10;
}
.nav-list {
    @apply flex flex-row justify-center px-10;
}
.nav-content {
    @apply h-3/4 relative;
}
.nav-content:after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 1) 90%
    );
    width: 100%;
    height: 8em;
}
.nav-tasks {
    @apply h-full w-full overflow-y-scroll px-10 pb-16;
}
.nav-footer {
    @apply absolute inset-x-0 bottom-0 w-full text-center my-4 h-12 px-12 z-10;
}
.new-task {
    @apply bg-light h-full w-full rounded-lg shadow text-white font-medium;
}
::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
</style>
