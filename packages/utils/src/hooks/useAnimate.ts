/**
 * Default animation options used for configuring animations.
 *
 * @property {number} duration - The duration of the animation in seconds.
 * @property {number[]} ease - The easing function represented as a cubic Bezier curve.
 * @property {number} delay - The delay before the animation starts, in seconds.
 */

export const defaultOptions = {
  duration: 0.735,
  ease: [0.65, 0.05, 0, 1],
  delay: 0.3,
}

export const useAnimate = () => {
  return defaultOptions
}
