<template>
    <section class="flex flex-col items-center full overflow-hidden">
        <div class="grid grid-cols-3 gap-5 full p-5">
            <div class="col-span-1 grid grid-rows-6 gap-2 text-center">
                <Active
                    @toggle="toggleTask"
                    class="row-span-4"
                    :activeTasks="activeTasks"
                />
            </div>
            <div class="col-span-1 grid grid-rows-6 gap-2 text-center">
                <Data
                    :tasks="store.state.tasks[date]"
                    :activeTasks="activeTasks"
                    :finishedTasks="finishedTasks"
                    class="row-span-1"
                />
                <DatePicker
                    class="row-span-4"
                    :selectedDate="date"
                    @setDate="setDate"
                />
                <AddTask @newTask="updateTasks" class="row-span-1" />
            </div>
            <div class="col-span-1 text-center">
                <Finished
                    @toggle="toggleTask"
                    @delete="deleteTask"
                    :finishedTasks="finishedTasks"
                />
            </div>
        </div>
    </section>
</template>

<script>
import AddTask from "./AddTask.vue";
import Data from "./Data.vue";
import Finished from "./Finished.vue";
import Active from "./Active.vue";
import DatePicker from "../Calendar/DatePicker.vue";

export default {
    components: {
        AddTask,
        Data,
        Finished,
        Active,
        DatePicker,
    },
    inject: ["store"],
    data() {
        return {
            tasks: {},
            date: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
            ),
        };
    },
    created() {
        this.store.initTasks(this.date);
    },
    computed: {
        activeTasks: function () {
            return this.store.state.tasks[this.date].filter((task) => {
                return task.active;
            });
        },

        finishedTasks: function () {
            return this.store.state.tasks[this.date].filter((task) => {
                return !task.active;
            });
        },

        percentage: function () {
            if (this.store.state.tasks[this.date].length == 0) {
                return 100;
            }

            if (this.deactiveTasks.length == 0) {
                return 0;
            }

            return (
                (this.deactiveTasks.length /
                    this.store.state.tasks[this.date].length) *
                100
            );
        },
    },
    methods: {
        deleteTask(id) {
            this.store.deleteTask(id, this.date);
        },
        toggleTask(id) {
            this.store.toggleTask(id, this.date);
        },
        updateTasks(value) {
            this.store.updateTasks(value, this.date);
        },
        setDate(value) {
            this.date = new Date(value);

            if (
                Object.keys(this.store.state.tasks).indexOf(
                    this.date.toString()
                ) == -1
            ) {
                this.store.initTasks(this.date);
            }
        },
    },
};
</script>

<style lang="postcss">
.list-item {
    @apply shadow bg-white mb-1 h-10 list-item flex justify-items-start items-center;
}
.list-item[active="false"] {
    @apply justify-between;
}
.list-item .list-text {
    @apply ml-5 text-lg text-gray-700 font-medium capitalize;
}
.list-item span {
    @apply flex items-center justify-center text-xl h-full w-10 font-medium;
}
.list-div h1 {
    @apply my-4 pb-2 text-xl border-b-2 border-gray-400 mx-10 font-medium text-gray-700;
}

.full {
    @apply w-full h-full;
}
</style>
