import React, { useEffect, useRef } from 'react';

import styles from './Starfield.module.css';

const TINTS = ['245,245,247', '245,245,247', '245,245,247', '255,217,176'];

/*
  Fixed canvas behind the whole page. Stars sit at different depths: scrolling shifts
  them by depth, and scroll speed stretches them into streaks, so the page reads as
  travel. A reduced-motion visitor gets one static frame.
*/
const Starfield = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let stars = [];
    let frame = 0;
    let running = true;
    let scrollY = window.scrollY;
    let lastY = scrollY;
    let vel = 0;
    let pointerX = 0;
    let shooter = null;
    let nextShooter = 6000;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(280, (w * h) / 6500));
      stars = Array.from({ length: count }, () => {
        const depth = 0.08 + 0.92 * Math.random() ** 3;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          depth,
          r: 0.45 + depth * 1.25,
          alpha: 0.28 + depth * 0.72,
          rate: 0.4 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        };
      });
    };

    const wrap = (value, size) => ((value % size) + size) % size;

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const sy = still ? 0 : scrollY;
      for (const s of stars) {
        const y = wrap(s.y - sy * s.depth * 0.32 - (still ? 0 : t * 0.005 * s.depth), h);
        const x = s.x + pointerX * s.depth * 14;
        const twinkle = still ? 1 : 0.72 + 0.28 * Math.sin(t * 0.001 * s.rate + s.phase);
        const color = `rgba(${s.tint},${(s.alpha * twinkle).toFixed(3)})`;
        const streak = vel * s.depth * 0.85;
        if (Math.abs(streak) > 1.4) {
          ctx.strokeStyle = color;
          ctx.lineWidth = s.r;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + streak);
          ctx.stroke();
        } else {
          ctx.fillStyle = color;
          ctx.fillRect(x - s.r / 2, y - s.r / 2, s.r, s.r);
        }
      }

      if (shooter) {
        const age = t - shooter.born;
        const life = age / 900;
        if (life >= 1) {
          shooter = null;
        } else {
          const hx = shooter.x + shooter.vx * age;
          const hy = shooter.y + shooter.vy * age;
          const tail = ctx.createLinearGradient(hx, hy, hx - shooter.vx * 160, hy - shooter.vy * 160);
          tail.addColorStop(0, `rgba(255,236,214,${(1 - life).toFixed(3)})`);
          tail.addColorStop(1, 'rgba(255,236,214,0)');
          ctx.strokeStyle = tail;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(hx - shooter.vx * 160, hy - shooter.vy * 160);
          ctx.stroke();
        }
      }
    };

    const loop = (t) => {
      if (!running) return;
      vel += (Math.max(-90, Math.min(90, scrollY - lastY)) - vel) * 0.14;
      lastY = scrollY;
      if (!shooter && t > nextShooter) {
        shooter = { born: t, x: Math.random() * w * 0.6, y: Math.random() * h * 0.35, vx: 0.9, vy: 0.45 };
        nextShooter = t + 9000 + Math.random() * 8000;
      }
      draw(t);
      frame = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onPointer = (e) => {
      pointerX = e.clientX / w - 0.5;
    };
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Mobile browsers resize on every address-bar change; only reseed on a real change.
        if (window.innerWidth !== w || Math.abs(window.innerHeight - h) > 160) {
          seed();
          if (still) draw(0);
        }
      }, 150);
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running && !still) frame = requestAnimationFrame(loop);
    };

    seed();
    if (still) {
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('pointermove', onPointer, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
    }
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
};

export default Starfield;
