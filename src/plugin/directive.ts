import { Directive } from "vue";
import { gsap } from "gsap";

type TTweenValue = GSAPTweenVars | [GSAPTweenVars, GSAPTweenVars];

type TInOutValue = { method?: "to" | "from" | "fromTo"; vars: TTweenValue };
type TInOut = { in?: TInOutValue | TTweenValue; out?: TInOutValue | TTweenValue };

type TValue = TTweenValue | TInOut;

// @todo duration and delay merge in { in, out }
let tweenSetup = (
  el: HTMLElement | HTMLCollection,
  value: TTweenValue,
  arg: string | undefined,
  modifiers: Record<string, boolean>
) => {
  let duration: number | undefined;
  let delay: number | undefined;
  let stagger: number | undefined;

  if (modifiers["children"]) {
    el = (el as HTMLElement).children;

    // delete modifiers["children"]
  }

  Object.keys(modifiers).forEach(m => {
    if (/^\d+$/.test(m)) {
      duration = parseInt(m) / 1000;
    } else if (/^d\d+$/.test(m)) {
      delay = parseInt(m.slice(1)) / 1000;
    } else if (/^s\d+$/.test(m)) {
      stagger = parseInt(m.slice(1)) / 1000;
    } else {
      console.warn("[vue-gsap] Unknown modifier: ", m);
    }
  });

  if (arg === "fromTo") {
    if (Array.isArray(value)) {
      gsap.fromTo(
        el, //
        value[0],
        // @note order matters, as if we have duration and delay defined as value props, they will effectively being used instead of being overwritten by undefined
        // this also allows overriding timings
        { duration, delay, stagger, ...value[1] }
      );
    } else {
      console.error("[vue-gsap] `v-gsap:fromTo` requires a tuple of vars");
    }
  } else {
    // if(!Array.isArray)
    gsap[(arg as "to" | "from" | undefined) ?? "from"](
      el, //
      { duration, delay, stagger, ...(value as GSAPTweenVars) }
    );
  }
};

export default {
  // beforeMount(el, { value, arg, modifiers }) {
  mounted(el, { value, arg, modifiers }) {
    if ("in" in value) {
      let o = (value as TInOut).in!;
      if ("method" in o) {
        tweenSetup(el, o.vars, o.method, modifiers);
      } else {
        tweenSetup(el, o, arg ?? "from", modifiers);
      }
    } else if (!("out" in value)) {
      tweenSetup(el, value, arg, modifiers);
    }
    else {
      console.error('[vue-gsap] Invalid value')
    }
  },
  beforeUnmount(el, { value, arg, modifiers }) {
    if ("out" in value) {
      let o = (value as TInOut).out!;

      if ("method" in o) {
        tweenSetup(el, o.vars, o.method, modifiers);
      } else {
        tweenSetup(el, o, arg ?? "to", modifiers);
      }
    }
  },
} as Directive<HTMLElement, TValue>;
