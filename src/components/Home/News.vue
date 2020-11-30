<template>
    <div class="news">
        <div class="articles" v-if="typeof news.articles != 'undefined'">
            <div
                class="card"
                v-for="(article, index) in filterArticles"
                :key="index"
                @click="openNews(article.url)"
            >
                <div class="thumbnail">
                    <img :src="article.urlToImage" :alt="Image" class="image" />
                    <p class="date">
                        {{ new Date(article.publishedAt).toDateString() }}
                    </p>
                </div>
                <div class="content">
                    <h1 class="title">{{ article.title }}</h1>
                    <p class="description">
                        {{ article.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["country"],
    data() {
        return {
            url: "http://newsapi.org/v2/top-headlines",
            key: import.meta.env.VITE_NEWS_API_KEY,
            news: {},
            category: "general",
        };
    },
    watch: {
        country: function () {
            this.fetchAPI();
        },
    },
    methods: {
        fetchAPI() {
            fetch(
                `${this.url}?country=${this.country}&category=${this.category}&apiKey=${this.key}`
            )
                .then((res) => res.json())
                .then((res) => (this.news = res))
                .then(() => {
                    if (this.news.articles.length === 0) {
                        this.country = "us";
                    }
                });
        },
        openNews(url) {
            window.open(url, "_blank");
        },
    },
    computed: {
        filterArticles: function () {
            return this.news.articles.filter((article) => {
                if (article.urlToImage) {
                    article.title = article.title
                        .split(" - ")
                        .slice(0, -1)
                        .join(" - ");
                    return article;
                }
            });
        },
    },
};
</script>

<style scoped lang="postcss">
.news {
    @apply overflow-auto relative;
}
.news:after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(229, 231, 235, 1)
    );
    width: 97%;
    height: 1.5em;
}
::-webkit-scrollbar {
    padding-bottom: 2rem;
}
.articles {
    @apply h-full overflow-auto;
}
.card {
    @apply bg-white shadow rounded-lg h-36 grid grid-cols-5 gap-7 justify-between p-4 overflow-hidden mb-4 cursor-pointer mr-1;
}
.card ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
.content {
    @apply col-span-3 h-full overflow-scroll;
}
.title {
    @apply font-medium text-sm pb-3;
}
.description {
    @apply text-xs;
}
.thumbnail {
    @apply col-span-2 flex flex-col justify-between;
}
.image {
    @apply object-cover rounded-lg;
}
.date {
    @apply text-xs;
}
</style>
