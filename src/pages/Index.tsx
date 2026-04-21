import { useEffect, useRef } from "react";
import HeroBlock from "@/components/sections/HeroBlock";
import PainSolutionBlock from "@/components/sections/PainSolutionBlock";
import ConversionBlock from "@/components/sections/ConversionBlock";
import ClosingBlock from "@/components/sections/ClosingBlock";

export default function Index() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    };

    const onHover = () => cursor.classList.add("hovering");
    const onLeave = () => cursor.classList.remove("hovering");

    let animId: number;
    const raf = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      animId = requestAnimationFrame(raf);
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, .service-item, .port-item").forEach((el) => {
      el.addEventListener("mouseenter", onHover);
      el.addEventListener("mouseleave", onLeave);
    });

    animId = requestAnimationFrame(raf);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 50) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={cursorRingRef} />

      {/* Navbar */}
      <nav className="navbar" ref={navRef}>
        <div className="nav-logo">Kreativ</div>
        <div className="nav-links">
          {(["Главная", "О нас", "Услуги", "Портфолио", "Контакты"] as const).map((item, i) => (
            <a key={i} className="nav-link" href={`#${["home","about","services","portfolio","contact"][i]}`}>
              {item}
            </a>
          ))}
        </div>
        <button className="btn-primary" style={{ fontSize: "0.75rem" }}>
          <span>Связаться</span>
        </button>
      </nav>

      <HeroBlock />
      <PainSolutionBlock />
      <ConversionBlock />
      <ClosingBlock />
    </>
  );
}