<template>
    <div class="h-full list-div">
        <h1>Not Started</h1>
        <ul v-if="activeTasks.length > 0">
            <li
                v-for="(task, index) in activeTasks"
                :key="task.id"
                @click="this.$emit('toggle', task.id)"
                class="list-item"
                :active="task.active"
            >
                <span
                    class="text-gray-100"
                    :class="{
                        'bg-red-500': task.difficulty == 2,
                        'bg-green-400': task.difficulty == 0,
                        'bg-yellow-400': task.difficulty == 1,
                    }"
                    >{{ index + 1 }}</span
                >
                <p class="list-text">
                    {{ task.value }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["activeTasks"],
};
</script>

<style></style>
