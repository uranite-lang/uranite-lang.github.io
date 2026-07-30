<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
    <nav-bar />
    <main class="flex-1 w-full">
      <router-view />
    </main>
    <footer-bar />
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import NavBar from './widgets/nav-bar.vue'
import FooterBar from './widgets/footer-bar.vue'

const store = useStore()

function applyTheme(theme) {
  const html = document.documentElement
  html.setAttribute('data-theme', theme)
  html.classList.remove('dark')
  if (theme === 'dark' || theme === 'auto') {
    html.classList.add('dark')
  }
}

onMounted(() => {
  applyTheme(store.state.theme)
})

watch(() => store.state.theme, applyTheme)
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
