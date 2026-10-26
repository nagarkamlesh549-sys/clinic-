"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

const TOTAL_FRAMES = 240;

interface EyeScrollBackgroundProps {
  children?: ReactNode;
}

export default function EyeScrollBackground({ children }: EyeScrollBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
        drawW = canvasWidth;
        drawH = canvasWidth / imgAspect;
        drawX = 0;
        drawY = (canvasHeight - drawH) / 2;
      } else {
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

    // 3. High-performance, priority-aware Frame Preloader
    function preloadFrames() {
      // Build priority list:
      // Priority 1: Key milestones across the 240-frame sequence (every 4th frame)
      const p1: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i += 4) {
        p1.push(i);
      }
      // Priority 2: In-between frames in the opening segment (1-120)
      const p2: number[] = [];
      for (let i = 2; i <= 120; i++) {
        if (!p1.includes(i)) p2.push(i);
      }
      // Priority 3: Remaining frames (121-240)
      const p3: number[] = [];
      for (let i = 121; i <= TOTAL_FRAMES; i++) {
        if (!p1.includes(i) && !p2.includes(i)) p3.push(i);
      }

      const queue = [...p1, ...p2, ...p3];
      const CONCURRENCY = 12;
      let activeRequests = 0;

      function loadNext() {
        if (isDestroyed || queue.length === 0) return;

        while (activeRequests < CONCURRENCY && queue.length > 0) {
          // Dynamic priority: pick item closest to current target frame
          const currentTarget = Math.round(targetFrameRef.current);
          let chosenIdx = 0;
          let bestDist = Math.abs(queue[0] - currentTarget);
          // Look ahead up to first 25 queue items for best match
          const lookAhead = Math.min(25, queue.length);
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

            // If this newly loaded image is closer to the current frame than what's currently drawn, redraw!
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

    // 4. Load Frame 1 immediately and trigger render
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

    // 5. Scroll listener mapping scroll progress to target frame
    function handleScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Scroll progress through the container (0 at top, 1 at bottom of track)
      const scrollDist = -rect.top;
      const totalScrollable = containerHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollDist / totalScrollable));
      const targetFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1)
      );

      targetFrameRef.current = targetFrame;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 6. Smooth Lerp Animation Loop (runs at 60fps)
    function animate() {
      if (isDestroyed) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.04) {
        currentFrameRef.current += diff * 0.20;
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
      ref={containerRef}
      className="relative w-full h-[180vh] sm:h-[195vh] lg:h-[210vh] z-0"
    >
      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Canvas Engine */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: firstFrameReady ? 1 : 0 }}
        />

        {/* Cinematic Vignette & Deep Navy Medical Luxury Overlays */}
        {/* Left-side dark gradient to ensure high-contrast readability for hero typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/95 via-[#0B2545]/75 to-[#0B2545]/30 lg:to-[#0B2545]/15 pointer-events-none" />

        {/* Center radial overlay for atmospheric medical depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(11,37,69,0.15)_0%,rgba(11,37,69,0.65)_100%)] pointer-events-none" />

        {/* Top Navbar Gradient Vignette */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#0B2545]/98 via-[#0B2545]/60 to-transparent pointer-events-none" />

        {/* Bottom Transition Gradient Vignette into Services Section */}
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/70 to-transparent pointer-events-none" />

        {/* Delicate Ambient Teal Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal/15 via-transparent to-gold/10 mix-blend-screen pointer-events-none" />

        {/* Foreground Hero Content (Pinned inside viewport with the opening eyes!) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </div>

        {/* Subtle Interactive Scroll Cue at Bottom */}
        <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity pointer-events-none z-20">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-teal-light font-medium flex items-center gap-1.5 bg-[#0B2545]/85 px-3.5 py-1 rounded-full border border-teal/30 backdrop-blur-sm shadow-md">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-ping"></span>
            Scroll to open vision
          </span>
          <div className="w-5 h-7 sm:h-8 rounded-full border border-teal/40 flex items-start justify-center p-1 bg-[#0B2545]/50 backdrop-blur-xs">
            <div className="w-1.5 h-2 rounded-full bg-teal animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
