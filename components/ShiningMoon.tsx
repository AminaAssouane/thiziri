"use client";

import { useState } from "react";
import styles from "./ShiningMoon.module.css";

type ShiningMoonProps = {
  size?: number;
  label?: string;
};

export default function ShiningMoon({
  size = 280,
  label = "A glowing cratered moon",
}: ShiningMoonProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: -y * 12, y: x * 12 });
  }

  function resetMoon() {
    setTilt({ x: 0, y: 0 });
    setPressed(false);
  }

  return (
    <button
      type="button"
      className={styles.moon}
      aria-label={label}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMoon}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onBlur={resetMoon}
      style={{
        width: size,
        height: size,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${pressed ? 0.94 : 1})`,
      }}
    />
  );
}
