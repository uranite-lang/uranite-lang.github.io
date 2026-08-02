<template>
  <div>
    <section class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-10">
            The <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-300">Uranite</span> Language
          </h1>
          <p class="text-xl text-gray-700 dark:text-gray-200 font-medium mb-10">
            Accelerated Execution Through Quantum Precision
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <router-link to="/docs" class="btn-primary text-base px-8 py-3">
              Get Started
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
            <a :href="`https://github.com/${CONFIG.mainRepo}`" target="_blank" rel="noopener" class="btn-secondary text-base px-8 py-3">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <component :is="feature.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div class="markdown-body p-6" @click="handleCopy">
            <div class="code-block !mb-0" v-html="codeExample"></div>
          </div>
          <div class="border-t border-gray-200 dark:border-gray-800 px-6 py-4">
            <code class="text-sm text-gray-600 dark:text-gray-400 font-mono">./build/uranite --run --verbose hello.urn</code>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Compiler Pipeline</h2>
        <div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 overflow-x-auto">
          <pre class="text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre">{{ pipeline }}</pre>
        </div>
        <div class="mt-8">
          <router-link to="/architecture" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">
            View full architecture &rarr;
          </router-link>
        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Toolchain</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="tool in toolchain" :key="tool.name" class="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <code class="text-sm font-mono font-semibold text-primary-600 dark:text-primary-400">{{ tool.name }}</code>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ tool.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get started</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Read the docs, grab a release, and write your first program.
        </p>
        <router-link to="/docs" class="btn-primary text-base px-8 py-3">
          Explore Documentation
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { h } from 'vue'
import { useHead } from '@vueuse/head'
import hljs from '../scripts/hljs.js'
import { CONFIG } from '../uranite.js'

useHead({
  title: 'Uranite Programming Language',
  meta: [
    { name: 'description', content: 'A low-level, high-productivity system programming language built on top of a C++17 and LLVM 19 backend.' },
    { property: 'og:title', content: 'Uranite Programming Language' },
    { property: 'og:description', content: 'A low-level, high-productivity system programming language built on top of a C++17 and LLVM 19 backend.' },
    { property: 'og:type', content: 'website' }
  ]
})

const codeSource = `package main

from uranite.io.console import puts

public function main() -> I32:
    puts( "Hello, Uranite!" )
    return 0`

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

const codeExample = (() => {
  const highlighted = hljs.highlight(codeSource, { language: 'uranite' }).value
  return `<div class="code-header"><span class="code-lang">uranite</span><button class="code-copy" data-code="${escapeAttr(codeSource)}">Copy</button></div><pre class="hljs"><code>${highlighted}</code></pre>`
})()

function handleCopy(event) {
  const btn = event.target.closest('.code-copy')
  if (!btn) return
  event.preventDefault()
  const code = btn.getAttribute('data-code')
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied!'
    setTimeout(() => { btn.textContent = 'Copy' }, 2000)
  })
}

const pipeline = `.\n└── Source (.urn|.uranite)\n    ├── Lexer\n    │   └── INDENT/DEDENT token emission\n    ├── Parser\n    │   └── Recursive descent, builds AST\n    ├── Semantic\n    │   └── Two-pass: register declarations, then type-check\n    ├── Borrow Check\n    │   └── Ownership validation, move tracking\n    ├── HIR Lowering\n    │   └── AST → High-Level IR with resolved types\n    ├── MIR Lowering\n    │   └── HIR → Control-Flow Graph of basic blocks\n    ├── MIR Analysis\n    │   └── Liveness, borrow checking, optimization\n    ├── MIR Codegen\n    │   └── MIR → LLVM IR generation\n    └── Linker\n        └── Links runtime libraries, produces native executable`

const toolchain = [
  { name: 'uranite', description: 'Compiler: .urn source to native executable via LLVM 19' },
  { name: 'uranite-fmt', description: 'Code formatter with comment preservation and style linting' },
  { name: 'uranite-doc', description: 'Documentation generator from doccomments' },
  { name: 'uranite-pkg', description: 'Package manager with dependency resolution and semver' },
  { name: 'uranite-tests', description: 'GoogleTest suite for compiler internals' }
]

const BoltIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
])

const ShieldIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
])

const CodeIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' })
])

const features = [
  {
    title: 'AOT Native',
    description: 'Compiles to native machine code through LLVM 19. No interpreter, no VM, no garbage collector.',
    icon: BoltIcon
  },
  {
    title: 'Ownership Model',
    description: 'Move semantics and borrow checking at compile time. No lifetime annotations required.',
    icon: ShieldIcon
  },
  {
    title: 'Indentation-Based',
    description: 'Python-style block structure with textual operators (and, or, not). No curly braces.',
    icon: CodeIcon
  }
]
</script>
