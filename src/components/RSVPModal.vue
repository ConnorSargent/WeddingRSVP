<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  /** Replace with your Google Form embed URL from Share → Embed HTML */
  formSrc: {
    type: String,
    default: 'https://docs.google.com/forms/d/e/1FAIpQLSeEXAMPLE/viewform?embedded=true',
  },
})

const emit = defineEmits(['update:modelValue'])
const modalContentRef = ref(null)

function close() {
  emit('update:modelValue', false)
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

function onClickBackdrop(e) {
  if (e.target === e.currentTarget) close()
}

watch(() => props.modelValue, (open) => {
  if (open && modalContentRef.value) {
    gsap.fromTo(modalContentRef.value, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.2)' })
  }
})

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm"
        aria-modal="true"
        role="dialog"
        aria-label="RSVP form"
        @click="onClickBackdrop"
      >
        <div
          ref="modalContentRef"
          class="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-sm flex flex-col bg-[var(--paper)] border-0 md:border border-[var(--paper-line)] shadow-2xl overflow-hidden"
          @click.stop
        >
          <div class="flex items-center justify-between p-3 border-b border-[var(--paper-line)] bg-[var(--paper-warm)]">
            <h2 class="font-body text-lg md:text-xl text-[var(--ink)] font-medium">RSVP</h2>
            <button
              type="button"
              class="p-2 rounded border border-[var(--paper-line)] bg-[var(--paper)] hover:bg-[var(--paper-warm)] font-body text-[var(--ink)] transition-colors"
              aria-label="Close"
              @click="close"
            >
              ✕
            </button>
          </div>
          <div class="flex-1 min-h-0 flex flex-col">
            <iframe
              :src="formSrc"
              title="RSVP form"
              class="w-full flex-1 min-h-[70vh] md:min-h-[60vh] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
