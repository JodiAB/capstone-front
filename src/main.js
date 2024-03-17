import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
