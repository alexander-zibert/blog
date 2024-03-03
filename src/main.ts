import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Home from "./pages/Home.vue";
import BugCount from "./widgets/BugCount.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/widgets/bug-count", component: BugCount },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
