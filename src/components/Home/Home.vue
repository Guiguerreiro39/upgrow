<template>
    <section class="home full">
        <div class="header-card">
            <Header
                :latitude="latitude"
                :longitude="longitude"
                @country="setCountry"
            />
        </div>
        <div class="grid grid-cols-8 row-span-4">
            <div class="col-span-6">
                <Chart />
            </div>
            <div class="col-span-2 flex items-center justify-center h-full">
                <Clock />
            </div>
        </div>
        <div class="grid grid-cols-8 row-span-5 gap-4">
            <div class="col-span-3"></div>
            <News class="col-span-3 h-full" :country="country" />
            <Forecast
                :latitude="latitude"
                :longitude="longitude"
                class="col-span-2 h-full"
            />
        </div>
    </section>
</template>

<script>
import Header from "./Header.vue";
import Forecast from "./Forecast.vue";
import News from "./News.vue";
import Clock from "./Clock.vue";
import Chart from "./Chart.vue";

export default {
    components: {
        Header,
        Forecast,
        News,
        Chart,
        Clock,
    },
    data() {
        return {
            latitude: "",
            longitude: "",
            country: "",
        };
    },
    created() {
        if (!("geolocation" in navigator)) {
            this.loading = false;
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                this.loading = false;
                this.longitude = pos.coords.longitude;
                this.latitude = pos.coords.latitude;
            },
            (err) => {
                this.loading = false;
            }
        );
    },
    methods: {
        setCountry(value) {
            this.country = value;
        },
    },
};
</script>

<style scoped lang="postcss">
.home {
    @apply p-8 grid grid-rows-12 gap-2;
}
.header-card {
    @apply row-span-3 w-full rounded-xl text-white px-10 shadow-lg bg-main;
}
</style>
