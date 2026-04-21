import { useEffect, useRef, useState } from "react";

const PAIN_ITEMS = [
  { icon: "💸", text: "Ты сливаешь бюджеты на дизайнеров, которые срывают дедлайны." },
  { icon: "🔐", text: "Тебя бесит танцевать с бубном вокруг VPN и криптокошельков, чтобы оплатить зарубежные сервисы." },
  { icon: "🤖", text: 'Ты открываешь ChatGPT, пишешь «сделай мне пост», получаешь роботизированный бред и закрываешь вкладку.' },
  { icon: "📉", text: "Пока ты сомневаешься, твои конкуренты уже генерируют контент бесплатно. Ты находишься в точке потери прибыли. Пора перерезать эти провода.", highlight: true },
];

function TypewriterLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 22);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [started, text, delay]);

  return (
    <p ref={ref} style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
      lineHeight: 1.7,
      color: "rgba(255,255,255,0.82)",
      margin: 0,
      minHeight: "1.7em",
    }}>
      {displayed}
      {displayed.length < text.length && started && (
        <span style={{ animation: "blink 0.7s step-end infinite", color: "var(--neon)" }}>█</span>
      )}
    </p>
  );
}

export default function PainSection() {
  return (
    <section id="pain" style={{ position: "relative", background: "#050505", padding: "100px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,40,40,0.5), transparent)" }} />

      <div className="pain-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, minHeight: 560 }}>
        <div className="pain-left" style={{ position: "relative", background: "linear-gradient(135deg, rgba(180,0,0,0.12) 0%, rgba(255,40,40,0.06) 100%)", borderRight: "1px solid rgba(255,40,40,0.2)", padding: "60px 50px", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "30%", left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,40,40,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          {["💸", "📋", "🧾", "📉", "⏰", "😤"].map((emoji, i) => (
            <span key={i} className={`fall-icon fall-icon-${i}`} style={{ position: "absolute", fontSize: "1.5rem", opacity: 0.25, animation: `fall-down ${2.5 + i * 0.4}s linear ${i * 0.6}s infinite`, left: `${10 + i * 14}%`, top: `-40px`, filter: "grayscale(0.3)" }}>{emoji}</span>
          ))}
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "rgba(255,80,80,0.8)", textTransform: "uppercase", marginBottom: "1.5rem" }}>// STATUS: КРИТИЧЕСКАЯ ОШИБКА</div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.05, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Твоя старая<br />бизнес-модель<br />
            <span style={{ color: "rgba(255,80,80,0.9)", textShadow: "0 0 20px rgba(255,40,40,0.5)" }}>мертва.</span><br />
            <span style={{ fontSize: "0.55em", color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>Узнаёшь себя?</span>
          </h2>
          <div style={{ width: "100%", height: 120, background: "linear-gradient(135deg, rgba(255,40,40,0.08), rgba(180,0,0,0.04))", border: "1px solid rgba(255,40,40,0.15)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: "3rem", position: "relative", overflow: "hidden" }}>
            <span className="glitch-mannequin">🧍</span>
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,40,40,0.04) 3px, rgba(255,40,40,0.04) 4px)" }} />
          </div>
        </div>

        <div className="pain-right" style={{ background: "linear-gradient(135deg, rgba(0,10,0,0.8) 0%, rgba(0,20,5,0.6) 100%)", padding: "60px 50px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--neon)", textTransform: "uppercase", marginBottom: "2.5rem", opacity: 0.7 }}>
            &gt; terminal_v2.exe — [БОЛИ РАСПОЗНАНЫ]
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {PAIN_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: item.highlight ? "16px" : "0", background: item.highlight ? "rgba(57,255,20,0.05)" : "transparent", border: item.highlight ? "1px solid rgba(57,255,20,0.2)" : "none", borderRadius: item.highlight ? 4 : 0 }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <TypewriterLine text={item.text} delay={i * 300} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.3), transparent)" }} />

      <style>{`
        @keyframes fall-down {
          0%   { transform: translateY(-40px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.25; }
          90%  { opacity: 0.15; }
          100% { transform: translateY(640px) rotate(360deg); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .glitch-mannequin {
          animation: mannequin-glitch 3s steps(2) infinite;
          display: inline-block;
        }
        @keyframes mannequin-glitch {
          0%, 90%, 100% { transform: none; filter: none; }
          92% { transform: translateX(4px) skewX(5deg); filter: hue-rotate(90deg); }
          94% { transform: translateX(-4px) skewX(-3deg); filter: hue-rotate(180deg); }
          96% { transform: translateX(2px); filter: none; }
        }
        @media (max-width: 768px) {
          #pain > div[style] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
