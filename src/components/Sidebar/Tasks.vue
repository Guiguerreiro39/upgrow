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
import { monthList, taskTypes } from "../../utils/constants.js";

export default {
    inject: ["store"],
    methods: {
        toggleTask(id, date) {
            this.store.toggleTask(id, date);
        },
        activeTasks(date) {
            if (
                Object.keys(this.store.state.tasks).indexOf(date.toString()) ==
                -1
            ) {
                return [];
            }

            return this.store.state.tasks[date].filter((task) => {
                return task.active;
            });
        },
        formatDay(date, today) {
            if (date.getFullYear() == today.getFullYear()) {
                if (
                    date.getMonth() == today.getMonth() &&
                    date.getDate() == today.getDate()
                ) {
                    return "Today";
                }

                if (
                    date.getMonth() == today.getMonth() &&
                    date.getDate() == today.getDate() + 1
                ) {
                    return "Tomorrow";
                }

                if (
                    date.getMonth() == today.getMonth() + 1 &&
                    today.getDate() == 1
                ) {
                    return "Tomorrow";
                }
            }

            return "";
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
        sortedTasks: function () {
            var tasks = [];
            var today = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
            );

            for (var day in this.store.state.tasks) {
                if (
                    new Date(day) >= today &&
                    this.store.state.tasks[day].length > 0 &&
                    this.activeTasks(day).length > 0
                ) {
                    tasks.push([day, this.activeTasks(day)]);
                }
            }

            tasks.sort(function (a, b) {
                return new Date(a[0]) - new Date(b[0]);
            });

            return tasks;
        },
        formattedTasks: function () {
            var tasks = this.sortedTasks;
            var today = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
            );

            tasks = tasks.map((value) => {
                var date = new Date(value[0]);
                var format = this.formatDay(date, today);

                if (format.length > 0) {
                    return [format, "", date, value[1]];
                }

                var month = monthList[date.getMonth()];
                var day = date.getDate();
                return [day, month, date, value[1]];
            });

            return tasks;
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
