import { useEffect, useRef, useState } from "react";

const DAY1 = [
  { icon: "📝", tool: "МультиЧат", text: "Скрипты, УТП и посты, написанные твоим личным клоном в МультиЧате." },
  { icon: "📸", tool: "Freepik + Нано Банано Про", text: "Премиальная нейрофотосессия без студий и фотографов." },
  { icon: "🃏", tool: "Дизайн AI", text: "Дизайн карточек товаров, который пробивает баннерную слепоту." },
];

const DAY2 = [
  { icon: "🎬", tool: "Kling · Veo · Сиденс 2", text: "Вирусные ИИ-видео и оживлённые товары." },
  { icon: "🎵", tool: "Suno", text: "Собственный музыкальный бэнгер и корпоративный трек." },
  { icon: "🌀", tool: "Воронка", text: "Готовая мультимедийная воронка, которую можно отдать ассистенту." },
];

const ARTIFACTS = [
  { emoji: "📄", label: "МультиЧат", color: "rgba(57,255,20,0.6)", glow: "rgba(57,255,20,0.3)", delay: 0 },
  { emoji: "🍌", label: "Нано Банано Про", color: "rgba(255,220,0,0.7)", glow: "rgba(255,200,0,0.3)", delay: 0.3 },
  { emoji: "🎞️", label: "Kling AI", color: "rgba(0,240,255,0.7)", glow: "rgba(0,240,255,0.3)", delay: 0.6 },
  { emoji: "💿", label: "Suno", color: "rgba(200,0,255,0.7)", glow: "rgba(180,0,255,0.3)", delay: 0.9 },
];

export default function ArsenalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [visibleArtifacts, setVisibleArtifacts] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct = Math.min(1, scrolled / Math.max(total, 1));
      setProgress(pct);
      setVisibleArtifacts(ARTIFACTS.map((_, i) => pct > i * 0.07));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} id="arsenal" style={{ position: "relative", background: "linear-gradient(180deg, #050505 0%, #070b07 50%, #050505 100%)", padding: "100px 0 120px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(57,255,20,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.025) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--neon)", textTransform: "uppercase", marginBottom: "1.2rem", opacity: 0.8 }}>// ТРОФЕИ ЧЕРЕЗ 48 ЧАСОВ</div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.02em" }}>
            Твой арсенал{" "}
            <span style={{ color: "var(--neon)", textShadow: "0 0 24px rgba(57,255,20,0.5)" }}>хищника</span>
            <br />через 2 дня:
          </h2>
        </div>

        <div className="belt-wrap" style={{ position: "relative", marginBottom: "5rem", padding: "0 0 40px" }}>
          <div style={{ position: "relative", height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: "3rem", overflow: "visible" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress * 100}%`, background: "linear-gradient(90deg, var(--neon), var(--neon-blue))", borderRadius: 3, boxShadow: "0 0 12px rgba(57,255,20,0.6)", transition: "width 0.1s linear" }} />
            {ARTIFACTS.map((art, i) => (
              <div key={i} style={{ position: "absolute", top: visibleArtifacts[i] ? -70 : -130, left: `${10 + i * 26}%`, transition: `top 0.35s cubic-bezier(.34,1.56,.64,1) ${art.delay * 0.4}s, opacity 0.25s ease ${art.delay * 0.4}s`, opacity: visibleArtifacts[i] ? 1 : 0, textAlign: "center" }}>
                <div style={{ fontSize: "2.8rem", display: "block", filter: `drop-shadow(0 0 12px ${art.glow})`, animation: visibleArtifacts[i] ? `artifact-float-${i} 3s ease-in-out ${art.delay}s infinite` : "none", marginBottom: 8 }}>{art.emoji}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: art.color, letterSpacing: "0.1em", whiteSpace: "nowrap", textShadow: `0 0 10px ${art.glow}` }}>{art.label}</div>
              </div>
            ))}
            {[...Array(20)].map((_, i) => (
              <div key={i} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: `${i * 5.2}%`, width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
            ))}
          </div>
        </div>

        <div className="days-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(57,255,20,0.06), rgba(57,255,20,0.02))", border: "1px solid rgba(57,255,20,0.2)", borderRadius: 8, padding: "32px 28px", backdropFilter: "blur(8px)" }}>
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "var(--neon)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.8rem", display: "flex", alignItems: "center", gap: 10 }}>
              🔥 <span>День 1. Смыслы и визуал</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              {DAY1.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "var(--neon)", letterSpacing: "0.1em", marginBottom: 4, opacity: 0.8 }}>{item.tool}</div>
                    <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.06), rgba(0,240,255,0.02))", border: "1px solid rgba(0,240,255,0.2)", borderRadius: 8, padding: "32px 28px", backdropFilter: "blur(8px)" }}>
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "var(--neon-blue)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.8rem", display: "flex", alignItems: "center", gap: 10 }}>
              ⚡ <span>День 2. Динамика и вау-эффект</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              {DAY2.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "var(--neon-blue)", letterSpacing: "0.1em", marginBottom: 4, opacity: 0.8 }}>{item.tool}</div>
                    <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes artifact-float-0 { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-10px) rotate(3deg); } }
        @keyframes artifact-float-1 { 0%, 100% { transform: translateY(0) rotate(2deg); } 50% { transform: translateY(-14px) rotate(-2deg); } }
        @keyframes artifact-float-2 { 0%, 100% { transform: translateY(0) rotate(-2deg) scale(1); } 50% { transform: translateY(-8px) rotate(4deg) scale(1.05); } }
        @keyframes artifact-float-3 { 0%, 100% { transform: translateY(0) rotate(4deg); } 50% { transform: translateY(-12px) rotate(-4deg); } }
        @media (max-width: 768px) {
          #arsenal .days-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
