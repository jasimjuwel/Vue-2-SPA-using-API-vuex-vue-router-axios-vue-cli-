import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/product-create',
            name: 'product-create',
            // lazy-loaded
            component: () => import('./components/ProductCreate.vue'),
            meta: {
                auth: true
            },
        }, {
            path: '/product-edit/:id',
            name: 'product-edit',
            // lazy-loaded
            component: () => import('./components/ProductEdit.vue'),
            meta: {
                auth: true
            },
        }
    ]
});

