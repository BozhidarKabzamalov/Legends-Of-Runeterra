import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cards from '../views/Cards.vue'
import Card from '../views/Card.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/cards',
        name: 'cards',
        component: Cards
    },
    {
        path: '/cards/:cardCode',
        name: 'specificCard',
        component: Card
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
