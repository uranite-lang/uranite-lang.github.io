<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Releases</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Download the latest version of Uranite or browse previous releases.
      </p>
    </div>

    <github-error
      v-if="store.state.lastError"
      :error="store.state.lastError"
      title="Failed to load releases"
      @dismiss="store.commit('clearError')"
    />

    <loading-spinner v-if="loading" />

    <template v-else>
      <section v-if="releases.length" class="mb-12">
        <div class="space-y-6">
          <div
            v-for="release in releases"
            :key="release.id"
            class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6"
          >
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ release.name || release.tag_name }}</h2>
                  <span
                    v-if="release.prerelease"
                    class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                  >
                    Pre-release
                  </span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Published {{ formatDate(release.published_at) }}
                  <span v-if="release.author"> by {{ release.author.login }}</span>
                </p>
              </div>
              <div class="flex items-center gap-3 flex-shrink-0">
                <a
                  :href="release.zipball_url"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  .zip
                </a>
                <a
                  :href="release.tarball_url"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  .tar.gz
                </a>
              </div>
            </div>

            <div v-if="release.body">
              <markdown-renderer :source="release.body" />
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center gap-4 flex-wrap">
              <a
                :href="release.html_url"
                target="_blank"
                rel="noopener"
                class="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
              >
                View on GitHub &rarr;
              </a>
              <a
                v-if="release.target_commitish"
                :href="`https://github.com/${CONFIG.mainRepo}/commit/${release.target_commitish}`"
                target="_blank"
                rel="noopener"
                class="text-sm font-mono text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {{ formatCommitish(release.target_commitish) }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section v-if="tags.length">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Tags</h2>
        <div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-800">
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tag</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Commit</th>
                  <th class="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Download</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                <tr v-for="tag in tags" :key="tag.name" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td class="px-6 py-4">
                    <span class="font-semibold text-gray-900 dark:text-white">{{ tag.name }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <a
                      :href="`https://github.com/${CONFIG.mainRepo}/commit/${tag.commit.sha}`"
                      target="_blank"
                      rel="noopener"
                      class="font-mono text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      {{ tag.commit.sha.slice(0, 7) }}
                    </a>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <a
                        :href="tag.zipball_url"
                        class="px-3 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        .zip
                      </a>
                      <a
                        :href="tag.tarball_url"
                        class="px-3 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        .tar.gz
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div v-if="!releases.length && !tags.length" class="text-center py-20">
        <p class="text-gray-500 dark:text-gray-400">No releases or tags found.</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useHead } from '@vueuse/head'
import { CONFIG } from '../uranite.js'
import LoadingSpinner from '../widgets/loading-spinner.vue'
import GithubError from '../widgets/github-error.vue'
import MarkdownRenderer from '../widgets/markdown-renderer.vue'

const store = useStore()
const loading = ref(true)
const releases = ref([])
const tags = ref([])

useHead({
  title: 'Releases — Uranite',
  meta: [
    { name: 'description', content: 'Download Uranite releases, source tarballs, and changelogs.' },
    { property: 'og:title', content: 'Releases — Uranite' },
    { property: 'og:description', content: 'Download Uranite releases, source tarballs, and changelogs.' },
    { property: 'og:type', content: 'website' }
  ]
})

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatCommitish(value) {
  if (/^[0-9a-f]{40}$/i.test(value)) return value.slice(0, 7)
  return value
}

onMounted(async () => {
  store.commit('clearError')
  const results = await Promise.allSettled([
    store.dispatch('loadReleases'),
    store.dispatch('loadTags')
  ])
  if (results[0].status === 'fulfilled') releases.value = results[0].value
  if (results[1].status === 'fulfilled') tags.value = results[1].value
  if (results[0].status === 'rejected' && results[1].status === 'rejected') {
    store.commit('setError', results[0].reason)
  }
  loading.value = false
})
</script>
