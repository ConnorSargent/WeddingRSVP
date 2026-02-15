import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const baseUrl = import.meta.env.BASE_URL
document.documentElement.style.setProperty('--base-url', baseUrl)
document.documentElement.style.setProperty('--bg-top-url', `url(${baseUrl}backgrounds/bgtop.png)`)
document.documentElement.style.setProperty('--bg-left-url', `url(${baseUrl}backgrounds/bgleft.png)`)
document.documentElement.style.setProperty('--bg-right-url', `url(${baseUrl}backgrounds/bgright.png)`)

createApp(App).mount('#app')
