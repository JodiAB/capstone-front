import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Register from '../views/Register.vue';
import Login from '@/views/Login.vue';
import Admin from '@/views/Admin.vue';
import Products from '@/views/Products.vue';
import AboutView from '../views/AboutView.vue'; 
import Basket from '@/views/Basket.vue';
import Profile from '@/views/Profile.vue';

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
    component: Admin
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
    path: '/basket',
    name: 'basket',
    component: Basket
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
