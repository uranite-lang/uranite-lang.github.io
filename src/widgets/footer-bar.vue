<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-1">
          <router-link to="/" class="flex items-center gap-3 mb-4">
            <img :src="CONFIG.avatarUrl" alt="Uranite" class="w-8 h-8" />
            <span class="text-lg font-bold text-gray-900 dark:text-white">Uranite</span>
          </router-link>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            A low-level, high-productivity system programming language built on top of a C++17 and LLVM 19 backend.
          </p>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Project</h3>
          <ul class="space-y-3">
            <li v-for="link in projectLinks" :key="link.to">
              <router-link :to="link.to" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Resources</h3>
          <ul class="space-y-3">
            <li v-for="link in resourceLinks" :key="link.href">
              <a :href="link.href" target="_blank" rel="noopener" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Connect</h3>
          <ul class="space-y-3">
            <li>
              <a :href="`https://github.com/${CONFIG.mainRepo}`" target="_blank" rel="noopener" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                GitHub Repository
              </a>
            </li>
            <li>
              <router-link to="/contact" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Contact Us
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-400 dark:text-gray-500">
          &copy; {{ new Date().getFullYear() }} Uranite. Open source under the GNU General Public License v3.0.
        </p>
        <div class="flex items-center gap-6">
          <router-link to="/license" class="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            License
          </router-link>
          <router-link to="/changelog" class="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            Changelog
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { CONFIG } from '../uranite.js'

const projectLinks = [
  { to: '/docs', label: 'Documentation' },
  { to: '/api', label: 'API Reference' },
  { to: '/releases', label: 'Releases' },
  { to: '/contributors', label: 'Contributors' }
]

const resourceLinks = [
  { href: `https://github.com/${CONFIG.mainRepo}/issues`, label: 'Issues' },
  { href: `https://github.com/${CONFIG.mainRepo}/discussions`, label: 'Discussions' },
  { href: `https://github.com/${CONFIG.mainRepo}/blob/prod/README.md`, label: 'Readme' }
]
</script>
