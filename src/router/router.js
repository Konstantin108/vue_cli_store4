import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/v-catalog'
import vCart from '../components/v-cart'
import vAllProducts from '../components/v-all-products'

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
        }
    ]
})

export default router;