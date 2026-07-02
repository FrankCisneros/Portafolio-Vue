<script setup>
import { ref } from 'vue'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import vueLogo from '../assets/vue.svg'

const count = ref(0)
</script>

<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img :src="viteLogo" alt="Vite Logo" class="h-8" />
          <span class="font-bold text-xl">My App</span>
        </div>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-gray-300">Home</a>
          <a href="#" class="hover:text-gray-300">About</a>
          <a href="#" class="hover:text-gray-300">Contact</a>
        </div>
      </div>
    </div>
  </nav>
</template>
