<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import GithubProjects from '../components/GithubProjects.vue'

const heroTitle = ref(null)
const heroSubtitle = ref(null)
const heroText = ref(null)
const heroButtons = ref(null)

onMounted(() => {
  // Elegant fade-in and slide-up timeline for the Hero section
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
  
  tl.fromTo(heroTitle.value, 
    { opacity: 0, y: 60, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2 }
  )
  .fromTo(heroSubtitle.value, 
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1.0 },
    '-=0.8'
  )
  .fromTo(heroText.value, 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1.0 },
    '-=0.8'
  )
  .fromTo(heroButtons.value.children, 
    { opacity: 0, scale: 0.8, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15 },
    '-=0.8'
  )
})
</script>

<template> 
    <!-- Hero Section -->
    <div class="flex flex-col items-center justify-center min-h-screen text-center px-6 py-12 relative overflow-hidden bg-transparent">
      <!-- Ambient background decoration for hero -->
      <div class="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none z-0"></div>
      <div class="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none z-0"></div>

      <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 ref="heroTitle" class="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
          {{ $t("hero.title") }}
        </h1>

        <h2 ref="heroSubtitle" class="mt-6 text-xl md:text-3xl font-semibold text-blue-400">
          {{ $t("hero.subtitle") }}
        </h2>

        <p ref="heroText" class="mt-6 max-w-2xl text-base md:text-xl text-gray-400 font-light leading-relaxed">
          {{ $t("hero.description") }}
        </p>

        <div ref="heroButtons" class="mt-10 flex flex-wrap justify-center gap-4">
            <a href="https://github.com/FrankCisneros" target="_blank" class="btn bg-black text-white hover:bg-gray-800 border-none px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer font-semibold shadow-lg shadow-black/10 transition-transform duration-300">
                <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path>
                </svg>            
                {{ $t("hero.github") }}
            </a>

            <a href="https://linkedin.com" target="_blank" class="btn bg-[#0967C2] text-white hover:bg-[#0059b3] border-none px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer font-semibold shadow-lg shadow-[#0967C2]/10 transition-transform duration-300">
                <svg aria-label="LinkedIn logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path fill="white" d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" fill-rule="evenodd"></path>
                </svg>
                {{ $t("hero.linkedin") }}
            </a>
        </div>
      </div>
      
      <!-- para el scroll -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-pulse pointer-events-none">
        <span class="text-xs uppercase tracking-widest font-semibold">{{ $t("hero.scroll") }}</span>
        <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>

    <!-- GSAP horizontal scroll para los proyectos -->
    <GithubProjects />
</template>