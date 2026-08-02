<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Architecture</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-12">
      Uranite compiler internals and source tree layout.
    </p>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Compiler Pipeline</h2>
      <div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 overflow-x-auto">
        <pre class="text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre">{{ pipeline }}</pre>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
        Orchestrated by <code class="text-primary-600 dark:text-primary-400">compiler::Driver</code> in <code class="text-primary-600 dark:text-primary-400">src/uranite/compiler/driver.cpp</code>. Six static C11 runtime libraries link automatically: exception handling, async event loop, threading, subprocess management, IPC, and FFI.
      </p>
    </section>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Intermediate Representations</h2>
      <div class="space-y-6">
        <div v-for="ir in irStages" :key="ir.name" class="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-lg font-bold text-gray-900 dark:text-white">{{ ir.name }}</span>
            <code class="text-xs font-mono text-gray-500 dark:text-gray-400">{{ ir.flag }}</code>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ ir.description }}</p>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Toolchain Binaries</h2>
      <div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-800">
              <th class="px-5 py-3 text-left font-semibold text-gray-900 dark:text-white">Binary</th>
              <th class="px-5 py-3 text-left font-semibold text-gray-900 dark:text-white">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tool in toolchain" :key="tool.name" class="border-b border-gray-100 dark:border-gray-800 last:border-0">
              <td class="px-5 py-3 font-mono text-primary-600 dark:text-primary-400">{{ tool.name }}</td>
              <td class="px-5 py-3 text-gray-600 dark:text-gray-400">{{ tool.purpose }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Building from Source</h2>
      <div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div class="markdown-body p-6" @click="handleCopy">
          <p class="mb-4 text-gray-600 dark:text-gray-400">
            Requires C++17 compiler (GCC 12+ or Clang 19+), LLVM 19, CMake 3.22+, fmt, spdlog, argparse, GoogleTest.
          </p>
          <div class="code-block" v-html="buildSnippet"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import hljs from '../scripts/hljs.js'

useHead({
  title: 'Architecture — Uranite',
  meta: [
    { name: 'description', content: 'Uranite compiler architecture, pipeline stages, and source tree layout.' },
    { property: 'og:title', content: 'Architecture — Uranite' },
    { property: 'og:description', content: 'Uranite compiler architecture, pipeline stages, and source tree layout.' },
    { property: 'og:type', content: 'article' }
  ]
})

const pipeline = `.\n└── Source (.urn|.uranite)\n    ├── Lexer\n    │   └── INDENT/DEDENT token emission\n    ├── Parser\n    │   └── Recursive descent, builds AST\n    ├── Semantic\n    │   └── Two-pass: register declarations, then type-check\n    ├── Borrow Check\n    │   └── Ownership validation, move tracking\n    ├── HIR Lowering\n    │   └── AST → High-Level IR with resolved types\n    ├── MIR Lowering\n    │   └── HIR → Control-Flow Graph of basic blocks\n    ├── MIR Analysis\n    │   └── Liveness, borrow checking, optimization\n    ├── MIR Codegen\n    │   └── MIR → LLVM IR generation\n    └── Linker\n        └── Links runtime libraries, produces native executable`

const irStages = [
  {
    name: 'HIR',
    flag: '--dump-hir',
    description: 'High-Level IR preserves high-level semantics (loops, match, classes) with resolved types. Desugars elif chains to nested conditionals and unifies all loop forms. 60 node types.'
  },
  {
    name: 'MIR',
    flag: '--dump-mir',
    description: 'Mid-Level IR flattens the HIR tree into a control-flow graph of basic blocks with linear instruction sequences. Each block terminates with exactly one control flow instruction.'
  },
  {
    name: 'MIR Analysis',
    flag: '--verbose',
    description: 'Backward dataflow liveness analysis, forward dataflow ownership verification (use-after-move, double-free detection), and five optimization passes.'
  }
]

const toolchain = [
  { name: 'uranite', purpose: '.urn source to native executable' },
  { name: 'uranite-tests', purpose: 'GoogleTest suite for compiler internals' },
  { name: 'uranite-fmt', purpose: 'Code formatter with comment preservation and style linting' },
  { name: 'uranite-doc', purpose: 'Documentation generator from doccomments' },
  { name: 'uranite-pkg', purpose: 'Package manager with dependency resolution and semver' }
]

const buildCode = `sudo apt install -y g++ cmake llvm-19-dev libfmt-dev libspdlog-dev libgtest-dev

cmake -B build -DCMAKE_BUILD_TYPE=Release
make -C build -j$(nproc)`

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

const buildSnippet = (() => {
  const highlighted = hljs.highlight(buildCode, { language: 'bash' }).value
  return `<div class="code-header"><span class="code-lang">bash</span><button class="code-copy" data-code="${escapeAttr(buildCode)}">Copy</button></div><pre class="hljs"><code>${highlighted}</code></pre>`
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
</script>
