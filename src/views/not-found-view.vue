<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
    <div class="mb-8">
      <span class="text-8xl font-extrabold text-gray-200 dark:text-gray-800">404</span>
    </div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page not found</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
      The page you are looking for does not exist or has been moved.
    </p>
    <router-link to="/" class="btn-primary">
      Go Home
    </router-link>
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Page Not Found — Uranite',
  meta: [
    { name: 'description', content: 'The page you are looking for does not exist.' },
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
