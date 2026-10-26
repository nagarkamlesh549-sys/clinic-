"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;

export default function GlobalEyeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES + 1).fill(false));
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // Target frame from scroll, and current smoothed frame
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);

  // Helper to format frame path
  const getFramePath = (index: number) => {
    const padded = String(index).padStart(4, "0");
    return `/Eyes_opening_frames_24fps/frame_${padded}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let isDestroyed = false;

    // 1. Declare renderFrame
    function renderFrame(frameIndex: number, forceRedraw = false) {
      if (!ctx || !canvas) return;

      // Find exact frame or nearest loaded frame
      let imgToDraw = imagesRef.current[frameIndex];
      if (!imgToDraw || !isLoadedRef.current[frameIndex]) {
        // Search backwards
        for (let i = frameIndex - 1; i >= 1; i--) {
          if (imagesRef.current[i] && isLoadedRef.current[i]) {
            imgToDraw = imagesRef.current[i];
            break;
          }
        }
        // If not found backwards, search forwards
        if (!imgToDraw) {
          for (let i = frameIndex + 1; i <= TOTAL_FRAMES; i++) {
            if (imagesRef.current[i] && isLoadedRef.current[i]) {
              imgToDraw = imagesRef.current[i];
              break;
            }
          }
        }
      }

      if (!imgToDraw) return;
      if (!forceRedraw && imgToDraw === lastDrawnImgRef.current) return;
      lastDrawnImgRef.current = imgToDraw;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = imgToDraw.naturalWidth || 1280;
      const imgHeight = imgToDraw.naturalHeight || 720;

      const canvasAspect = canvasWidth / canvasHeight;
      const imgAspect = imgWidth / imgHeight;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (canvasAspect > imgAspect) {
        // Ultra-wide screens: fit width, center vertically
        drawW = canvasWidth;
        drawH = canvasWidth / imgAspect;
        drawX = 0;
        drawY = (canvasHeight - drawH) / 2;
      } else if (canvasAspect < 0.95) {
        // Mobile phones & portrait tablets:
        // Fit full height to eliminate letterboxing
        drawH = canvasHeight;
        drawW = canvasHeight * imgAspect;
        drawY = 0;
        // The right eye pupil in the 1280x720 video is at x = 944 (944 / 1280 = 0.7375)
        // Center the eye directly in the mobile screen center (canvasWidth * 0.50)
        const pupilFractionX = 944 / 1280;
        drawX = (canvasWidth * 0.50) - (drawW * pupilFractionX);
      } else {
        // Standard desktop / landscape tablet:
        // Fit height, center horizontally
        drawH = canvasHeight;
        drawW = canvasHeight * imgAspect;
        drawX = (canvasWidth - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(imgToDraw, drawX, drawY, drawW, drawH);
    }

    // 2. Declare resizeCanvas
    function resizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      renderFrame(Math.round(currentFrameRef.current), true);
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();

    // 3. High-performance Priority Frame Preloader
    function preloadFrames() {
      const p1: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i += 3) {
        p1.push(i);
      }
      const p2: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!p1.includes(i)) p2.push(i);
      }

      const queue = [...p1, ...p2];
      const CONCURRENCY = 14;
      let activeRequests = 0;

      function loadNext() {
        if (isDestroyed || queue.length === 0) return;

        while (activeRequests < CONCURRENCY && queue.length > 0) {
          const currentTarget = Math.round(targetFrameRef.current);
          let chosenIdx = 0;
          let bestDist = Math.abs(queue[0] - currentTarget);
          const lookAhead = Math.min(30, queue.length);
          for (let k = 1; k < lookAhead; k++) {
            const dist = Math.abs(queue[k] - currentTarget);
            if (dist < bestDist) {
              bestDist = dist;
              chosenIdx = k;
            }
          }

          const frameIdx = queue.splice(chosenIdx, 1)[0];
          activeRequests++;

          const img = new Image();
          img.src = getFramePath(frameIdx);
          img.onload = () => {
            if (isDestroyed) return;
            imagesRef.current[frameIdx] = img;
            isLoadedRef.current[frameIdx] = true;
            activeRequests--;

            const cur = Math.round(currentFrameRef.current);
            if (Math.abs(frameIdx - cur) <= 3) {
              renderFrame(cur);
            }

            loadNext();
          };
          img.onerror = () => {
            activeRequests--;
            loadNext();
          };
        }
      }

      for (let c = 0; c < CONCURRENCY; c++) {
        loadNext();
      }
    }

    // 4. Load Frame 1 immediately
    const img1 = new Image();
    img1.src = getFramePath(1);
    img1.onload = () => {
      if (isDestroyed) return;
      imagesRef.current[1] = img1;
      isLoadedRef.current[1] = true;
      setFirstFrameReady(true);
      renderFrame(1, true);

      preloadFrames();
    };

    // 5. Scroll listener mapping entire webpage scroll progress to 240 frames
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = Math.max(1, docHeight - winHeight);

      const rawProgress = Math.max(0, Math.min(1, scrollY / maxScroll));

      // Non-linear easing curve: opens gracefully in the hero and stays in clear vision across the site
      const easedProgress = Math.pow(rawProgress, 0.60);

      const target = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(easedProgress * (TOTAL_FRAMES - 1)) + 1)
      );

      targetFrameRef.current = target;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 6. Smooth Lerp Animation Loop (60fps)
    function animate() {
      if (isDestroyed) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.04) {
        currentFrameRef.current += diff * 0.18;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      renderFrame(frameToDraw);

      animationFrameIdRef.current = requestAnimationFrame(animate);
    }

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      isDestroyed = true;
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      {/* High-speed HTML5 Canvas rendering the 240 eye-opening frames */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: firstFrameReady ? 1 : 0 }}
      />

      {/* Atmospheric Overlays for Depth, Contrast, and Eye Prominence */}
      {/* 1. Desktop: Left-side gradient so left-aligned text & badges have deep contrast */}
      <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-[#040D18]/90 via-[#040D18]/45 to-transparent pointer-events-none" />

      {/* 2. Mobile: Subtle top/bottom vignette leaving the center eye bright and visible */}
      <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-[#040D18]/60 via-transparent to-[#040D18]/70 pointer-events-none" />

      {/* 3. Top subtle shadow for navbar readability */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#040D18]/90 via-[#040D18]/30 to-transparent pointer-events-none" />

      {/* 4. Bottom subtle shadow for footer readability */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#040D18]/95 via-[#040D18]/40 to-transparent pointer-events-none" />

      {/* 5. Center ambient radial glow allowing the opening human eye to shine through with iris clarity */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(19,163,168,0.15)_0%,rgba(4,13,24,0.3)_100%)] sm:bg-[radial-gradient(ellipse_at_68%_50%,rgba(19,163,168,0.12)_0%,rgba(4,13,24,0.35)_100%)] pointer-events-none" />

      {/* 6. Subtle gold & teal chromatic luminescence */}
      <div className="absolute inset-0 bg-gradient-to-tr from-teal/10 via-transparent to-gold/10 mix-blend-screen pointer-events-none" />
    </div>
  );
}
