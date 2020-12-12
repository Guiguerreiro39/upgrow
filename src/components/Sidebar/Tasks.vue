<template>
    <div class="tasks-day" v-for="(item, index) in formattedTasks" :key="index">
        <h2 class="day">
            <span class="font-bold">{{ item[0] }}</span
            >&nbsp;<span>{{ item[1] }}</span>
        </h2>
        <div
            class="card"
            :class="types[task.type].color"
            v-for="(task, index) in item[3]"
            :key="index"
            @click="toggleTask(task.id, item[2])"
        >
            <span class="task-icon" :class="types[task.type].iconColor">
                <component
                    :is="types[task.type].icon"
                    class="text-white text-xl"
                />
            </span>
            <p class="task-text">{{ task.value }}</p>
        </div>
    </div>
</template>

<script>
import { taskTypes } from "../../utils/constants.js";

export default {
    inject: ["store"],
    methods: {
        toggleTask(id, date) {
            this.store.toggleTask(id, date);
        },
    },
    computed: {
        types: function () {
            var types = [];

            for (var type in taskTypes) {
                types.push(taskTypes[type]);
            }

            types.sort(function (a, b) {
                return new Date(a.id) - new Date(b.id);
            });

            return types;
        },
        formattedTasks: function () {
            return this.store.formattedActiveTasks();
        },
    },
};
</script>

<style lang="postcss" scoped>
.tasks-day {
    @apply w-full;
}
.card {
    @apply h-14 rounded-lg grid grid-cols-4 items-center shadow my-3 cursor-pointer;
}
.day {
    @apply pt-4 text-sm font-medium;
}
.task-icon {
    @apply col-span-1 h-full flex items-center justify-center rounded-l-lg;
}
.task-text {
    @apply col-span-3 text-sm px-4 text-white;
}
</style>
