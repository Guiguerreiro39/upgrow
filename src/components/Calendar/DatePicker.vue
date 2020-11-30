<template>
    <div class="select-none bg-white shadow">
        <div class="header">
            <ArrowLeftDropCircleOutline class="arrow" @click="decrementMonth" />
            <h1 class="text-xl font-medium text-center">
                {{ dateMonth }} {{ dateYear }}
            </h1>
            <ArrowRightDropCircleOutline
                class="arrow"
                @click="incrementMonth"
            />
        </div>
        <div class="body">
            <table class="w-full table-fixed">
                <thead>
                    <th
                        v-for="(day, index) in dayList"
                        :key="index"
                        class="py-5"
                    >
                        {{ day }}
                    </th>
                </thead>
                <tbody class="text-center">
                    <tr v-for="(week, index) in weekDays" :key="index">
                        <td
                            v-for="(day, index) in week"
                            :key="index"
                            class="py-2 px-3 relative"
                        >
                            <p
                                class="day-item h-8 w-8 flex items-center justify-center m-auto"
                                :selected="isSelectedDay(day)"
                                @click="setDate(day)"
                                :class="{
                                    'hover:bg-gray-300 cursor-pointer':
                                        day != '' && !isPast(day),
                                    'text-gray-300': isPast(day),
                                }"
                            >
                                {{ day }}
                            </p>
                            <div
                                class="h-1 w-1 rounded-full m-auto absolute left-0 right-0 mt-1"
                                :class="{
                                    'bg-red-600': haveActiveTasks(day),
                                    'bg-green-700': !haveActiveTasks(day),
                                }"
                                v-if="haveTasks(day)"
                            ></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { monthList, dayList } from "../../utils/constants.js";
import { ArrowRightDropCircleOutline, ArrowLeftDropCircleOutline } from "mdue";
export default {
    components: {
        ArrowLeftDropCircleOutline,
        ArrowRightDropCircleOutline,
    },
    inject: ["store"],
    props: ["selectedDate"],
    data() {
        return {
            dayList: dayList,
            month: Number,
            year: Number,
        };
    },
    created() {
        this.month = this.selectedDate.getMonth();
        this.year = this.selectedDate.getFullYear();
    },
    computed: {
        dateMonth: function () {
            var date = new Date(this.year, this.month);
            this.year = date.getFullYear();

            if (this.month >= monthList.length) {
                this.month = 0;
            } else if (this.month < 0) {
                this.month = 11;
            }

            return monthList[this.month];
        },
        dateYear: function () {
            return this.year;
        },
        monthDays: function () {
            var month = this.month;
            var year = this.year;
            var date = new Date(year, month, "1");
            var days = {};

            while (date.getMonth() === month) {
                days[date.getDate()] = date.getDay();
                date.setDate(date.getDate() + 1);
            }

            return days;
        },
        weekDays: function () {
            var weeks = [];
            var days = [];

            for (var day in this.monthDays) {
                while (this.monthDays[day] != days.length) {
                    days.push("");
                }

                days.push(day);

                if (
                    this.monthDays[day] === 6 ||
                    parseInt(day) === Object.values(this.monthDays).length
                ) {
                    weeks.push(days);
                    days = [];
                }
            }

            if (weeks.length != 0) {
                while (weeks[weeks.length - 1].length !== 7) {
                    weeks[weeks.length - 1].push("");
                }
                if (weeks.length < 6) {
                    weeks[5] = [];
                    while (weeks[5].length !== 7) {
                        weeks[5].push("");
                    }
                }
            }

            return weeks;
        },
    },
    methods: {
        haveTasks(day) {
            var date = new Date(this.year, this.month, day);
            return (
                Object.keys(this.store.state.tasks).indexOf(date.toString()) !=
                    -1 && this.store.state.tasks[date].length > 0
            );
        },
        haveActiveTasks(day) {
            var date = new Date(this.year, this.month, day);
            var tasks = this.store.state.tasks[date];
            var result = false;

            tasks.forEach((task) => {
                if (task.active) {
                    result = true;
                }
            });

            return result;
        },
        setDate(day) {
            if (day !== "" && !this.isPast(day)) {
                var date = new Date(this.selectedDate);

                date.setDate(day);
                date.setMonth(this.month);
                date.setYear(this.year);

                this.$emit("setDate", date);
            }
        },
        incrementMonth() {
            this.month++;
        },
        decrementMonth() {
            this.month--;
        },
        isSelectedDay(day) {
            var selectedMonth = this.selectedDate.getMonth();
            var selectedDay = this.selectedDate.getDate();
            var selectedYear = this.selectedDate.getFullYear();

            return (
                day == selectedDay &&
                this.month == selectedMonth &&
                this.year == selectedYear
            );
        },
        isPast(day) {
            var date = new Date(this.year, this.month, day);
            var today = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
            );

            return date < today;
        },
    },
};
</script>

<style scoped lang="postcss">
.header {
    @apply flex justify-between items-center py-3 px-5 bg-blue-300 text-gray-800;
}
.day-item {
    @apply rounded-full font-medium;
}
.day-item[selected="true"] {
    @apply bg-yellow-600 text-white;
}
.arrow {
    @apply cursor-pointer text-2xl;
}
.body {
    @apply text-gray-700;
}
</style>
