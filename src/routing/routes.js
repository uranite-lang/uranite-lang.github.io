import AboutView from '../views/about-view.vue'
import ArchitectureView from '../views/architecture-view.vue'
import ContributorsView from '../views/contributors-view.vue'
import DocsView from '../views/docs-view.vue'
import ApiView from '../views/api-view.vue'
import ReleasesView from '../views/releases-view.vue'
import ChangelogView from '../views/changelog-view.vue'
import LicenseView from '../views/license-view.vue'
import ContactView from '../views/contact-view.vue'
import NotFoundView from '../views/not-found-view.vue'

export const routes = [
  {
    path: '/',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'Uranite Programming Language',
      description: 'A low-level, high-productivity system programming language built on top of a C++17 and LLVM 19 backend.'
    }
  },
  {
    path: '/architecture',
    name: 'architecture',
    component: ArchitectureView,
    meta: {
      title: 'Architecture — Uranite',
      description: 'Uranite compiler architecture, pipeline stages, and source tree layout.'
    }
  },
  {
    path: '/contributors',
    name: 'contributors',
    component: ContributorsView,
    meta: {
      title: 'Contributors — Uranite',
      description: 'Meet the people building Uranite.'
    }
  },
  {
    path: '/docs/:version?/:path(.*)?',
    name: 'docs',
    component: DocsView,
    meta: {
      title: 'Documentation — Uranite',
      description: 'Uranite language documentation, guides, and references.'
    }
  },
  {
    path: '/api/:version?/:path(.*)?',
    name: 'api',
    component: ApiView,
    meta: {
      title: 'API Reference — Uranite',
      description: 'Uranite standard library API reference.'
    }
  },
  {
    path: '/releases',
    name: 'releases',
    component: ReleasesView,
    meta: {
      title: 'Releases — Uranite',
      description: 'Download Uranite releases, source tarballs, and changelogs.'
    }
  },
  {
    path: '/changelog',
    name: 'changelog',
    component: ChangelogView,
    meta: {
      title: 'Changelog — Uranite',
      description: 'See what is new in Uranite.'
    }
  },
  {
    path: '/license',
    name: 'license',
    component: LicenseView,
    meta: {
      title: 'License — Uranite',
      description: 'Uranite open-source license.'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: {
      title: 'Contact — Uranite',
      description: 'Get in touch with the Uranite team.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Page Not Found — Uranite',
      description: 'The page you are looking for does not exist.'
    }
  }
]
