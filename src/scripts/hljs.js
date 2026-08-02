import hljs from 'highlight.js'
import { uranite } from './uranite-hljs.js'

hljs.registerLanguage('uranite', uranite)
hljs.registerLanguage('urn', uranite)

export default hljs
