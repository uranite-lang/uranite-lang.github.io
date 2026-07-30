<template>
  <div class="relative" v-click-outside="close">
    <button
      @click="open = !open"
      class="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
      <span class="flex-1 text-left truncate">{{ modelValue || 'Select version' }}</span>
      <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute left-0 right-0 mt-1 max-h-64 overflow-auto rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
      >
        <div class="py-1">
          <button
            v-for="tag in tags"
            :key="tag.name"
            @click="select(tag.name)"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="modelValue === tag.name ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300'"
          >
            {{ tag.name }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import clickOutside from '../directives/click-outside.js'

defineProps({
  modelValue: { type: String, default: '' },
  tags: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])
const open = ref(false)
const vClickOutside = clickOutside

function select(version) {
  emit('update:modelValue', version)
  open.value = false
}

function close() {
  open.value = false
}
</script>
