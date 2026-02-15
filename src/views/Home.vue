<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { rainConfetti } from '../utils/confetti'
import Countdown from '../components/Countdown.vue'
import RSVPModal from '../components/RSVPModal.vue'
import ScrollingGallery from '../components/ScrollingGallery.vue'

gsap.registerPlugin(ScrollTrigger)

const baseUrl = import.meta.env.BASE_URL
const showRSVP = ref(false)
const showSecretOverlay = ref(false)
const heroTapCount = ref(0)
let heroTapResetTimer = null
const heroImageRef = ref(null)
const mastheadRef = ref(null)
const headlineRef = ref(null)
const headlineSubRef = ref(null)
const headlineNamesRef = ref(null)
const articleRef = ref(null)
const asideRef = ref(null)
const gallerySectionRef = ref(null)
const rsvpBtnRef = ref(null)

let kenBurnsTl = null
let gsapCtx = null

const galleryImages = [
  'images/IMG_8990.jpeg',
  'images/IMG_7430.jpeg',
  'images/IMG_2206.jpeg',
  'images/IMG_1604.JPG',
  'images/45F7C979-13B6-4982-8229-CA9F6A5ADAF5_VSCO.JPG',
  'images/PXL_20251225_153047033.TS-000~2.jpeg',
  'images/IMG_9924.jpeg',
  'images/IMG_9838.JPG',
  'images/IMG_9535_VSCO.JPG',
]

function openRSVP() {
  rainConfetti()
  showRSVP.value = true
}

function onHeroTap() {
  heroTapCount.value += 1
  if (heroTapResetTimer) clearTimeout(heroTapResetTimer)
  heroTapResetTimer = setTimeout(() => { heroTapCount.value = 0 }, 2000)
  if (heroTapCount.value >= 1) {
    showSecretOverlay.value = true
    heroTapCount.value = 0
    if (heroTapResetTimer) clearTimeout(heroTapResetTimer)
  }
}

function closeSecretOverlay() {
  showSecretOverlay.value = false
}

