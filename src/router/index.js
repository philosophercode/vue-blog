import Vue from "vue";
import VueRouter from "vue-router";
import BlogList from "@/components/BlogList.vue";
import Blog from "@/components/Blog.vue";
import FourZeroFour from "@/components/FourZeroFour.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Blogs",
    component: BlogList,
  },
  {
    path: "/blog/:id",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/blogs",
    name: "Bloglist",
    component: BlogList,
  },
  { path: "*", component: FourZeroFour },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
