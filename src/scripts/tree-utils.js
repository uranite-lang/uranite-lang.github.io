export function buildTree(flatItems, prefix) {
  const root = { name: prefix, path: '', type: 'tree', children: [] }
  const map = { '': root }

  const filtered = flatItems.filter(item =>
    item.path.startsWith(prefix + '/') && item.type === 'blob' && item.path.endsWith('.md')
  )

  filtered.forEach(item => {
    const relativePath = item.path.slice(prefix.length + 1)
    const parts = relativePath.split('/')
    let currentPath = ''
    let parent = root

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1
      const pathSoFar = currentPath ? `${currentPath}/${part}` : part

      if (!map[pathSoFar]) {
        const node = {
          name: part,
          path: pathSoFar,
          fullPath: item.path,
          type: isLast ? 'blob' : 'tree',
          children: []
        }
        map[pathSoFar] = node
        parent.children.push(node)
      }

      currentPath = pathSoFar
      parent = map[pathSoFar]
    })
  })

  sortTree(root)
  return root.children
}

function sortTree(node) {
  node.children.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name)
    return a.type === 'tree' ? -1 : 1
  })
  node.children.forEach(sortTree)
}
