import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function animateCountUp(
  target: { element: HTMLElement; count: number; suffix?: string },
  duration: number,
) {
  let currentCount = 0;
  const increment = Math.ceil(target.count / (duration / 10));

  const interval = setInterval(() => {
    currentCount += increment;
    if (currentCount >= target.count) {
      clearInterval(interval);
      currentCount = target.count;
      target.element.textContent = currentCount + (target.suffix || "");
    } else {
      target.element.textContent = currentCount.toString();
    }
  }, 10);
}
