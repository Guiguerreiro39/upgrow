<template>
    {{ weekDays }}
</template>

<script>
import { daysFullMonth } from "./functions.js";
export default {
    data() {
        return {
            month: Number,
            day: Number,
            year: Number,
        };
    },
    created() {
        this.day = new Date().getDate();
        this.month = new Date().getMonth();
        this.year = new Date().getFullYear();
    },
    computed: {
        weekDays: function () {
            return daysFullMonth(this.month, this.year);
        },
    },
};
</script>

<style></style>
