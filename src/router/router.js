import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/v-catalog'
import vCart from '../components/v-cart'
import vAllProducts from '../components/v-all-products'
import vProductPage from '../components/v-product-page'

Vue.use(Router);

let router = new Router({
    routes:[
        {
            path: '/',
            name: 'catalog',
            component: vCatalog
        },
        {
            path: '/cart',
            name: 'cart',
            component: vCart,
            props: true
        },
        {
            path: '/allProducts',
            name: 'allProducts',
            component: vAllProducts,
            props: true
        },
        {
            path: '/product',
            name: 'product',
            component: vProductPage,
            props: true
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

export default router;