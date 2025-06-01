"use client";
import { ReactNode } from 'react';
import { motion } from "motion/react";
import { defaultOptions } from '@repo/utils/hooks/useAnimate'

/**
 *
 * @returns: En component der animere et element ind i viewet.
 * @example: <AnimateFadeIn />
 * @alias: AnimateFadeIn
 * @summary: Denne komponent bruges til at animere et element ind i viewet.
 * @version: 1.0.0
 * @property: [children]
 * @author: Kasper Buchholtz
 *
 **/


/**
 *
 * @returns: En component der animere et element ind i viewet.  
 * @example: <AnimateFadeIn />
 * @alias: AnimateFadeIn
 * @summary: Denne komponent bruges til at animere et element ind i viewet.
 * @version: 1.0.0
 * @property: [children]
 * @author: Kasper Buchholtz
 *
 **/

export function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.735,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: -24,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay, duration, ease: defaultOptions.ease, type: 'spring' }}
    >
      {children}
    </motion.div>
  );
}