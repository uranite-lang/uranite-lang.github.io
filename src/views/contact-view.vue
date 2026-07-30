<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Have a question, suggestion, or just want to say hello? We would love to hear from you.
      </p>
    </div>

    <div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8">
      <form @submit.prevent="submit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="input-field"
            placeholder="Your name"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="input-field"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            required
            class="input-field"
            placeholder="What is this about?"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="6"
            required
            class="input-field resize-y"
            placeholder="Tell us more..."
          ></textarea>
        </div>

        <button type="submit" class="btn-primary w-full">
          Send Message
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>

    <div class="mt-10 text-center">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Prefer to reach out on GitHub?
        <a :href="`https://github.com/${CONFIG.mainRepo}/issues`" target="_blank" rel="noopener" class="text-primary-600 dark:text-primary-400 hover:underline">
          Open an issue
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useHead } from '@vueuse/head'
import { CONFIG } from '../uranite.js'

useHead({
  title: 'Contact — Uranite',
  meta: [
    { name: 'description', content: 'Get in touch with the Uranite team.' }
  ]
})

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

function submit() {
  alert('Thank you for reaching out! This form is not yet connected to a backend.')
}
</script>
