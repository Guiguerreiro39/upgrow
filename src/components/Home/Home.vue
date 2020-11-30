<template>
    <section class="home full">
        <div class="header-card">
            <Header
                :latitude="latitude"
                :longitude="longitude"
                @country="setCountry"
            />
        </div>
        <div class="grid grid-cols-1 row-span-5"></div>
        <div class="grid grid-cols-8 row-span-4 gap-4">
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
import Statistics from "./Statistics.vue";
import Header from "./Header.vue";
import Forecast from "./Forecast.vue";
import News from "./News.vue";

export default {
    components: {
        Statistics,
        Header,
        Forecast,
        News,
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
    @apply p-10 grid grid-rows-12;
}
.header-card {
    @apply row-span-3 w-full rounded-xl text-white px-10 shadow-lg bg-main;
}
</style>
