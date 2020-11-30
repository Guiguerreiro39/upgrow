<template>
    <div class="flex shadow items-center justify-between bg-white px-10">
        <div class="flex flex-col">
            <h2 class="task-number">{{ activeTasks.length }}</h2>
            <p class="task-description">Not done</p>
        </div>
        <div class="flex flex-col">
            <h2 class="task-number">
                {{ tasks.length }}
            </h2>
            <p class="task-description">Total</p>
        </div>
        <div class="flex flex-col">
            <h2 class="task-number">{{ finishedTasks.length }}</h2>
            <p class="task-description">Completed</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["tasks", "activeTasks", "finishedTasks"],
};
</script>

<style scoped lang="postcss">
.task-number {
    @apply text-4xl text-blue-300;
}
.task-description {
    @apply font-medium text-gray-700;
}
</style>
