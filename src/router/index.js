import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import SongView from '../views/SongView.vue'
import PlayListView from '../views/PlayListView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { showNav: true },
    component: HomeView
  },
  {
    path: '/song',
    name: 'song',
    meta: { showNav: true },
    component: SearchView
  },
  {
    path: '/search',
    name: 'search',
    meta: { showNav: true },
    component: SongView
  },
  {
    path: '/PlayList',
    name: 'PlayList',
    component: PlayListView
  }
]

const router = new VueRouter({
  routes
})

export default router
