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
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Draw in CSS pixels while keeping the bitmap sharp on high-DPI screens.
    const updateSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

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
      ctx.clearRect(0, 0, width, height);

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

        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;
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
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-10"
    />
  );
}
