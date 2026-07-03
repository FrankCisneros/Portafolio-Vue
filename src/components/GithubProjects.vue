<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()

const containerRef = ref(null)
const scrollSectionRef = ref(null)
const bgOverlayRef = ref(null)
const cardRefs = ref([])

// Project Mock Data
const projects = [
  {
    titleKey: 'projects.gravebeat.title',
    descKey: 'projects.gravebeat.description',
    lang: 'Rust / Vue 3',
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    link: 'https://github.com/FrankCisneros/GraveBeat-Music',
    // Datos extra para la vista de terminal
    techBlock: {
      architecture: 'Tauri v2 + Pinia',
      database: 'SQLite (sqlx)',
      audio: 'Howler.js + Web Audio API',
      status: 'Stable'
    }
  },
  {
    titleKey: 'projects.flowerShop.title',
    descKey: 'projects.flowerShop.description',
    lang: 'Python (FastAPI)',
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    link: null, // Sin enlace público por privacidad
    techBlock: {
      role: 'Backend Architect',
      frontend: 'React (collaboration)',
      deployment: 'Production',
      framework: 'FastAPI'
    }
  },
  {
    titleKey: 'projects.focusBear.title',
    descKey: 'projects.focusBear.description',
    lang: 'C# / .NET',
    color: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    link: 'https://focusbear.io/',
    techBlock: {
      role: 'Windows Developer',
      environment: 'WPF / Avalonia',
      contribution: 'Issue Triage & QA',
      type: 'Private Repository'
    }
  },
  {
    titleKey: 'projects.gameLibrary.title',
    descKey: 'projects.gameLibrary.description',
    lang: 'Backend / SQL',
    color: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    link: 'https://github.com/FrankCisneros/Games-App-Backend',
    techBlock: {
      integrations: 'IGDB + HLTB APIs',
      storage: 'SQLite Local',
      focus: 'Data Aggregation'
    }
  },
  {
    titleKey: 'projects.dulceSabor.title',
    descKey: 'projects.dulceSabor.description',
    lang: 'Fullstack',
    color: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    link: 'https://github.com/FrankCisneros/DulceSaborOnline-WEB',
    techBlock: {
      features: 'Cart & Session Sync',
      state: 'Cross-device Sync',
      db: 'Relational Database'
    }
  }
]

// Map of available project images
const projectImagesMap = {
  'Grave Beat Music': 'GraveBeatMusic.png'
  // Add more images here as they become available:
  // 'TaskFlow Vue Board': 'TaskFlowVueBoard.png',
  // 'PyPredict Analytica': 'PyPredictAnalytica.png',
  // 'DevDeck Terminal CLI': 'DevDeckTerminalCLI.png'
}

const projectImageExists = (title) => {
  return title in projectImagesMap
}

const getProjectImageUrl = (title) => {
  if (title in projectImagesMap) {
    return new URL(`../assets/projects/${projectImagesMap[title]}`, import.meta.url).href
  }
  return ''
}

let ctx

