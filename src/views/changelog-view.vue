<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Changelog</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Track the evolution of Uranite through every release.
      </p>
    </div>

    <github-error
      v-if="store.state.lastError"
      :error="store.state.lastError"
      title="Failed to load changelog"
      @dismiss="store.commit('clearError')"
    />

    <loading-spinner v-if="loading" />

    <div v-else-if="content" class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8">
      <markdown-renderer :source="content" />
    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-500 dark:text-gray-400">Changelog not available.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useHead } from '@vueuse/head'
import LoadingSpinner from '../widgets/loading-spinner.vue'
import GithubError from '../widgets/github-error.vue'
import MarkdownRenderer from '../widgets/markdown-renderer.vue'

const store = useStore()
const loading = ref(true)
const content = ref('')

useHead({
  title: 'Changelog — Uranite',
  meta: [
    { name: 'description', content: 'See what is new in Uranite.' }
  ]
})

onMounted(async () => {
  try {
    store.commit('clearError')
    content.value = await store.dispatch('loadChangelog')
  } catch (err) {
    store.commit('setError', err)
  } finally {
    loading.value = false
  }
})
</script>
