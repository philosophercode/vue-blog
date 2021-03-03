<template>
  <div class="blog">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div id="blog-1" v-if="post">
      <h1>{{ post.title }}</h1>
      <h3>- {{ post.author.name }}</h3>
      <p>{{ dateFormat(post.date) }}</p>
      <div class="markdown-body" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { mdToHtml, dateFormat } from "@/utils";
import { getPosts } from "@/services";
export default {
  name: "Blog",
  data: () => ({
    loading: false,
    post: null,
    content: null,
    error: null,
  }),
  created() {
    const fetchedId = this.$route.params.id;
    this.getBlog(fetchedId);
  },
  watch: {
    // call again the method if the route changes
    $route: "getPost",
  },
  methods: {
    mdToHtml,
    dateFormat,
    getPosts,
    async getBlog(id) {
      this.loading = true;
      this.post = await this.getPosts(id);

      // Post are fetched as Markdown but can be edited as MD or Rich Text
      // Make sure your endpoint is secure as `showdown` (the MD parser)
      // does not sanitize the markdown leaving the possibility of XSS
      // alternately sanitize the rendered HTML
      this.content = mdToHtml(this.post.body ?? this.post.content.markdown);
      this.loading = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: var(--purple);
}
.markdown-body {
  text-align: left;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
