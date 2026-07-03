<script setup>
import MainView from './pages/MainView.vue'
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

import csharp from '@/assets/logos/CSharp.svg'
import github from '@/assets/logos/GitHub.svg'
import javascript from '@/assets/logos/JavaScript.svg'
import python from '@/assets/logos/python.svg'
import dotnet from '@/assets/logos/Net core.svg'
import sqlite from '@/assets/logos/SQLite.svg'
import vue from '@/assets/logos/Vue.js.svg'
import windows from '@/assets/logos/Windows 11.svg'

const { locale } = useI18n()
const rainInterval = ref(null)
const rainContainer = ref(null)
const totalLogos = 8
const logos = [
  csharp,
  github,
  javascript,
  python,
  sqlite,
  vue,
  dotnet,
  windows
]

const changeLanguage = (event) => {
  locale.value = event.target.value
  localStorage.setItem('language', event.target.value)
}

const createLogo = () => {
  if (!rainContainer.value) return

  const randomIndex = Math.floor(Math.random() * logos.length)
  const logo = logos[randomIndex]
  
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgElement.setAttribute('viewBox', logo.viewBox)
  svgElement.setAttribute('width', '50')
  svgElement.setAttribute('height', '50')
  svgElement.style.position = 'absolute'
  svgElement.style.top = '0'
  svgElement.style.left = '0'
  svgElement.style.pointerEvents = 'none'
  
  const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  pathElement.setAttribute('d', logo.path)
  pathElement.setAttribute('fill', logo.color)
  svgElement.appendChild(pathElement)
  
  const startX = Math.random() * window.innerWidth
  const startY = -100
  const offsetX = gsap.utils.random(-100, 100)
  const scale = gsap.utils.random(0.6, 1.2)
  const rotation = gsap.utils.random(0, 360)
  const opacity = gsap.utils.random(0.12, 0.25)
  
  const img = document.createElement('img')

  img.src = logos[Math.floor(Math.random() * logos.length)]

  img.style.position = 'absolute'
  img.style.width = '50px'
  img.style.height = '50px'
  img.style.pointerEvents = 'none'

  rainContainer.value.appendChild(img)
  
  gsap.set(img, {
    x: startX ,
    y: startY,
    scale: scale,
    rotation: rotation,
    opacity: opacity
  })
  
  const duration = gsap.utils.random(8, 15)
  gsap.to(img, {
    y: window.innerHeight + 100,
    x: startX - 25 + offsetX,
    rotation: rotation + 360,
    duration: duration,
    ease: 'power1.inOut',
    onComplete: () => {
      img.remove()
    }
  })
}

onMounted(() => {
  // Crear logos iniciales
  for (let i = 0; i < totalLogos; i++) {
    setTimeout(createLogo, i * 3000)
  }
  
  // Crear nuevos logos continuamente
  rainInterval.value = setInterval(() => {
    createLogo()
  }, 5000)
})

onUnmounted(() => {
  if (rainInterval.value) {
    clearInterval(rainInterval.value)
  }
})
</script>

<template>
  <div class="bg-black text-white min-h-screen relative overflow-hidden">
    <!-- Contenedor de la lluvia de iconos -->
    <div ref="rainContainer" class="fixed inset-0 pointer-events-none z-0"></div>

    <div class="fixed top-5 right-5 z-50">
      <select :value="locale" @change="changeLanguage" class="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="en">🇺🇸 English</option>
        <option value="es">🇪🇸 Español</option>
      </select>
    </div>

    <div class="relative z-10">
      <MainView />
    </div>
  </div>
</template>

