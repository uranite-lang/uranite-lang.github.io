<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <github-error
      v-if="store.state.lastError"
      :error="store.state.lastError"
      title="Failed to load API reference"
      @dismiss="store.commit('clearError')"
    />

    <div class="flex flex-col lg:flex-row gap-8">
      <aside class="lg:w-72 flex-shrink-0">
        <div class="lg:sticky lg:top-24 space-y-4">
          <div class="flex items-center justify-between lg:hidden">
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {{ sidebarOpen ? 'Hide' : 'Show' }} menu
            </button>
          </div>

          <div
            class="space-y-4 overflow-hidden lg:!max-h-none lg:!opacity-100 lg:!block"
            :class="sidebarOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'"
            style="transition: max-height 0.3s ease, opacity 0.3s ease"
          >
            <div>
              <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Version</label>
              <version-selector v-model="selectedVersion" :tags="selectorTags" />
            </div>

            <div class="border-t border-gray-200 dark:border-gray-800 pt-4">
              <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Modules</label>
              <loading-spinner v-if="loadingTree" />
              <file-tree
                v-else
                :nodes="tree"
                :active-path="path"
                @select="onSelect"
              />
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 min-w-0">
        <loading-spinner v-if="loadingContent" />
        <div v-else-if="content" class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8">
          <markdown-renderer :source="content" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useHead } from '@vueuse/head'
import { CONFIG } from '../uranite.js'
import { buildTree } from '../scripts/tree-utils.js'
import LoadingSpinner from '../widgets/loading-spinner.vue'
import GithubError from '../widgets/github-error.vue'
import VersionSelector from '../widgets/version-selector.vue'
import FileTree from '../widgets/file-tree.vue'
import MarkdownRenderer from '../widgets/markdown-renderer.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const loadingTree = ref(true)
const loadingContent = ref(false)
const sidebarOpen = ref(false)
const tags = ref([])
const tree = ref([])
const content = ref('')

const version = computed(() => route.params.version || CONFIG.defaultBranch)
const path = computed(() => route.params.path || '')

const selectedVersion = computed({
  get: () => version.value,
  set: (val) => {
    if (val && val !== version.value) {
      router.push(`/api/${val}`)
    }
  }
})

const selectorTags = computed(() => {
  if (tags.value.some(t => t.name === CONFIG.defaultBranch)) return tags.value
  return [{ name: CONFIG.defaultBranch }, ...tags.value]
})

const readmePath = computed(() => {
  const readme = tree.value.find(n => n.name.toLowerCase() === 'readme.md')
  return readme ? readme.path : null
})

useHead({
  title: computed(() => path.value ? `${path.value} — Uranite API` : 'API Reference — Uranite'),
  meta: [
    { name: 'description', content: computed(() => path.value ? `Uranite API reference: ${path.value}` : 'Uranite standard library API reference.') },
    { property: 'og:title', content: computed(() => path.value ? `${path.value} — Uranite API` : 'API Reference — Uranite') },
    { property: 'og:description', content: 'Uranite standard library API reference.' },
    { property: 'og:type', content: 'article' }
  ]
})

async function loadTags() {
  try {
    tags.value = await store.dispatch('loadApiTags')
  } catch {}
}

async function loadTree() {
  loadingTree.value = true
  try {
    store.commit('clearError')
    const data = await store.dispatch('loadApiTree', version.value)
    if (data.truncated) {
      store.commit('setError', 'API tree was truncated by GitHub. Some files may be missing.')
    }
    tree.value = buildTree(data.tree || [], 'api')
  } catch (err) {
    store.commit('setError', err)
    tree.value = []
  } finally {
    loadingTree.value = false
  }
}

async function loadRootReadme() {
  loadingContent.value = true
  try {
    let res = await fetch(`${CONFIG.rawGithub}/${CONFIG.apiRepo}/${version.value}/index.md`)
    if (!res.ok) {
      res = await fetch(`${CONFIG.rawGithub}/${CONFIG.apiRepo}/${version.value}/README.md`)
    }
    if (res.ok) {
      content.value = await res.text()
    }
  } catch {}
  loadingContent.value = false
}

async function loadContent() {
  if (!path.value) {
    await loadRootReadme()
    return
  }
  loadingContent.value = true
  try {
    store.commit('clearError')
    content.value = await store.dispatch('loadApiContent', { version: version.value, path: path.value })
  } catch (err) {
    store.commit('setError', err)
    content.value = ''
  } finally {
    loadingContent.value = false
  }
}

function onSelect(filePath) {
  router.push(`/api/${version.value}/${filePath}`)
  sidebarOpen.value = false
}

watch(() => route.params.version, async (val, oldVal) => {
  const effective = val || CONFIG.defaultBranch
  const prev = oldVal || CONFIG.defaultBranch
  if (effective !== prev) {
    await loadTree()
    await loadContent()
  }
})

watch(() => route.params.path, loadContent)

onMounted(async () => {
  loadTags()
  await Promise.all([loadTree(), loadContent()])
})
</script>
