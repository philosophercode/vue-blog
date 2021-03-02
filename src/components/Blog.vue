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
    this.getPost(fetchedId);
  },
  watch: {
    // call again the method if the route changes
    $route: "getPost",
  },
  methods: {
    mdToHtml,
    dateFormat,
    async getPost(id) {
      this.loading = true;
      const res = await fetch(
        `https://api-eu-central-1.graphcms.com/v2/ckc31lc3t00s501z63ch5f5o1/master`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              {
                posts(where: { id: "${id}" }) {
                  title
                  date
                  author {
                    name
                  }
                  content {
                    markdown
                  }
                  body
                }
              }
            `,
          }),
        }
      );
      const { data } = await res.json();
      this.loading = false;
      this.post = data?.posts[0];
      this.content = mdToHtml(this.post.body ?? this.post.content.markdown);
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
