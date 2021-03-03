<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="posts" class="blog-list-container">
      <ul class="blog-list">
        <li v-for="(post, index) in posts" :key="index">
          <div class="blog-card">
            <div class="blog-header">
              <img class="blog-image" :src="post.coverImage.url" />
            </div>
            <div class="blog-body">
              <router-link :to="{ name: 'Blog', params: { id: post.id } }">
                <h3 class="title">
                  {{ post.title }}
                </h3>
              </router-link>
              <p class="date">
                {{ dateFormat(post.date) }}
              </p>
              <p class="author">- {{ post.author.name }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/utils";
import { getPosts } from "@/services";
export default {
  name: "BlogList",
  data: () => ({
    loading: false,
    posts: null,
    error: null,
  }),
  created() {
    this.getBlogs();
  },
  methods: {
    dateFormat,
    getPosts,
    // For faster performance and SEO look into SSR / SSG like Nuxt.js or VuePress
    async getBlogs() {
      this.loading = true;
      this.posts = await this.getPosts();
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.blog-list-container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
.blog-list {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, 300px);
  justify-content: space-evenly;
  grid-auto-flow: row;
  padding: 10px;
  column-gap: 30px;
  row-gap: 20px;
}
.blog-card {
  width: 300px;
  height: 350px;
  background-color: var(--yellow);
}
.blog-header {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.blog-image {
  width: 100%;
  transition: transform 2s ease;
}
:hover.blog-card .blog-image {
  transform: scale(1.3);
}
.blog-body {
  display: flex;
  flex-flow: column wrap;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
}
.title {
  color: #000000;
  font-weight: 700;
}
:hover.title {
  color: #3000db;
  font-weight: 700;
}
a {
  text-decoration: none;
}
.author {
  color: #000000;
  font-weight: 500;
}
.date {
  color: #000000;
  font-weight: 300;
}
@media screen and (max-width: 992px) {
  .blog-list {
    grid-template-columns: 300px 300px;
    column-gap: 20px;
  }
}
@media screen and (max-width: 600px) {
  .blog-list {
    grid-template-columns: 300px;
    column-gap: 10px;
  }
}
</style>
