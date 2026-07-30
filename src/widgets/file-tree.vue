<template>
  <ul class="space-y-0.5">
    <li v-for="node in nodes" :key="node.path">
      <div
        v-if="node.type === 'tree'"
        class="select-none"
      >
        <button
          @click="onToggle(node)"
          class="flex items-center gap-1.5 w-full px-2 py-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg
            class="w-3.5 h-3.5 text-gray-400 transition-transform"
            :class="expanded[node.path] ? 'rotate-90' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span class="truncate">{{ node.name }}</span>
        </button>
        <div v-show="expanded[node.path]" class="ml-4 mt-0.5">
          <file-tree
            :nodes="node.children"
            :active-path="activePath"
            @select="$emit('select', $event)"
          />
        </div>
      </div>
      <button
        v-else
        @click="$emit('select', node.path)"
        class="flex items-center gap-1.5 w-full px-2 py-1 rounded text-sm truncate transition-colors"
        :class="activePath === node.path
          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'"
      >
        <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="truncate">{{ node.name }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  nodes: { type: Array, required: true },
  activePath: { type: String, default: '' }
})

const emit = defineEmits(['select'])

const expanded = reactive({})

function toggle(path) {
  expanded[path] = !expanded[path]
}

function onToggle(node) {
  toggle(node.path)
  if (!expanded[node.path]) return
  const entry = node.children.find(c => c.type === 'blob' && /^index\.md$/i.test(c.name))
    || node.children.find(c => c.type === 'blob' && /^readme\.md$/i.test(c.name))
  if (entry) emit('select', entry.path)
}

function ensureParentsExpanded() {
  if (!props.activePath) return
  const parts = props.activePath.split('/')
  let current = ''
  parts.forEach((part, index) => {
    if (index < parts.length - 1) {
      current = current ? `${current}/${part}` : part
      expanded[current] = true
    }
  })
}

watch(() => props.activePath, ensureParentsExpanded, { immediate: true })
</script>
