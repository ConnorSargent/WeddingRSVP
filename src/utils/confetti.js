import confetti from 'canvas-confetti'

/**
 * Rains confetti from the top of the screen when RSVP is opened.
 * Continuous rain plus side bursts for a big celebration moment.
 */
export function rainConfetti() {
  const duration = 3200
  const end = Date.now() + duration
  const colors = ['#c9a227', '#8b6914', '#f4e4c1', '#5c4033', '#d4af37', '#b8860b', '#e8d4a8']

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 90,
      spread: 70,
      origin: { x: Math.random(), y: 0 },
      colors,
      startVelocity: 28,
      gravity: 1.1,
      scalar: 0.95,
      drift: 0.02,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()

  // Side bursts for a "magical" shower
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 65,
      spread: 60,
      origin: { x: 0, y: 0.5 },
      colors,
      startVelocity: 40,
    })
    confetti({
      particleCount: 80,
      angle: 115,
      spread: 60,
      origin: { x: 1, y: 0.5 },
      colors,
      startVelocity: 40,
    })
  }, 150)
}
