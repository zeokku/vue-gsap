<template lang="pug">
h1.title
  .title-text(v-gsap:from.700.d500="{ y: '100%', rotation: 5 }") {{ msg }}
.card
  .btn-wrap
    button.btn(v-gsap:from.700.d500="{ y: '-100%' }" type="button" @click="count++")
      | count is {{ count }}
  div(v-gsap.children="tweenVars")
    p Edit 
      code components/HelloWorld.vue 
      | to test GSAP animations
    p Check out 
      a(href="https://github.com/zeokku/vue-gsap/blob/main/src/components/HelloWorld.vue" target="_blank")
        | this demo source code 
      | to learn how to use GSAP directives with Vue
    p.read-the-docs Click on the GSAP and Vue logos to learn more
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

let tweenVars = {
  opacity: 0, //
  x: -100,
  duration: 0.7,
  delay: 0.5,
  stagger: 0.2
} satisfies gsap.TweenVars;
</script>

<style scoped>
.read-the-docs {
  color: #888;
}

.title,
.btn-wrap {
  overflow: hidden;
}

.btn {
  transform-origin: 0 0;
}

.title-text {
  transform-origin: 0 100%;
}
</style>
