import { CONFIG } from '../uranite.js'

export function buildUrl(endpoint) {
  return `${CONFIG.githubApi}${endpoint}`
}

export function buildRawUrl(repo, path, ref = 'prod') {
  return `${CONFIG.rawGithub}/${repo}/${ref}/${path}`
}

export async function githubFetch(url) {
  const res = await fetch(url)
  if (res.status === 403) {
    const reset = res.headers.get('x-ratelimit-reset')
    const msg = reset
      ? `GitHub API rate limit exceeded. Resets at ${new Date(parseInt(reset) * 1000).toLocaleString()}.`
      : 'GitHub API rate limit exceeded. Please try again later.'
    throw new Error(msg)
  }
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub API error ${res.status}: ${text || res.statusText}`)
  }
  return res
}
