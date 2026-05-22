import { useEffect, useRef, useState } from "react";

export function Reveal({ children, delay = 0, as: As = "div" }: { children: React.ReactNode; delay?: number; as?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <As ref={ref} style={{ animationDelay: `${delay}ms` }} className={v ? "animate-fade-up" : "opacity-0"}>
      {children}
    </As>
  );
}
