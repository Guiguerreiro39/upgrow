<template>
    <div class="clock">
        <div class="num num1"></div>
        <div class="num num1-5"></div>
        <div class="num num2"></div>
        <div class="num num2-5"></div>
        <div class="num num3"></div>
        <div class="num num3-5"></div>
        <div class="num num4"></div>
        <div class="num num4-5"></div>
        <div class="num num5"></div>
        <div class="num num5-5"></div>
        <div class="num num6"></div>
        <div class="num num6-5"></div>
        <div class="num num7"></div>
        <div class="num num7-5"></div>
        <div class="num num8"></div>
        <div class="num num8-5"></div>
        <div class="num num9"></div>
        <div class="num num9-5"></div>
        <div class="num num10"></div>
        <div class="num num10-5"></div>
        <div class="num num11"></div>
        <div class="num num11-5"></div>
        <div class="num num12"></div>
        <div class="num num12-5"></div>

        <div
            class="hand"
            id="sec"
            :style="{
                transform: 'rotate(' + sec * 360 + 'deg)',
            }"
        >
            <div class="sec"></div>
        </div>
        <div
            class="hand"
            id="min"
            :style="{ transform: 'rotate(' + min * 360 + 'deg)' }"
        >
            <div class="min"></div>
        </div>
        <div
            class="hand"
            id="hour"
            :style="{ transform: 'rotate(' + hour * 360 + 'deg)' }"
        >
            <div class="hour"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sec: new Date().getSeconds() / 60,
            min: new Date().getMinutes() / 60,
            hour: new Date().getHours() / 12,
        };
    },
    created() {
        this.interval = setInterval(() => this.updateClock(), 1000);
    },
    methods: {
        updateClock() {
            var now = new Date();

            this.sec = now.getSeconds() / 60;
            this.min = now.getMinutes() / 60;
            this.hour = (now.getHours() + this.min) / 12;
        },
    },
};
</script>

<style scoped lang="postcss">
.clock {
    @apply relative w-32 h-32 rounded-full shadow-lg bg-white;
}
.clock:after {
    content: "";
    @apply absolute w-full h-full top-0 left-0;
}
.clock:before {
    content: "";
    @apply absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow z-10;
}
.hand {
    @apply absolute top-0 left-0 w-full h-full;
}
.hand div {
    @apply absolute left-1/2 transform -translate-x-1/2;
    bottom: 43%;
}
.sec {
    @apply w-0.5 rounded-lg bg-soft;
    height: 70%;
}
.min {
    @apply w-1 rounded-lg bg-light;
    height: 45%;
}
.hour {
    @apply w-1 rounded-lg bg-main;
    height: 35%;
}
.num {
    @apply absolute w-full h-full top-0 left-0 text-center text-xl font-medium p-2;
}
.num1:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-main rounded-lg;
    content: "";
}
.num1 {
    @apply transform rotate-30;
}
.num1-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num1-5 {
    @apply transform rotate-45;
}
.num2:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-main rounded-lg;
    content: "";
}
.num2 {
    @apply transform rotate-60;
}
.num2-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num2-5 {
    @apply transform rotate-75;
}
.num3:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-light rounded-lg;
    content: "";
}
.num3 {
    @apply transform rotate-90;
}
.num3-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num3-5 {
    @apply transform rotate-105;
}
.num4:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-main rounded-lg;
    content: "";
}
.num4 {
    @apply transform rotate-120;
}
.num4-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num4-5 {
    @apply transform rotate-135;
}
.num5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-main rounded-lg;
    content: "";
}
.num5 {
    @apply transform rotate-150;
}
.num5-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num5-5 {
    @apply transform rotate-165;
}
.num6:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-light rounded-lg;
    content: "";
}
.num6 {
    @apply transform rotate-180;
}
.num6-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num6-5 {
    @apply transform rotate-195;
}
.num7:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-main rounded-lg;
    content: "";
}
.num7 {
    @apply transform rotate-210;
}
.num7-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num7-5 {
    @apply transform rotate-225;
}
.num8:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-main rounded-lg;
    content: "";
}
.num8 {
    @apply transform rotate-240;
}
.num8-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num8-5 {
    @apply transform rotate-255;
}
.num9:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-light rounded-lg;
    content: "";
}
.num9 {
    @apply transform rotate-270;
}
.num9-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num9-5 {
    @apply transform rotate-285;
}
.num10:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-main rounded-lg;
    content: "";
}
.num10 {
    @apply transform rotate-300;
}
.num10-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num10-5 {
    @apply transform rotate-315;
}
.num11:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-main rounded-lg;
    content: "";
}
.num11 {
    @apply transform rotate-330;
}
.num11-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num11-5 {
    @apply transform rotate-345;
}
.num12:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-light rounded-lg;
    content: "";
}
.num12 {
    @apply transform rotate-360;
}
.num12-5:after {
    @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-soft rounded-lg;
    content: "";
}
.num12-5 {
    @apply transform rotate-15;
}
</style>
