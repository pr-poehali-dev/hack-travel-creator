import { useEffect, useRef } from "react";

const SERGEY_PHOTO = "https://cdn.poehali.dev/projects/4a857690-a271-41da-9c2d-6bd6a05799d9/files/3b33c04d-fe68-4d4c-bcf3-ba3123bb593a.jpg";

const CODE_LINES = [
  "const multychat = new AI('МультиЧат').deploy();",
  "await tgboss.generateContent({ tone: 'viral' });",
  "AI.replaceTeam({ size: 5, budget: 200000 });",
  "workshop.results.map(r => r.revenue * 10);",
  "нейросеть.обучить({ бизнес: твой });",
  "МультиЧат.клон({ личность: 'Сергей' });",
  "ТГ-БОСС.автопостинг({ каналов: 12 });",
  "prompt.engineer({ уровень: 'БОГ' });",
  "конкуренты.статус = 'устарели';",
  "доход.умножить(на: Infinity);",
  "const ai = require('МультиЧат');",
  "ТГ-БОСС.запустить({ город: 'Владивосток' });",
  "while(true) { зарабатывать(); }",
  "delete старая_бизнес_модель;",
  "new ИИВоркшоп({ мест: 30, осталось: 7 });",
];

export default function ArchitectSection() {
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;
    let offset = 0;
    let raf: number;
    const tick = () => {
      offset += 0.4;
      el.style.transform = `translateY(-${offset % (el.scrollHeight / 2)}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="architect" style={{ position: "relative", background: "#050505", padding: "100px 0 120px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent)" }} />

      <div className="architect-grid" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: "-30px -20px", overflow: "hidden", zIndex: 0, maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 40%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 40%, transparent 100%)" }}>
            <div ref={codeRef} style={{ display: "flex", flexDirection: "column", gap: 8, willChange: "transform" }}>
              {[...CODE_LINES, ...CODE_LINES].map((line, i) => (
                <div key={i} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", color: i % 3 === 0 ? "rgba(57,255,20,0.35)" : i % 3 === 1 ? "rgba(0,240,255,0.25)" : "rgba(255,255,255,0.12)", whiteSpace: "nowrap", letterSpacing: "0.04em", paddingLeft: `${(i % 4) * 20}px` }}>{line}</div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ position: "absolute", top: 20, right: 20, zIndex: 3, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--neon)", background: "rgba(0,0,0,0.7)", border: "1px solid rgba(57,255,20,0.4)", padding: "6px 10px", backdropFilter: "blur(4px)", textTransform: "uppercase" }}>FORBES 2047 //</div>
            <img src={SERGEY_PHOTO} alt="Сергей Черников — архитектор ИИ" style={{ width: "100%", borderRadius: 6, display: "block", border: "1px solid rgba(57,255,20,0.15)", boxShadow: "0 0 60px rgba(57,255,20,0.1), 0 0 120px rgba(0,240,255,0.05)" }} />
            <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, display: "flex", gap: 8, zIndex: 3 }}>
              {["МультиЧат", "ТГ-БОСС"].map((prod, i) => (
                <div key={i} style={{ flex: 1, background: "rgba(0,0,0,0.75)", border: `1px solid ${i === 0 ? "rgba(57,255,20,0.5)" : "rgba(0,240,255,0.5)"}`, borderRadius: 4, padding: "8px 12px", backdropFilter: "blur(8px)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: i === 0 ? "var(--neon)" : "var(--neon-blue)", letterSpacing: "0.1em", textAlign: "center", fontWeight: 700, boxShadow: i === 0 ? "0 0 12px rgba(57,255,20,0.2)" : "0 0 12px rgba(0,240,255,0.2)" }}>⚡ {prod}</div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--neon)", textTransform: "uppercase", marginBottom: "1.5rem", opacity: 0.8 }}>// КТО ЛОМАЕТ СИСТЕМУ?</div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>Сергей</h2>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--neon)", textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "2.5rem", textShadow: "0 0 30px rgba(57,255,20,0.4)" }}>Черников.</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {[
              { icon: "🚫", text: "Я не «инфоцыган», пересказывающий чужие статьи про ChatGPT." },
              { icon: "🏗️", text: "Я — архитектор ИИ-софтов: создатель МультиЧат и ТГ-БОСС, практик и бизнес-психолог." },
              { icon: "🎤", text: "Я уже собрал самое громкое «ИИ ШОУ без ширмы» на Дальнем Востоке." },
              { icon: "🎯", text: "Теперь собираю закрытую группу тех, кто готов забрать свой кусок рынка.", highlight: true },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: item.highlight ? "14px 16px" : "0", background: item.highlight ? "rgba(57,255,20,0.05)" : "transparent", border: item.highlight ? "1px solid rgba(57,255,20,0.2)" : "none", borderRadius: item.highlight ? 6 : 0 }}>
                <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.95rem", color: item.highlight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem", padding: "20px 24px", background: "linear-gradient(135deg, rgba(0,240,255,0.06), rgba(57,255,20,0.04))", border: "1px solid rgba(0,240,255,0.2)", borderRadius: 6, fontFamily: "'IBM Plex Sans', sans-serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.65 }}>
            «Я дам тебе не просто удочку — я дам тебе{" "}
            <span style={{ color: "var(--neon-blue)", fontStyle: "normal", fontWeight: 700 }}>промышленный ИИ-траулер.</span>»
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #architect > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
