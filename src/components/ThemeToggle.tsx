"use client";
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function animateThemeTransition(ms = 420) {
  const doc = document.documentElement;
  // Respect reduced motion
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduce) return;
  doc.classList.add('theme-animating');
  window.setTimeout(() => doc.classList.remove('theme-animating'), ms);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize from localStorage or system
    const stored = (localStorage.getItem('theme') as Theme | null);
    const initial = stored ?? getSystemTheme();
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    animateThemeTransition(500); // a bit slower for smoother feel
  };

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === 'dark'}
      onClick={toggle}
      aria-label={label}
      title={label}
      className="switch"
      suppressHydrationWarning
    >
      <span className="switch-track" aria-hidden="true" />
      <span className="switch-thumb" aria-hidden="true" />
    </button>
  );
}
