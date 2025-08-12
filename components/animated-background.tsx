"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"
import { useTheme } from "next-themes"

interface AnimatedBackgroundProps {
  variant?: "particles" | "waves" | "starfield"
}

export function AnimatedBackground({ variant = "particles" }: AnimatedBackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded callback
  }, [])

  const getParticlesConfig = () => {
    const baseConfig = {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: isDark ? "#ffffff" : "#000000",
        },
        links: {
          color: isDark ? "#ffffff" : "#000000",
          distance: 150,
          enable: variant === "particles",
          opacity: 0.1,
          width: 1,
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: {
            default: "bounce" as const,
          },
          random: false,
          speed: variant === "starfield" ? 0.5 : 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: variant === "starfield" ? 100 : variant === "waves" ? 50 : 80,
        },
        opacity: {
          value: variant === "starfield" ? 0.8 : 0.2,
        },
        shape: {
          type: variant === "starfield" ? "star" : "circle",
        },
        size: {
          value: { min: 1, max: variant === "starfield" ? 3 : 5 },
        },
      },
      detectRetina: true,
    }

    if (variant === "waves") {
      return {
        ...baseConfig,
        particles: {
          ...baseConfig.particles,
          move: {
            ...baseConfig.particles.move,
            direction: "top" as const,
            speed: 1,
          },
          opacity: {
            value: 0.1,
          },
          size: {
            value: { min: 2, max: 8 },
          },
        },
      }
    }

    return baseConfig
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id={`tsparticles-${variant}`}
        init={particlesInit}
        loaded={particlesLoaded}
        options={getParticlesConfig()}
        className="absolute inset-0"
      />
    </div>
  )
}
