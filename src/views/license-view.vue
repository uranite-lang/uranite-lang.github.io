<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">License</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Uranite is open-source software. Below is the full license text.
      </p>
    </div>

    <github-error
      v-if="store.state.lastError"
      :error="store.state.lastError"
      title="Failed to load license"
      @dismiss="store.commit('clearError')"
    />

    <loading-spinner v-if="loading" />

    <div v-else-if="license" class="space-y-6">
      <div class="flex items-center gap-4 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
        <div class="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
          <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">License</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ license.name }}</p>
        </div>
        <a
          v-if="license.htmlUrl"
          :href="license.htmlUrl"
          target="_blank"
          rel="noopener"
          class="ml-auto text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
        >
          View on GitHub &rarr;
        </a>
      </div>

      <div v-if="license.body" class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8">
        <pre class="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">{{ license.body }}</pre>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-500 dark:text-gray-400">License information not available.</p>
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
const license = ref(null)

useHead({
  title: 'License — Uranite',
  meta: [
    { name: 'description', content: 'Uranite open-source license.' }
  ]
})

onMounted(async () => {
  try {
    store.commit('clearError')
    license.value = await store.dispatch('loadLicense')
  } catch (err) {
    store.commit('setError', err)
  } finally {
    loading.value = false
  }
})
</script>
