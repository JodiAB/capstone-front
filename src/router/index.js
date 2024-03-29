import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Register from '../views/Register.vue';
import Login from '@/views/Login.vue';
import Admin from '@/views/Admin.vue';
import Products from '@/views/Products.vue';
import AboutView from '../views/AboutView.vue'; 
import Profile from '@/views/Profile.vue';
import Contact from '@/views/Contact.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView 
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});   




router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.isLoggedIn;

  if (to.meta.requiresAuth && !loggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});



export default router;
