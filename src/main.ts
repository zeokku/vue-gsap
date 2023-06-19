import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import gsapPlugin from "./plugin";

createApp(App)
  .use(gsapPlugin, {
    gsapDefaults: {},
  })
  .mount("#app");
