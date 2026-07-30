<template>
  <div v-if="error" class="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 mb-6">
    <div class="flex items-start gap-3">
      <svg class="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-red-800 dark:text-red-300">{{ title }}</p>
        <p class="text-sm text-red-700 dark:text-red-400 mt-1">{{ error.message || error }}</p>
      </div>
      <button
        v-if="dismissible"
        @click="$emit('dismiss')"
        class="text-red-500 hover:text-red-700 dark:hover:text-red-300"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: { type: [Error, String, Object], default: null },
  title: { type: String, default: 'Something went wrong' },
  dismissible: { type: Boolean, default: true }
})

defineEmits(['dismiss'])
</script>
