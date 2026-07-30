<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contributors</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        People who contribute to Uranite.
      </p>
    </div>

    <github-error
      v-if="store.state.lastError"
      :error="store.state.lastError"
      title="Failed to load contributors"
      @dismiss="store.commit('clearError')"
    />

    <loading-spinner v-if="loading" />

    <div v-else-if="contributors.length" class="flex flex-wrap justify-center gap-4">
      <a
        v-for="c in contributors"
        :key="c.id"
        :href="c.html_url"
        target="_blank"
        rel="noopener"
        class="relative group"
      >
        <img
          :src="c.avatar_url"
          :alt="c.login"
          class="w-16 h-16 rounded-full ring-2 ring-gray-200 dark:ring-gray-800 group-hover:ring-primary-400 dark:group-hover:ring-primary-500 group-hover:scale-110 transition-all"
          loading="lazy"
        />
        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
          <span class="font-semibold">{{ c.login }}</span>
          <span class="text-gray-400 dark:text-gray-500 ml-1">{{ c.contributions }} commits</span>
          <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
        </div>
      </a>
    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-500 dark:text-gray-400">No contributors found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useHead } from '@vueuse/head'
import LoadingSpinner from '../widgets/loading-spinner.vue'
import GithubError from '../widgets/github-error.vue'

const store = useStore()
const loading = ref(true)
const contributors = ref([])

useHead({
  title: 'Contributors — Uranite',
  meta: [
    { name: 'description', content: 'Meet the developers building Uranite.' }
  ]
})

onMounted(async () => {
  try {
    store.commit('clearError')
    contributors.value = await store.dispatch('loadContributors')
  } catch (err) {
    store.commit('setError', err)
  } finally {
    loading.value = false
  }
})
</script>
