"use client";

import React, { useEffect, useRef } from "react";

export default function FireflyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Set canvas dimensions to match the scrollable parent / window
    const updateSize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.scrollWidth : window.innerWidth;
      canvas.height = parent
        ? Math.max(parent.scrollHeight, window.innerHeight)
        : window.innerHeight;
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    const width = canvas.width;
    const height = canvas.height;

    // Fireflies configuration (brighter & larger for better visibility)
    const fireflies = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1.5, // slightly bigger
      color:
        Math.random() > 0.4 ? "rgba(212, 241, 192, " : "rgba(255, 220, 130, ",
      alpha: Math.random(),
      maxAlpha: Math.random() * 0.8 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4 - 0.1,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach((f) => {
        f.angle += f.pulseSpeed;
        const currentAlpha = f.maxAlpha * (0.5 + 0.5 * Math.sin(f.angle));

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${f.color}${currentAlpha})`;

        ctx.shadowBlur = 15;
        ctx.shadowColor = f.color + "0.9)";
        ctx.fill();
        ctx.shadowBlur = 0;

        f.x += f.speedX + Math.sin(f.angle) * 0.2;
        f.y += f.speedY;

        if (f.x < 0) f.x = canvas.width;
        if (f.x > canvas.width) f.x = 0;
        if (f.y < 0) f.y = canvas.height;
        if (f.y > canvas.height) f.y = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
    />
  );
}
