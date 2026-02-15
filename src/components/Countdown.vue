<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  weddingDate: {
    type: String,
    default: '2026-08-22T10:30:00',
  },
})

const now = ref(Date.now())
let intervalId = null

const weddingTime = computed(() => new Date(props.weddingDate).getTime())

const diff = computed(() => {
  const d = Math.max(0, weddingTime.value - now.value)
  return {
    days: Math.floor(d / (1000 * 60 * 60 * 24)),
    hours: Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((d % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((d % (1000 * 60)) / 1000),
  }
})

const pad = (n) => String(n).padStart(2, '0')

const digitRefs = { days: ref(null), hours: ref(null), minutes: ref(null), seconds: ref(null) }

watch(diff, (next, prev) => {
  if (!prev) return
  ;(['days', 'hours', 'minutes', 'seconds']).forEach((key) => {
    if (next[key] !== prev[key] && digitRefs[key].value) {
      gsap.fromTo(digitRefs[key].value, { scale: 1.3, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' })
    }
  })
}, { deep: true })

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section
    class="countdown-section border border-[var(--paper-line)] rounded-sm bg-[var(--paper)] p-4"
    aria-label="Countdown to wedding"
  >
    <h2 class="font-body text-base text-[var(--ink)] text-center mb-3 font-medium">
      Until the big day
    </h2>
    <div class="grid grid-cols-4 gap-2">
      <div
        v-for="(value, key) in diff"
        :key="key"
        class="text-center border border-[var(--paper-line)] rounded-sm bg-[var(--paper-warm)]/60 py-2 px-1"
      >
        <div
          :ref="el => { digitRefs[key].value = el }"
          class="font-body text-xl md:text-2xl text-[var(--ink)] tabular-nums inline-block font-medium"
        >
          {{ pad(value) }}
        </div>
        <div class="font-body text-[10px] md:text-xs tracking-wide text-[var(--muted)] mt-0.5">
          {{ key }}
        </div>
      </div>
    </div>
  </section>
</template>
