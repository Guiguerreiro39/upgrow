<template>
    <div
        v-if="typeof forecast.list != 'undefined'"
        class="grid grid-cols-2 gap-2"
    >
        <div
            v-for="(date, index) in forecastResults"
            :key="index"
            class="card"
            @click="setSelected(index)"
            :selected="index == selected"
        >
            <img
                v-bind:src="icon + date.card.icon + '@2x.png'"
                v-bind:alt="date.card.main"
                class="inline w-20"
            />
            <p class="date">
                <span class="day">{{ date.format[2] }}</span
                ><span class="opacity-70">{{ date.format[4] }}</span
                >, <span class="opacity-70">{{ date.format[0] }}</span>
            </p>
        </div>
    </div>
</template>

<script>
import { dayFormat } from "../../utils/functions.js";

export default {
    props: ["longitude", "latitude"],
    data() {
        return {
            key: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
            url: "https://api.openweathermap.org/data/2.5/forecast",
            icon: "http://openweathermap.org/img/wn/",
            forecast: {},
            selected: "",
        };
    },
    watch: {
        longitude: function () {
            this.fetchAPI();
        },
    },
    methods: {
        fetchAPI() {
            var sufix = `lat=${this.latitude}&lon=${this.longitude}`;

            fetch(`${this.url}?${sufix}&units=metric&appid=${this.key}`)
                .then((res) => res.json())
                .then((res) => (this.forecast = res));
        },
        format(date) {
            return dayFormat(date);
        },
        setSelected(value) {
            if (value == this.selected) {
                this.selected = "";
            } else {
                this.selected = value;
            }
        },
    },
    computed: {
        forecastResults: function () {
            var list = this.forecast.list;
            var results = {};

            for (var index in list) {
                var weather = list[index].weather[0];
                var temp = list[index].main.temp;
                var [date, hours] = list[index].dt_txt.split(" ");

                if (Object.keys(results).indexOf(date) === -1) {
                    results[date] = {
                        format: dayFormat(new Date(date)),
                        main: [],
                    };

                    results[date].card = weather;
                    results[date].temp = temp;
                }

                results[date].main.push({
                    hours: hours,
                    weather: weather,
                    temp: temp,
                });

                if (hours.includes("12")) {
                    results[date].card = weather;
                    results[date].temp = temp;
                }
            }

            return results;
        },
    },
};
</script>

<style scoped lang="postcss">
.date {
    @apply lowercase font-medium;
}
.date .day {
    @apply font-bold;
}
.date p {
    @apply font-medium capitalize;
}
.card {
    @apply col-span-1 bg-white text-dark shadow rounded-lg flex items-center justify-center cursor-pointer select-none;
}
.card[selected="true"] {
    @apply bg-main text-white;
}
.card img {
    @apply w-12;
}
</style>