onMounted(() => {
  // We use gsap.context to automatically clean up all animations on unmount
  ctx = gsap.context(() => {
    const scrollSection = scrollSectionRef.value
    const sections = gsap.utils.toArray('.project-slide')

    // ----------------------------------------------------
    // ANIMACIÓN 1: Desplazamiento Horizontal con ScrollTrigger
    // ----------------------------------------------------
    const pinDistance = scrollSection.scrollWidth - window.innerWidth

    const horizontalTween = gsap.to(scrollSection, {
      x: () => -pinDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${pinDistance}`,
        invalidateOnRefresh: true,
        // Al actualizar el progreso, cambiamos el color del fondo dinámicamente (Animación de fondo)
        onUpdate: (self) => {
          const progress = self.progress
          const activeIndex = Math.min(
            Math.floor(progress * sections.length),
            sections.length - 1
          )

          // Cambiar color de fondo gradualmente
          if (activeIndex > 0 && activeIndex <= projects.length) {
            const project = projects[activeIndex - 1]
            gsap.to(bgOverlayRef.value, {
              background: `radial-gradient(circle at 50% 50%, ${project.color}33 0%, rgba(0,0,0,0) 70%)`,
              duration: 0.6
            })
          } else {
            // Fondo por defecto para portada y final
            gsap.to(bgOverlayRef.value, {
              background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(0,0,0,0) 70%)',
              duration: 0.6
            })
          }
        }
      }
    })

    // ----------------------------------------------------
    // ANIMACIÓN 2: Revelado de elementos por slide (containerAnimation)
    // ----------------------------------------------------
    sections.forEach((section) => {
      // Entrada de la tarjeta
      const card = section.querySelector('.project-card')
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.9, rotateY: 15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: section,
              containerAnimation: horizontalTween,
              start: 'left 85%',
              end: 'left 40%',
              scrub: true
            }
          }
        )
      }

      // Parallax para elementos de fondo flotantes
      const floatBg = section.querySelector('.parallax-bg')
      if (floatBg) {
        gsap.fromTo(floatBg,
          { x: 100, rotate: -20, opacity: 0.1 },
          {
            x: -150,
            rotate: 20,
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              containerAnimation: horizontalTween,
              start: 'left right',
              end: 'right left',
              scrub: true
            }
          }
        )
      }

      // Entrada del título y texto en portada
      const coverText = section.querySelector('.cover-text')
      if (coverText) {
        gsap.fromTo(coverText,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              containerAnimation: horizontalTween,
              start: 'left 70%',
              end: 'left 10%',
              scrub: true
            }
          }
        )
      }
    })

    // ----------------------------------------------------
    // ANIMACIÓN 3: Botones Magnéticos (Hover Effect)
    // ----------------------------------------------------
    const magneticBtns = document.querySelectorAll('.magnetic-button')
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        })
      })
    })

  }, containerRef.value)
})


onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div ref="containerRef" class="relative w-full overflow-hidden bg-black text-white select-none">
    <!-- Background Glow Overlay that morphs on scroll -->
    <div ref="bgOverlayRef" class="absolute inset-0 pointer-events-none transition-all duration-700 ease-out z-0"
      style="background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(0,0,0,0) 70%);"></div>

    <!-- Grid lines simulation for premium look -->
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-40 z-0">
    </div>

    <!-- Scroll Section moving horizontally -->
    <div ref="scrollSectionRef" class="relative flex flex-row flex-nowrap h-screen w-[600vw] z-10">

      <!-- SLIDE 1: Portada del Showroom -->
      <section
        class="project-slide w-screen h-screen flex flex-col justify-center px-12 md:px-24 relative overflow-hidden flex-shrink-0">
        <!-- Floating shapes for parallax visual example -->
        <div
          class="parallax-bg absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none z-0">
        </div>
        <div
          class="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-violet-600/5 blur-[80px] pointer-events-none z-0">
        </div>

        <div class="cover-text max-w-4xl relative z-10 space-y-6">
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium">
            <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            {{ t('projects.showroom') }}
          </div>

          <h2
            class="text-6xl md:text-8xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
            {{ t('projects.title1') }}<br>
            <span
              class="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">{{ t('projects.title2') }}</span>
          </h2>

          <p class="text-lg md:text-2xl text-gray-400 font-light max-w-2xl">
            {{ t('projects.description') }}
          </p>

          <div class="pt-8 flex items-center gap-4">
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 animate-ping"></span>
                {{ t('projects.scroll') }}
              </div>
              <div class="w-16 h-8 rounded-full border border-gray-700 flex items-center justify-center p-1">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SLIDES 2 - 5: Project Cards -->
      <section v-for="(p, index) in projects" :key="p.titleKey"
        class="project-slide w-screen h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden flex-shrink-0">
        <!-- Floating gradient background specific to the card color -->
        <div class="parallax-bg absolute -right-20 top-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none z-0"
          :style="{ backgroundColor: p.color + '15' }"></div>

        <!-- Glass card with 3D rotation handlers -->
        <div :ref="el => cardRefs[index] = el" @mousemove="e => handleMouseMove(e, index)"
          @mouseleave="() => handleMouseLeave(index)"
          class="project-card relative w-full max-w-3xl h-[60vh] rounded-2xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row overflow-hidden transition-all duration-300 z-10 group"
          :style="{
            '--glow-color': p.glowColor,
            boxShadow: `0 0 40px -10px ${p.color}20`
          }">
          <!-- Hover Border Glow styling -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
            :style="{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${p.color}0a, transparent 40%)` }">
          </div>

          <!-- Card details -->
          <div class="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-10">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border"
                  :style="{ borderColor: p.color + '50', color: p.color, backgroundColor: p.color + '10' }">
                  {{ p.lang }}
                </span>
              </div>

              <h3
                class="text-2xl md:text-3xl font-black mb-3 group-hover:translate-x-2 transition-transform duration-300"
                :style="{ textShadow: `0 0 20px ${p.color}30` }">
                {{ t(p.titleKey) }}
              </h3>
              <p
                class="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xl font-light text-justify group-hover:translate-x-1 transition-transform duration-300">
                {{ t(p.descKey) }}
              </p>
            </div>

            <div class="pt-6">
              <a v-if="p.link" :href="p.link" target="_blank"
                class="magnetic-button inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                {{ t('projects.viewProject') }}
              </a>
              <span v-else class="text-xs text-gray-500 font-mono italic">
                {{ t('projects.privateRepo') }}
              </span>
            </div>
          </div>

          <div
            class="hidden md:flex w-[40%] relative overflow-hidden bg-gradient-to-br from-black/40 to-black/80 border-l border-white/[0.05] items-center justify-center p-6">

            <div
              class="w-full h-auto rounded-xl bg-[#0d1117] border border-gray-800 shadow-2xl font-mono text-[13px] leading-relaxed text-gray-300 overflow-hidden relative z-10">
              <div class="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-gray-800">
                <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
                <span class="ml-2 text-xs text-gray-500">specs.json</span>
              </div>

              <div class="p-4 space-y-1">
                <p><span class="text-pink-400">const</span> <span class="text-blue-400">tech_stack</span> <span
                    class="text-white">=</span> <span class="text-yellow-300">{</span></p>

                <p v-for="(val, key) in p.techBlock" :key="key" class="pl-4">
                  <span class="text-teal-300">"{{ key }}"</span><span class="text-white">:</span>
                  <span class="text-orange-300">"{{ val }}"</span><span class="text-gray-500">,</span>
                </p>

                <p class="text-yellow-300">}</p>
              </div>
            </div>

            <div
              class="absolute w-64 h-64 rounded-full blur-[60px] pointer-events-none opacity-20 transition-transform duration-500 group-hover:scale-110"
              :style="{ backgroundColor: p.color }"></div>
          </div>

        </div>
      </section>

      <!-- SLIDE 6: Final CTA (Contact & Links) -->
      <section
        class="project-slide w-screen h-screen flex flex-col justify-center items-center relative overflow-hidden flex-shrink-0 text-center px-6">
        <div
          class="parallax-bg absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-violet-600/10 blur-[90px] pointer-events-none z-0">
        </div>

        <div class="max-w-xl space-y-6 relative z-10">
          <div class="text-sm font-semibold tracking-wider text-indigo-400 uppercase">{{ t('projects.ctaSubtitle') }}</div>
          <h2 class="text-4xl md:text-6xl font-black">{{ t('projects.ctaTitle') }}</h2>
          <p class="text-gray-400 font-light text-sm md:text-base">
            {{ t('projects.ctaDescription') }}
          </p>

          <div class="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://github.com/FrankCisneros" target="_blank"
              class="magnetic-button btn bg-white text-black border-white hover:bg-transparent hover:text-white px-8 py-3 rounded-full flex items-center gap-2 cursor-pointer font-bold w-full sm:w-auto">
              {{ t('projects.viewAll') }}
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
/* Enable 3D transitions for cards */
.project-card {
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;
  transition: box-shadow 0.3s ease;
}

.project-slide {
  perspective: 1000px;
}
</style>
