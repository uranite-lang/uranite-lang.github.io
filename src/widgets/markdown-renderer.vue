<template>
  <div class="markdown-body" v-html="html" @click="handleClick"></div>
</template>

<script setup>
import { computed, watch, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from '../scripts/hljs.js'

const props = defineProps({
  source: { type: String, default: '' }
})

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, { language: lang }).value
        return `<div class="code-block"><div class="code-header"><span class="code-lang">${md.utils.escapeHtml(lang)}</span><button class="code-copy" data-code="${md.utils.escapeHtml(str)}">Copy</button></div><pre class="hljs"><code>${highlighted}</code></pre></div>`
      } catch {}
    }
    const label = lang ? md.utils.escapeHtml(lang) : 'text'
    return `<div class="code-block"><div class="code-header"><span class="code-lang">${label}</span><button class="code-copy" data-code="${md.utils.escapeHtml(str)}">Copy</button></div><pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre></div>`
  }
})

md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  const content = tokens[idx + 1]
  const text = content.children
    ? content.children.reduce((acc, t) => acc + t.content, '')
    : ''
  if (!env.slugs) env.slugs = {}
  let id = slugify(text)
  if (env.slugs[id] !== undefined) {
    env.slugs[id]++
    id = `${id}-${env.slugs[id]}`
  } else {
    env.slugs[id] = 0
  }
  tokens[idx].attrSet('id', id)
  env._headingId = id
  return self.renderToken(tokens, idx, options)
}

md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
  const id = env._headingId
  const anchor = id
    ? ` <a href="#${id}" class="heading-anchor" aria-hidden="true">#</a>`
    : ''
  return anchor + self.renderToken(tokens, idx, options)
}

const html = computed(() => {
  const rendered = md.render(props.source, { slugs: {} })
  return rendered.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>')
})

function handleClick(event) {
  const copyBtn = event.target.closest('.code-copy')
  if (copyBtn) {
    event.preventDefault()
    const code = copyBtn.getAttribute('data-code')
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.textContent = 'Copied!'
      setTimeout(() => { copyBtn.textContent = 'Copy' }, 2000)
    })
    return
  }

  const link = event.target.closest('a[href^="#"]')
  if (!link) return
  event.preventDefault()
  const id = decodeURIComponent(link.getAttribute('href').slice(1))
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }
}

watch(html, () => {
  nextTick(() => {
    const hash = window.location.hash
    if (!hash) return
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  })
})
</script>
