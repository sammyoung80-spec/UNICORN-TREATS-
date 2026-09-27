import confetti from 'canvas-confetti';

/**
 * Triggers a luxury Unicorn Treats celebration confetti burst
 * using the brand's hot pink, luxury gold, and cream palette.
 */
export function triggerCelebrationConfetti(origin?: { x: number; y: number }) {
  // Check prefers-reduced-motion
  if (typeof window !== 'undefined') {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;
  }

  const brandColors = ['#F45AA8', '#FF9ACB', '#F4C95D', '#FFF4DE', '#FFE27A'];

  const defaultOrigin = origin || { x: 0.5, y: 0.65 };

  // First burst: fast gold & pink sparkles
  confetti({
    particleCount: 45,
    spread: 70,
    origin: defaultOrigin,
    colors: brandColors,
    startVelocity: 35,
    ticks: 200,
    gravity: 0.9,
    scalar: 1,
    shapes: ['circle', 'square'],
  });

  // Second delayed burst: gentle floating golden stars & hearts
  setTimeout(() => {
    confetti({
      particleCount: 25,
      angle: 60,
      spread: 55,
      origin: { x: Math.max(0.1, defaultOrigin.x - 0.15), y: defaultOrigin.y },
      colors: ['#F4C95D', '#FFE27A', '#F45AA8'],
      startVelocity: 25,
      ticks: 240,
      gravity: 0.8,
      scalar: 1.1,
    });

    confetti({
      particleCount: 25,
      angle: 120,
      spread: 55,
      origin: { x: Math.min(0.9, defaultOrigin.x + 0.15), y: defaultOrigin.y },
      colors: ['#F45AA8', '#FF9ACB', '#F4C95D'],
      startVelocity: 25,
      ticks: 240,
      gravity: 0.8,
      scalar: 1.1,
    });
  }, 120);
}
