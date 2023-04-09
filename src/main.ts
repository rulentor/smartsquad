import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router"
import App from './App.vue'
import "./css/base.css"

const routes = [
    { path: '/', component: () => import("./views/Landing.vue") },
    { path: '/info/:id', component: () => import("./views/Onboarding.vue") },
    { path: '/dashboard', redirect: "/dashboard/stats" },
    { path: '/dashboard/:section', component: () => import("./views/Dashboard.vue") },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(router)
app.mount('#app')