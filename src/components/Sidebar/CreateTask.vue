<template>
    <div class="modal" @keyup.enter="createTask">
        <DatePicker :selectedDate="date" @setDate="setDate" />
        <div class="form">
            <input
                type="text"
                class="input col-span-4 focus:outline-none"
                placeholder="Input task here"
                v-model="task"
            />
            <select v-model="type" class="select col-span-2 focus:outline-none">
                <option
                    v-for="[key, value] in types"
                    :key="value.id"
                    :value="value.id"
                    class="capitalize"
                >
                    {{ key }}
                </option>
            </select>
        </div>
        <div class="grid grid-cols-2 w-full">
            <button
                class="button bg-blue-300 hover:bg-blue-400 focus:outline-none"
                @click="createTask"
            >
                Create Task
            </button>
            <button
                class="button bg-red-500 hover:bg-red-600 focus:outline-none"
                @click="this.$emit('closeModal')"
            >
                Close
            </button>
        </div>
    </div>
</template>

<script>
import DatePicker from "../Calendar/DatePicker.vue";
import { taskTypes } from "../../utils/constants.js";

export default {
    components: {
        DatePicker,
    },
    inject: ["store"],
    data() {
        return {
            task: "",
            type: 0,
            count: 0,
            date: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
            ),
        };
    },
    computed: {
        types: function () {
            var types = [];

            for (var type in taskTypes) {
                types.push([type, taskTypes[type]]);
            }

            return types;
        },
    },
    methods: {
        createTask(e) {
            var task = {
                id: this.count,
                value: this.task,
                active: true,
                type: this.type,
            };

            if (task.value.length > 46) {
                alert("Limit characters surpassed!");
            } else if (task.value.length > 0) {
                if (
                    Object.keys(this.store.state.tasks).indexOf(
                        this.date.toString()
                    ) == -1
                ) {
                    this.store.initTasks(this.date);
                }

                this.store.createTask(task, this.date);
                this.count++;
                this.$emit("closeModal");
            }

            this.task = "";
        },
        setDate(date) {
            this.date = new Date(date);
        },
    },
};
</script>

<style lang="postcss" scoped>
.button {
    @apply p-2 text-gray-800 font-medium col-span-1;
}
.modal {
    @apply absolute bottom-2 z-40 text-black flex flex-col justify-start items-center w-1/4 h-auto shadow;
    left: 16.5rem;
}
.form {
    @apply grid grid-cols-6 w-full;
}
.input {
    @apply py-2 px-4 bg-white;
}
.select {
    @apply text-gray-800 py-2 px-4 bg-blue-100 capitalize;
}
</style>