onMounted(() => {
  gsapCtx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (mastheadRef.value) {
      tl.fromTo(mastheadRef.value, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
    }
    if (headlineRef.value) {
      tl.fromTo(headlineRef.value, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
    }
    if (headlineSubRef.value) {
      tl.fromTo(headlineSubRef.value, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.35')
    }
    if (headlineNamesRef.value) {
      tl.fromTo(headlineNamesRef.value, { scale: 0.98, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.2)' }, '-=0.4')
    }

    if (articleRef.value) {
      tl.fromTo(articleRef.value, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.2')
    }
    if (asideRef.value) {
      tl.fromTo(asideRef.value, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
    }

    if (gallerySectionRef.value) {
      tl.fromTo(gallerySectionRef.value, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
    }

    if (rsvpBtnRef.value) {
      tl.fromTo(rsvpBtnRef.value, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
    }

    if (heroImageRef.value) {
      const el = heroImageRef.value
      kenBurnsTl = gsap.timeline({ repeat: -1 })
      kenBurnsTl
        .fromTo(el, { scale: 1, x: 0, y: 0, rotation: 0 }, { scale: 1.18, x: '4%', y: '-3%', rotation: 0.5, duration: 20, ease: 'none' })
        .to(el, { scale: 1.12, x: '-3%', y: '4%', rotation: -0.3, duration: 18, ease: 'none' }, 6)
        .to(el, { scale: 1.2, x: '2%', y: '2%', rotation: 0.2, duration: 22, ease: 'none' }, 14)
        .to(el, { scale: 1, x: 0, y: 0, rotation: 0, duration: 16, ease: 'none' }, 28)
    }
  })
})

onUnmounted(() => {
  if (gsapCtx) gsapCtx.revert()
  if (kenBurnsTl) kenBurnsTl.kill()
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div class="page-wrap min-h-screen bg-[var(--paper)]">
    <!-- Hanging flower backgrounds (from /public/backgrounds/) -->
    <div class="bg-flowers" aria-hidden="true">
      <div class="bg-flowers__top"></div>
      <div class="bg-flowers__left"></div>
      <div class="bg-flowers__right"></div>
    </div>
    <header ref="mastheadRef" class="text-center pt-10 pb-2 px-4">
      <h1 class="font-body text-2xl md:text-3xl text-[var(--ink)] font-medium tracking-wide">
        We're Getting Married
      </h1>
    </header>

    <div class="max-w-4xl mx-auto px-4 pt-4 pb-6">
      <h2 ref="headlineRef" class="font-body text-xl md:text-2xl text-[var(--ink)] text-center font-light">
        The Wedding of
      </h2>
      <h3 ref="headlineNamesRef" class="font-body text-4xl md:text-6xl text-[var(--ink)] text-center mt-2 font-medium tracking-tight">
        Maggie & Connor
      </h3>
      <p ref="headlineSubRef" class="font-body text-center text-[var(--muted)] text-lg mt-4 italic">
        We can't wait to celebrate with you.
      </p>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="grid md:grid-cols-12 gap-8 md:gap-10">
        <article ref="articleRef" class="md:col-span-7 space-y-5">
          <div
            class="relative overflow-hidden rounded-sm aspect-[3/4] bg-[var(--paper-warm)] cursor-pointer"
            role="button"
            tabindex="0"
            @click="onHeroTap"
            @keydown.enter="onHeroTap"
            @keydown.space.prevent="onHeroTap"
          >
            <img
              ref="heroImageRef"
              :src="baseUrl + 'images/IMG_9256.jpeg'"
              alt="The happy couple"
              class="img-sepia absolute inset-0 w-full h-full object-cover origin-center pointer-events-none"
            />
          </div>
          <p class="font-body text-[var(--ink)] text-lg leading-relaxed">
            We can't wait to celebrate with you. Please RSVP by the deadline below.
          </p>
        </article>

        <aside ref="asideRef" class="md:col-span-5 space-y-6">
          <div>
            <h4 class="font-body text-lg text-[var(--ink)] font-medium mb-2">
              When & Where
            </h4>
            <p class="font-body text-[var(--muted)] leading-relaxed space-y-2">
              <span class="block font-medium text-[var(--ink)]">22nd August 2026</span>
              Starts at 10:30 — please arrive by 10:15.<br />
              Brunch and snacks supplied.
            </p>
            <p class="font-body text-[var(--muted)] leading-relaxed mt-3">
              <span class="block font-medium text-[var(--ink)]">616 E Saint Andrews Drive</span>
              Sioux Falls, South Dakota<br />
              United States
            </p>
          </div>
          <div>
            <h4 class="font-body text-lg text-[var(--ink)] font-medium mb-2">
              Dress Code
            </h4>
            <p class="font-body text-[var(--muted)] leading-relaxed">
              Formal / Garden Party
            </p>
          </div>
          <Countdown wedding-date="2026-08-22T10:30:00" />
          <div>
            <p class="font-body text-[var(--muted)] text-sm leading-relaxed">
              <span class="font-medium text-[var(--ink)]">RSVP deadline:</span> July 18th, 2026
            </p>
          </div>
          <div ref="rsvpBtnRef">
            <button
              type="button"
              class="font-body w-full text-lg py-3 px-4 rounded-sm border border-[var(--paper-line)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--paper-warm)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              @click="openRSVP"
            >
              RSVP
            </button>
          </div>
        </aside>
      </div>
    </div>

    <section ref="gallerySectionRef" class="mt-12 py-8 border-t border-[var(--paper-line)] bg-[var(--paper-warm)]/40">
      <p class="font-body text-center text-[var(--ink)] text-2xl md:text-3xl font-medium mb-4">
        Our Story
      </p>
      <ScrollingGallery :images="galleryImages" :base-url="baseUrl" :speed="45" />
    </section>

    <RSVPModal v-model="showRSVP" form-src="https://docs.google.com/forms/d/e/1FAIpQLSf7bNsvdbae8yYS7LJu7ze3-kSWgBqBD8suF1NEI5Ii7Ya86Q/viewform?embedded=true" />

    <!-- Secret overlay: tap main image once -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="showSecretOverlay"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-label="Secret"
          @click.self="closeSecretOverlay"
        >
          <div class="relative max-w-md w-full rounded-lg overflow-hidden bg-[var(--paper)] border border-[var(--paper-line)] shadow-2xl" @click.stop>
            <img
              :src="baseUrl + 'images/45F7C979-13B6-4982-8229-CA9F6A5ADAF5_VSCO.JPG'"
              alt=""
              class="w-full aspect-[3/4] object-cover"
            />
            <p class="font-body text-center text-[var(--ink)] text-xl italic px-4 py-4">
              "Ive got that dog in me"
            </p>
            <button
              type="button"
              class="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Close"
              @click="closeSecretOverlay"
            >
              ×
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
