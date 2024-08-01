import { createRouter, createWebHistory } from 'vue-router'

import vWrapperCatalogGame from '../components/v-wrapper-catalog-game'
import vWrapperGame from '../components/v-wrapper-game'
const routes = [
    {
        path: '/',
        name: 'catalogGame',
        component: vWrapperCatalogGame,
        props: true
    },
    {
        path: '/:id',
        name: 'game',
        component: vWrapperGame,
        props: true
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router;