<template>
    <div
        class="flex justify-between full"
        v-if="typeof weather.main != 'undefined'"
    >
        <div class="main">
            <p class="location">
                {{ weather.name }},
                <span class="opacity-60">{{ weather.sys.country }}</span>
            </p>
            <p class="today">
                <span class="day">{{ todayFormat[2] }}</span
                ><span class="opacity-90">{{ todayFormat[4] }}</span
                >, <span class="opacity-90">{{ todayFormat[0] }}</span>
            </p>
        </div>
        <div class="weather">
            <div class="temperature">
                <p class="text-4xl font-medium pb-2">
                    <span
                        v-if="Math.round(weather.main.temp) > 0"
                        class="font-light"
                        >+</span
                    >{{ Math.round(weather.main.temp) }}º
                </p>
                <p class="w-14 text-sm opacity-60">
                    {{ weather.weather[0].description }}
                </p>
            </div>
            <img
                v-bind:src="icon + weather.weather[0].icon + '@2x.png'"
                v-bind:alt="weather.weather[0].main"
                class="inline w-20"
            />
        </div>
    </div>
</template>

<script>
import { dayFormat } from "../../utils/functions.js";

export default {
    name: "Weather",
    props: ["latitude", "longitude"],
    data() {
        return {
            key: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
            url: "https://api.openweathermap.org/data/2.5/weather",
            icon: "http://openweathermap.org/img/wn/",
            query: "",
            weather: {},
        };
    },
    watch: {
        longitude: function () {
            this.fetchAPI();
        },
    },
    methods: {
        fetchAPI() {
            if (this.query.length > 0) {
                var sufix = `q=${this.query}`;
            } else {
                var sufix = `lat=${this.latitude}&lon=${this.longitude}`;
            }

            fetch(`${this.url}?${sufix}&units=metric&appid=${this.key}`)
                .then((res) => res.json())
                .then((res) => {
                    this.weather = res;
                    this.$emit("country", this.weather.sys.country);
                });
        },
    },
    computed: {
        todayFormat: function () {
            return dayFormat(new Date());
        },
    },
};
</script>

<style scoped lang="postcss">
.main {
    @apply flex flex-col justify-between h-full py-8 text-xl;
}
.today {
    @apply lowercase font-medium;
}
.today .day {
    @apply font-bold text-2xl;
}
.today p {
    @apply font-medium capitalize;
}
.location {
    @apply font-bold text-xl;
}
.weather {
    @apply h-full flex items-center justify-center;
}
.temperature {
    @apply flex flex-col text-center items-center;
}
</style>
