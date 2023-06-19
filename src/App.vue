<template lang="pug">
div(v-gsap.1000="{ opacity: 0, scale: 1.1 }")
  a(href="https://greensock.com/" target="_blank")
    img.logo(v-gsap.600="{ x: -150 }" src="/gsap.svg" alt="GSAP logo")
  a(href="https://vuejs.org/" target="_blank")
    img.logo.vue(v-gsap.600="{ x: 150 }" src="/vue.svg" alt="Vue logo")
  hello-world(msg="GSAP + Vue")
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<style scoped>
.logo {
  display: inline-block;

  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #88ce02aa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
