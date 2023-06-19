# 🦸 Powerful GSAP directive for Vue

## Installation

Install the library

```shell
pnpm add @zeokku/vue-gsap
```

Add the plugin to your Vue app:

```ts
import gsapPlugin from "./plugin";

createApp(App)
  .use(gsapPlugin, {
    gsapDefaults: {},
  })
  .mount("#app");
```

## Usage

### Directive argument

There are 3 methods that correspond to the same methods of GSAP:

* `v-gsap:from` - the animation will be played when the element is placed into DOM, so it's perfect for **entering** animations.
    This is the **default** argument, so you can simply use `v-gsap` directive.
* `v-gsap:fromTo` - similar to `from`, the animation is played after the element is mounted.
* `v-gsap:to` - the animation will be played before the unmount of the component. Good for **leaving** animations for elements inside of views when used with built-in `<Transition>` elements.

### Directive value

When using `from/to` the directive expects a `GSAPTweenVars` object. In case of `fromTo` it expects a tuple `[GSAPTweenVars, GSAPTweenVars]`, which correspond to _from_ and _to_.

```ts
type TTweenValue = GSAPTweenVars | [GSAPTweenVars, GSAPTweenVars];
```

You can also fully customize the experience providing in-out object to the directive without its argument to define the animations for entering (`in`) and leaving (`out`):

```ts
type TInOutValue = { 
    method?: "to" | "from" | "fromTo"; 
    vars: TTweenValue 
};

type TInOut = { 
    in?: TInOutValue | TTweenValue; 
    out?: TInOutValue | TTweenValue 
};
```

By default `gsap.from` is always used for entering and `gsap.to` for leaving and the directive accepts tween vars right as `in` and `out`. But you can provide a more complex object specifying `method` property to define what should be used in each case.

### Modifiers

To improve developer experience, the directive accepts several modifiers to speed up the development.

* `[digits]` - e.g. `.500`, defines the duration of the tween. Should be specified in **ms**!
* `d...` - e.g. `.d500`, defines **delay** of the tween. Should be specified in **ms**!
* `s...` - e.g. `.s100`, defines **stagger** of the tween. Should be specified in **ms**!
* `children` - this modifier allows applying the provided tween config to **elements children**, perfect for animating lists along with using `s...` modifier.