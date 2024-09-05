import { useState, useEffect } from "react";

type ScrollDirection = "up" | "down" | undefined;

interface UseScrollReturn {
  scrollY: number;
  scrollX: number;
  scrollDirection: ScrollDirection;
  isPassedThreshold: boolean;
}

export function useScroll(threshold: number = 100): UseScrollReturn {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollX, setScrollX] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>();
  const [isPassedThreshold, setIsPassedThreshold] = useState<boolean>(false);

  useEffect(() => {
    const listener = () => {
      if (typeof window !== "undefined") {
        // Ensure this only runs in the browser
        const bodyOffset = document.body.getBoundingClientRect();
        const currentScrollY = -bodyOffset.top;
        const currentScrollX = bodyOffset.left;

        setScrollY(currentScrollY);
        setScrollX(currentScrollX);

        if (currentScrollY > threshold && !isPassedThreshold) {
          setIsPassedThreshold(true);
        } else if (currentScrollY <= threshold && isPassedThreshold) {
          setIsPassedThreshold(false);
        }

        if (lastScrollTop > currentScrollY) {
          setScrollDirection("up");
        } else if (lastScrollTop < currentScrollY) {
          setScrollDirection("down");
        }

        setLastScrollTop(currentScrollY);
      }
    };

    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [lastScrollTop, isPassedThreshold, threshold]);

  return {
    scrollY,
    scrollX,
    scrollDirection,
    isPassedThreshold,
  };
}
