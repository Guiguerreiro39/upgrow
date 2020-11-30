<template>
    <div class="shadow bg-white">
        <nav class="flex bg-gray-300 mb-6 text-gray-800">
            <ul class="flex items-center">
                <li
                    class="nav-difficult-item hover:bg-blue-800 hover:bg-opacity-25 border-r-2 border-gray-500"
                    v-for="(item, index) in navItems"
                    :selected="selected == item"
                    :key="index"
                    @click="selected = item"
                >
                    {{ item }}
                </li>
            </ul>
        </nav>
        <div
            class="flex items-start justify-center full"
            v-if="selected == navItems[0]"
        >
            <VueApexCharts
                type="donut"
                width="120%"
                :options="donutOptions"
                :series="donutSeries"
            />
        </div>
        <div
            class="flex items-start justify-center full"
            v-if="selected == navItems[1]"
        >
            <VueApexCharts
                type="bar"
                width="120%"
                :options="barOptions"
                :series="barSeries"
            />
        </div>
    </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
export default {
    components: {
        VueApexCharts,
    },
    props: ["tasks"],
    data() {
        return {
            selected: "Total",
            navItems: ["Total", "Progress"],
            donutOptions: {
                chart: {
                    type: "donut",
                },
                labels: ["easy", "medium", "hard"],
                colors: ["#68d391", "#f6e05e", "#f56565"],
                legend: {
                    position: "right",
                    markers: {
                        radius: 1,
                    },
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                        },
                    },
                ],
            },
            barOptions: {
                chart: {
                    type: "bar",
                    toolbar: {
                        show: true,
                    },
                    zoom: {
                        enabled: true,
                    },
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            legend: {
                                position: "bottom",
                                offsetX: -10,
                                offsetY: 0,
                            },
                        },
                    },
                ],
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                xaxis: {
                    type: "string",
                    categories: ["easy", "medium", "hard"],
                    labels: {
                        style: {
                            colors: ["#68d391", "#f6e05e", "#f56565"],
                            fontWeight: 600,
                        },
                    },
                },
                legend: {
                    position: "right",
                    offsetY: 40,
                },
                fill: {
                    opacity: 1,
                },
            },
        };
    },
    computed: {
        donutSeries: function () {
            var series = [0, 0, 0];
            this.tasks.forEach((task) => {
                series[task.difficulty]++;
            });
            return series;
        },
        barSeries: function () {
            var total = this.donutSeries;
            var series = [
                {
                    name: "total",
                    data: [total[0], total[1], total[2]],
                    color: "#4299e1",
                },
                {
                    name: "completed",
                    data: [0, 0, 0],
                    color: "#dd6b20",
                },
            ];

            this.tasks.forEach((task) => {
                if (!task.active) {
                    series[1]["data"][task.difficulty]++;
                }
            });

            return series;
        },
    },
};
</script>

<style lang="postcss">
.apexcharts-legend.position-right {
    align-items: start;
}
.nav-difficult-item {
    @apply p-2 cursor-pointer;
}
.nav-difficult-item[selected="true"] {
    @apply bg-blue-500 bg-opacity-25;
}
</style>
