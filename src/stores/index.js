import { createStore } from 'vuex'
import { CONFIG } from '../uranite.js'
import { githubFetch, buildUrl } from '../scripts/github-api.js'

const STORAGE_KEY = 'uranite-cache-v2'

function loadCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

function saveCache(state) {
  try {
    const { lastError, ...rest } = state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest))
  } catch {}
}

function isFresh(entry) {
  return entry && entry.ts && (Date.now() - entry.ts < CONFIG.cacheTtl)
}

function wrap(data) {
  return { data, ts: Date.now() }
}

function decodeBase64(encoded) {
  return encoded ? atob(encoded.replace(/\n/g, '')) : ''
}

const defaults = {
  theme: 'auto',
  contributors: null,
  tags: null,
  apiTags: null,
  releases: null,
  changelog: null,
  license: null,
  docsTrees: {},
  apiTrees: {},
  docContents: {},
  apiContents: {},
  lastError: null
}

function initState() {
  const persisted = loadCache()
  if (!persisted) return { ...defaults }
  return { ...defaults, ...persisted, lastError: null }
}

export default createStore({
  state: initState(),
  mutations: {
    setTheme(state, theme) {
      state.theme = theme
    },
    setContributors(state, entry) {
      state.contributors = entry
    },
    setTags(state, entry) {
      state.tags = entry
    },
    setApiTags(state, entry) {
      state.apiTags = entry
    },
    setReleases(state, entry) {
      state.releases = entry
    },
    setChangelog(state, entry) {
      state.changelog = entry
    },
    setLicense(state, entry) {
      state.license = entry
    },
    setDocsTree(state, { version, entry }) {
      state.docsTrees = { ...state.docsTrees, [version]: entry }
    },
    setApiTree(state, { version, entry }) {
      state.apiTrees = { ...state.apiTrees, [version]: entry }
    },
    setDocContent(state, { key, entry }) {
      state.docContents = { ...state.docContents, [key]: entry }
    },
    setApiContent(state, { key, entry }) {
      state.apiContents = { ...state.apiContents, [key]: entry }
    },
    setError(state, error) {
      state.lastError = error instanceof Error ? error.message : String(error)
    },
    clearError(state) {
      state.lastError = null
    }
  },
  actions: {
    async loadContributors({ state, commit }) {
      if (isFresh(state.contributors)) return state.contributors.data
      const res = await githubFetch(buildUrl(`/repos/${CONFIG.mainRepo}/contributors?per_page=100`))
      const data = await res.json()
      commit('setContributors', wrap(data))
      return data
    },
    async loadTags({ state, commit }) {
      if (isFresh(state.tags)) return state.tags.data
      const res = await githubFetch(buildUrl(`/repos/${CONFIG.mainRepo}/tags?per_page=100`))
      const data = await res.json()
      commit('setTags', wrap(data))
      return data
    },
    async loadApiTags({ state, commit }) {
      if (isFresh(state.apiTags)) return state.apiTags.data
      const res = await githubFetch(buildUrl(`/repos/${CONFIG.apiRepo}/tags?per_page=100`))
      const data = await res.json()
      commit('setApiTags', wrap(data))
      return data
    },
    async loadReleases({ state, commit }) {
      if (isFresh(state.releases)) return state.releases.data
      const res = await githubFetch(buildUrl(`/repos/${CONFIG.mainRepo}/releases?per_page=100`))
      const data = await res.json()
      commit('setReleases', wrap(data))
      return data
    },
    async loadChangelog({ state, commit }) {
      if (isFresh(state.changelog)) return state.changelog.data
      const res = await fetch(`${CONFIG.rawGithub}/${CONFIG.mainRepo}/prod/.github/CHANGELOG.md`)
      if (!res.ok) throw new Error(`Failed to load changelog: ${res.status}`)
      const text = await res.text()
      commit('setChangelog', wrap(text))
      return text
    },
    async loadLicense({ state, commit }) {
      if (isFresh(state.license)) return state.license.data
      const res = await githubFetch(buildUrl(`/repos/${CONFIG.mainRepo}/license`))
      const raw = await res.json()
      const data = {
        name: raw.license?.name || 'Unknown',
        spdxId: raw.license?.spdx_id || '',
        body: decodeBase64(raw.content),
        htmlUrl: raw.html_url || ''
      }
      commit('setLicense', wrap(data))
      return data
    },
    async loadDocsTree({ state, commit }, version) {
      if (isFresh(state.docsTrees[version])) return state.docsTrees[version].data
      const res = await githubFetch(buildUrl(`/repos/${CONFIG.mainRepo}/git/trees/${version}?recursive=1`))
      const data = await res.json()
      commit('setDocsTree', { version, entry: wrap(data) })
      return data
    },
    async loadApiTree({ state, commit }, version) {
      if (isFresh(state.apiTrees[version])) return state.apiTrees[version].data
      const res = await githubFetch(buildUrl(`/repos/${CONFIG.apiRepo}/git/trees/${version}?recursive=1`))
      const data = await res.json()
      commit('setApiTree', { version, entry: wrap(data) })
      return data
    },
    async loadDocContent({ state, commit }, { version, path }) {
      const key = `${version}:${path}`
      if (isFresh(state.docContents[key])) return state.docContents[key].data
      const res = await githubFetch(buildUrl(`/repos/${CONFIG.mainRepo}/contents/docs/${path}?ref=${version}`))
      const raw = await res.json()
      const text = decodeBase64(raw.content)
      commit('setDocContent', { key, entry: wrap(text) })
      return text
    },
    async loadApiContent({ state, commit }, { version, path }) {
      const key = `${version}:${path}`
      if (isFresh(state.apiContents[key])) return state.apiContents[key].data
      const res = await githubFetch(buildUrl(`/repos/${CONFIG.apiRepo}/contents/api/${path}?ref=${version}`))
      const raw = await res.json()
      const text = decodeBase64(raw.content)
      commit('setApiContent', { key, entry: wrap(text) })
      return text
    }
  },
  plugins: [
    store => {
      store.subscribe((mutation, state) => {
        saveCache(state)
      })
    }
  ]
})
