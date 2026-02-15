<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  speed: { type: Number, default: 30 },
  /** Base URL for asset paths (e.g. import.meta.env.BASE_URL for GitHub Pages) */
  baseUrl: { type: String, default: '' },
})

const trackRef = ref(null)
let scrollTween = null
let floatTweens = []

onMounted(() => {
  if (!trackRef.value || !props.images.length) return
  const track = trackRef.value
  const width = track.scrollWidth / 2

  scrollTween = gsap.to(track, {
    x: -width,
    duration: props.speed,
    ease: 'none',
    repeat: -1,
    onRepeat: () => gsap.set(track, { x: 0 }),
  })

  // Subtle float on each gallery image (staggered for a wave effect)
  const cards = track.querySelectorAll('.gallery-card')
  cards.forEach((card, i) => {
    const delay = (i % props.images.length) * 0.4
    const tween = gsap.to(card, {
      y: -6,
      duration: 2 + (i % 3) * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    })
    floatTweens.push(tween)
  })
})

onUnmounted(() => {
  if (scrollTween) scrollTween.kill()
  floatTweens.forEach(t => t.kill())
})
</script>

<template>
  <div class="w-full overflow-hidden gallery-track">
    <div ref="trackRef" class="flex w-max gap-4 py-4">
      <template v-for="(group, g) in 2" :key="g">
        <div
          v-for="(img, i) in images"
          :key="`${g}-${i}`"
          class="gallery-card flex-shrink-0 w-48 md:w-56 aspect-[3/4] overflow-hidden border border-[var(--paper-line)] bg-[var(--paper-warm)]"
        >
          <img
            :src="(baseUrl || '') + (typeof img === 'string' ? img : img.src)"
            :alt="typeof img === 'object' && img.alt ? img.alt : `Gallery ${i + 1}`"
            class="img-sepia w-full h-full object-cover"
          />
        </div>
      </template>
    </div>
  </div>
</template>
