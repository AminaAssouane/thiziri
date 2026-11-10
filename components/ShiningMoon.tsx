import styles from "./ShiningMoon.module.css";

type ShiningMoonProps = {
  size?: number;
  label?: string;
};

export default function ShiningMoon({
  size = 280,
  label = "A glowing cratered moon",
}: ShiningMoonProps) {
  return (
    <div
      className={styles.moon}
      role="img"
      aria-label={label}
      style={{ width: size, height: size }}
    />
  );
}
