<template>
    <div class="w-full h-full">
        <canvas id="myChart" width="100%" height="100%"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";
import { computed, onMounted, watchEffect } from "vue";
import { store } from "../../store.js";

export default {
    setup() {
        const tasks = computed(() => store.sortedTasks());
        const updateLabels = computed(() =>
            tasks.value.map((day, index) => {
                return new Date(day).toDateString();
            })
        );
        const updateData = computed(() =>
            tasks.value.map((day, index) => {
                return store.percentage(day);
            })
        );

        var labels = updateLabels.value;
        var data = updateData.value;

        onMounted(() => {
            const ctx = document.getElementById("myChart");
            var chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "% tasks completed",
                            data: data,
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgba(255, 99, 132, 1)",
                        },
                    ],
                },
            });

            watchEffect(() => {
                labels = updateLabels.value;
                data = updateData.value;

                chart.data.labels = labels;
                chart.data.datasets[0].data = data;
                chart.update();
            });
        });
    },
};
</script>

<style></style>
