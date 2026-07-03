import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import en from './assets/languages/english.json'
import es from './assets/languages/spanish.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  messages: {
    en,
    es,
  },
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
