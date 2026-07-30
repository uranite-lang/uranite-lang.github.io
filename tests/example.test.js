import { describe, it, expect } from 'vitest'
import { buildTree } from '../src/scripts/tree-utils.js'

describe('tree-utils', () => {
  it('builds a nested tree from flat github tree items', () => {
    const flat = [
      { path: 'docs/guide/start.md', type: 'blob' },
      { path: 'docs/readme.md', type: 'blob' }
    ]
    const tree = buildTree(flat, 'docs')
    expect(tree).toHaveLength(2)
    expect(tree.some(n => n.name === 'readme.md')).toBe(true)
    expect(tree.some(n => n.name === 'guide')).toBe(true)
  })
})
