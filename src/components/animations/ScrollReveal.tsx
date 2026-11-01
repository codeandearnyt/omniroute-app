import { useEffect } from "react";

type ScrollRevealProps = {
  once?: boolean;
  offset?: number;
  delay?: number;
};

export function useScrollReveal(
  ref: React.RefObject<HTMLElement>,
  {
    once = true,
    offset = 0,
    delay = 0,
  }: ScrollRevealProps = {}
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      
      if (once) {
        if (entry.isIntersecting) {
          element.style.transition = `
            opacity 0.6s ease-out,
            transform 0.6s ease-out
          `;
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
          const observer = observerRef.current;
          if (observer) observer.disconnect();
        }
      } else {
        if (entry.isIntersecting) {
          element.style.transition = `
            opacity 0.6s ease-out,
            transform 0.6s ease-out
          `;
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      }
    };

    const observer = new IntersectionObserver(
      [handleIntersect],
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, once, offset, delay]);
  
  return { ref };
}

/**
 * Pre-defined ScrollReveal component
 */
export const ScrollReveal: React.FC<{
  children: React.ReactElement;
  once?: boolean;
  offset?: number;
  delay?: number;
}> = ({
  children,
  once = true,
  offset = 0,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useScrollReveal(ref, { once, offset, delay });
  
  return (
    <div
      ref={ref}
      className="relative"
      style={{ opacity: 0, transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
};