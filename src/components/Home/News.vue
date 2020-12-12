<template>
    <div class="news">
        <h1 class="section">News</h1>
        <div class="articles" v-if="typeof news.articles != 'undefined'">
            <div
                class="card"
                v-for="(article, index) in filterArticles"
                :key="index"
            >
                <div class="thumbnail">
                    <img
                        :src="article.urlToImage"
                        :alt="Image"
                        class="image"
                        @click="openNews(article.url)"
                    />
                    <div class="social">
                        <component
                            :is="icon"
                            :class="{
                                favorite: item == 'favorite',
                                like: item == 'like',
                            }"
                            v-for="[item, icon] in socialIcons(index)"
                            :key="item"
                            @click="
                                selected[index][item] = !selected[index][item]
                            "
                        />
                        <ShareVariantOutline class="share" />
                    </div>
                </div>
                <div class="content" @click="openNews(article.url)">
                    <h1 class="title">
                        {{ article.title }}
                    </h1>
                    <p class="description">
                        {{ article.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { social } from "../../utils/constants.js";
import { ShareVariantOutline } from "mdue";

export default {
    components: {
        ShareVariantOutline,
    },
    props: ["country"],
    data() {
        return {
            url: "http://newsapi.org/v2/top-headlines",
            key: import.meta.env.VITE_NEWS_API_KEY,
            news: {},
            category: "general",
            selected: [],
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
                    console.log(this.news);
                });
        },
        openNews(url) {
            window.open(url, "_blank");
        },
        socialIcons(index) {
            var icons = [];
            for (var item in social) {
                if (this.selected[index][item]) {
                    icons.push([item, social[item].selectIcon]);
                } else {
                    icons.push([item, social[item].icon]);
                }
            }
            return icons;
        },
    },
    computed: {
        filterArticles: function () {
            return this.news.articles.filter((article) => {
                if (article.urlToImage) {
                    this.selected.push({
                        like: false,
                        favorite: false,
                    });

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
.section {
    @apply text-lg font-medium pb-4 text-dark;
}
.news {
    @apply overflow-hidden relative h-full;
    padding-bottom: 1.1rem;
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
        rgba(0, 0, 0, 0) 15%,
        rgba(229, 231, 235, 1)
    );
    width: 97%;
    height: 1.5em;
}
::-webkit-scrollbar {
    padding-bottom: 2rem;
}
.articles {
    @apply overflow-auto;
    height: 90%;
}
.card {
    @apply bg-white shadow rounded-lg h-36 grid grid-cols-5 gap-7 justify-between p-4 overflow-hidden mb-4 mr-1;
}
.card ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
.content {
    @apply col-span-3 h-full overflow-scroll cursor-pointer;
}
.title {
    @apply font-medium text-sm pb-3;
}
.description {
    @apply text-xs;
}
.thumbnail {
    @apply col-span-2 flex flex-col justify-between h-full;
}
.image {
    @apply object-cover rounded-lg cursor-pointer;
}
.author {
    @apply text-xs;
}
.social {
    @apply flex justify-between px-6;
}
.like {
    @apply text-red-600 cursor-pointer;
}
.favorite {
    @apply text-yellow-500 cursor-pointer;
}
.share {
    @apply cursor-pointer text-main;
}
</style>
