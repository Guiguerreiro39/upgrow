<template>
    <div class="h-full list-div">
        <h1>Completed</h1>
        <ul v-if="finishedTasks.length > 0">
            <li
                v-for="task in finishedTasks"
                :key="task.id"
                @click="this.$emit('toggle', task.id)"
                class="list-item"
                :active="task.active"
            >
                <p class="list-text">
                    {{ task.value }}
                </p>
                <span
                    @click="this.$emit('delete', task.id)"
                    class="text-lg bg-gray-700 cursor-pointer hover:bg-gray-800"
                >
                    <TrashCanOutline class="text-gray-100 text-2xl" />
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import { TrashCanOutline } from "mdue";
export default {
    components: {
        TrashCanOutline,
    },
    props: ["finishedTasks"],
};
</script>

<style></style>
