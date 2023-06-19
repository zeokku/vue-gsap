import { Plugin } from "vue";
import { gsap } from "gsap";

import directive from "./directive";

export default ((app, gsapDefaults: GSAPTweenVars = {}) => {
  gsap.defaults(gsapDefaults);

  app.directive("gsap", directive);
}) as Plugin;
