import { useEffect, useState } from "react";

const FAQ_ITEMS = [
  {
    q: "«Я абсолютный гуманитарий, я даже Excel боюсь. Я справлюсь?»",
    a: "Да. Мы убрали весь код. Вы будете общаться с нейросетями на простом русском языке в МультиЧате. А если вы забудете, куда нажать — один из 15 кураторов-спецназовцев возьмёт вашу мышку и покажет правильный путь.",
  },
  {
    q: "«У меня старый, слабый ноутбук. Он потянет эти ваши нейронки?»",
    a: "Абсолютно. Вся магия (Kling, Veo, Midjourney) происходит на удалённых суперкомпьютерах. Вашему ноутбуку нужен только браузер и выход в интернет. Оставьте мощность серверов нам.",
  },
  {
    q: "«У меня специфичный бизнес (завод / логистика / B2B). Мне это надо?»",
    a: "Особенно вам. Пока конкуренты в вашей нише спят — вы сможете генерировать презентации для инвесторов, писать сложные коммерческие предложения и делать 3D-модели оборудования за минуты.",
  },
];

const CASES = [
  { name: "Иван К.", niche: "Логистика", avatar: "🚛", before: "0 контента/мес", after: "40+ постов за 1 день", artifact: "Сайт + УТП за 40 минут прямо в зале", color: "rgba(57,255,20,0.6)", glow: "rgba(57,255,20,0.2)" },
  { name: "Марина Л.", niche: "Ресторанный бизнес", avatar: "🍣", before: "15 000 ₽/мес фотограф", after: "0 ₽ — нейрофото сама", artifact: "Меню + 30 фото блюд за 2 часа", color: "rgba(0,240,255,0.6)", glow: "rgba(0,240,255,0.2)" },
  { name: "Дмитрий В.", niche: "Строительство", avatar: "🏗️", before: "Нет контента вообще", after: "Вирусный Reels за 20 мин", artifact: "3D-визуализация объекта + трек", color: "rgba(200,0,255,0.6)", glow: "rgba(180,0,255,0.2)" },
  { name: "Алёна С.", niche: "Beauty / SPA", avatar: "💆", before: "60 000 ₽/мес SMM-агентство", after: "Уволила агентство на 2-й день", artifact: "Брендинг + воронка продаж", color: "rgba(255,215,0,0.7)", glow: "rgba(255,200,0,0.2)" },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [accessSound] = useState(() => () => {
    try {
      const ctx = new AudioContext();
      [880, 1100, 1320].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = "square"; o.frequency.value = freq;
        g.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.07);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.15);
        o.start(ctx.currentTime + i * 0.07);
        o.stop(ctx.currentTime + i * 0.07 + 0.15);
      });
    } catch { /* silent */ }
  });

  const toggle = (i: number) => {
    if (open !== i) accessSound();
    setOpen(open === i ? null : i);
  };

  return (
    <section id="faq" style={{ position: "relative", background: "#050505", padding: "100px 0 120px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(57,255,20,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.02) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "rgba(255,80,80,0.8)", textTransform: "uppercase", marginBottom: "1.2rem" }}>// TERMINAL_ACCESS v2.0 — ДЕШИФРОВКА СОМНЕНИЙ</div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            ВЗЛОМ ТВОИХ ОТМАЗОК.<br />
            <span style={{ color: "var(--neon)", textShadow: "0 0 20px rgba(57,255,20,0.4)" }}>Отвечаем на вопросы,<br />которые ты боишься задать.</span>
          </h2>
        </div>

        <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ background: "#111", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: 0.8 }} />)}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", marginLeft: 8, letterSpacing: "0.1em" }}>objection_crusher.exe — root@workshop</span>
          </div>

          <div style={{ padding: "8px 0" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <button onClick={() => toggle(i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: "1rem", transition: "background 0.2s", ...(open === i ? { background: "rgba(57,255,20,0.03)" } : {}) }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", fontWeight: 700, color: open === i ? "rgba(57,255,20,0.6)" : "rgba(255,50,50,0.8)", letterSpacing: "0.1em", flexShrink: 0, marginTop: 3, transition: "color 0.3s", textShadow: open === i ? "0 0 8px rgba(57,255,20,0.4)" : "0 0 8px rgba(255,30,30,0.4)" }}>{open === i ? "[ACCESS]" : "[ ERROR]"}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.82rem", color: open === i ? "rgba(255,255,255,0.9)" : "rgba(255,150,150,0.85)", lineHeight: 1.6, transition: "color 0.3s" }}>{item.q}</span>
                  <span style={{ marginLeft: "auto", flexShrink: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.8rem", color: open === i ? "var(--neon)" : "rgba(255,80,80,0.5)", transition: "all 0.3s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {open === i && (
                  <div className="faq-answer" style={{ padding: "0 24px 20px 24px", paddingLeft: "calc(24px + 4.5rem)" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "var(--neon)", letterSpacing: "0.2em", marginBottom: "0.8rem", textShadow: "0 0 10px rgba(57,255,20,0.5)" }}>✓ ACCESS GRANTED</div>
                    <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: 0, borderLeft: "2px solid rgba(57,255,20,0.3)", paddingLeft: "1rem" }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
            <div style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", color: "rgba(57,255,20,0.5)" }}>root@workshop:~$</span>
              <span style={{ display: "inline-block", width: 8, height: 16, background: "var(--neon)", animation: "blink 0.7s step-end infinite", opacity: 0.7 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ c, i }: { c: typeof CASES[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: "relative", overflow: "hidden", background: hovered ? `linear-gradient(135deg, ${c.glow}, rgba(0,0,0,0.3))` : "rgba(255,255,255,0.03)", border: `1px solid ${hovered ? c.color : "rgba(255,255,255,0.07)"}`, borderRadius: 8, padding: "28px 24px", transition: "all 0.3s ease", boxShadow: hovered ? `0 0 30px ${c.glow}, 0 0 60px ${c.glow.replace("0.2", "0.08")}` : "none", cursor: "default" }}>
      {hovered && <div style={{ position: "absolute", inset: 0, pointerEvents: "none", animation: "case-glitch 0.3s steps(2) forwards", background: `linear-gradient(135deg, ${c.glow}, transparent)`, opacity: 0.3 }} />}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "2rem", filter: hovered ? `drop-shadow(0 0 10px ${c.color})` : "none", transition: "filter 0.3s" }}>{c.avatar}</div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>{c.name}</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: c.color, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.8 }}>{c.niche}</div>
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>#{String(i + 1).padStart(2, "0")}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "1.2rem" }}>
        <div style={{ background: "rgba(255,30,30,0.06)", border: "1px solid rgba(255,30,30,0.15)", borderRadius: 4, padding: "10px 12px" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(255,80,80,0.6)", letterSpacing: "0.15em", marginBottom: 4 }}>БЫЛО</div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,120,120,0.8)", lineHeight: 1.4 }}>{c.before}</div>
        </div>
        <div style={{ background: "rgba(57,255,20,0.05)", border: `1px solid ${c.glow}`, borderRadius: 4, padding: "10px 12px" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: c.color, letterSpacing: "0.15em", marginBottom: 4, opacity: 0.7 }}>СТАЛО</div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem", color: "#fff", fontWeight: 600, lineHeight: 1.4 }}>{c.after}</div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px dashed rgba(255,255,255,0.08)", paddingTop: "1rem", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, opacity: hovered ? 1 : 0.7, transition: "opacity 0.3s" }}>
        <span style={{ color: c.color, marginRight: 6 }}>⚡</span>{c.artifact}
      </div>
    </div>
  );
}

function CasesSection() {
  return (
    <section id="cases" style={{ position: "relative", background: "linear-gradient(180deg, #050505 0%, #060a06 50%, #050505 100%)", padding: "100px 0 120px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(57,255,20,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--neon)", textTransform: "uppercase", marginBottom: "1.2rem", opacity: 0.8 }}>// СОЦИАЛЬНОЕ ДОКАЗАТЕЛЬСТВО — ДАННЫЕ НЕ ВРУТ</div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.2rem" }}>
            ОНИ УЖЕ В МАТРИЦЕ.<br />
            <span style={{ color: "var(--neon)", textShadow: "0 0 24px rgba(57,255,20,0.4)" }}>Результаты тех, кто был на «ИИ ШОУ».</span>
          </h2>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.45)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            Месяц назад во Владивостоке мы собрали сотни предпринимателей. Они уже не платят за контент. Посмотри, что они делают своими руками.
          </p>
        </div>
        <div className="cases-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
          {CASES.map((c, i) => <CaseCard key={i} c={c} i={i} />)}
        </div>
      </div>
      <style>{`
        @keyframes case-glitch {
          0%   { clip-path: inset(10% 0 80% 0); transform: translateX(3px); }
          50%  { clip-path: inset(60% 0 10% 0); transform: translateX(-3px); }
          100% { clip-path: none; transform: none; }
        }
      `}</style>
    </section>
  );
}

function GuaranteeSection() {
  const [btnHover, setBtnHover] = useState(false);
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    let raf: number;
    const tick = () => { setScanAngle(a => (a + 1.5) % 360); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="guarantee" style={{ position: "relative", background: "#050505", padding: "100px 0 140px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(ellipse at 50% 60%, rgba(57,255,20,0.04) 0%, transparent 60%)" }} />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ display: "inline-block", position: "relative", marginBottom: "3rem" }}>
          {[80, 110, 140].map((size, i) => (
            <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, borderRadius: "50%", border: `1px solid rgba(57,255,20,${0.15 - i * 0.04})`, transform: "translate(-50%, -50%)", animation: `ring-pulse 2s ease-in-out ${i * 0.4}s infinite` }} />
          ))}
          <div style={{ width: 80, height: 80, position: "relative", background: "linear-gradient(135deg, rgba(57,255,20,0.12), rgba(0,240,255,0.08))", border: "2px solid rgba(57,255,20,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(57,255,20,0.2), 0 0 60px rgba(57,255,20,0.08)", fontSize: "2rem", overflow: "hidden" }}>
            🛡️
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", pointerEvents: "none" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.8), transparent)", transform: `rotate(${scanAngle}deg)`, transformOrigin: "center center" }} />
            </div>
          </div>
        </div>

        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--neon)", textTransform: "uppercase", marginBottom: "1.2rem", opacity: 0.8 }}>// ПРОТОКОЛ НУЛЕВОГО РИСКА</div>
        <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
          НАША ЛИЧНАЯ<br />
          <span style={{ color: "var(--neon)", textShadow: "0 0 24px rgba(57,255,20,0.4)" }}>ГАРАНТИЯ.</span>
        </h2>

        <div className="guarantee-text-block" style={{ background: "linear-gradient(135deg, rgba(57,255,20,0.05), rgba(0,240,255,0.03))", border: "1px solid rgba(57,255,20,0.2)", borderRadius: 8, padding: "32px 36px", marginBottom: "3rem", textAlign: "left", position: "relative" }}>
          <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", color: "rgba(57,255,20,0.4)", letterSpacing: "0.1em" }}>VERIFIED ✓</div>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, margin: "0 0 1.2rem" }}>
            Я настолько уверен в методологии и нашей команде из 15 кураторов, что даю тебе железобетонное обещание:
          </p>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "#fff", lineHeight: 1.8, margin: "0 0 1.2rem", borderLeft: "3px solid var(--neon)", paddingLeft: "1.2rem" }}>
            Если к обеду первого дня ты поймёшь, что ИИ — это слишком сложно, кураторы тебе не помогают, и ты не создал ни одного текста или картинки для своего бизнеса — <strong style={{ color: "var(--neon)" }}>мы молча вернём тебе 100% стоимости билета.</strong>
          </p>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
            Ты не рискуешь ничем, кроме возможности навсегда отстать от рынка.
          </p>
        </div>

        <button
          className="guarantee-btn"
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "1.1rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "22px 70px", border: "2px solid transparent", background: btnHover ? "linear-gradient(135deg, #39ff14, #00f0ff, #39ff14)" : "linear-gradient(135deg, rgba(57,255,20,0.15), rgba(0,240,255,0.1))", backgroundOrigin: "border-box", color: btnHover ? "#000" : "var(--neon)", cursor: "pointer", borderRadius: 4, transition: "all 0.3s ease", boxShadow: btnHover ? "0 0 50px rgba(57,255,20,0.5), 0 0 100px rgba(57,255,20,0.2)" : "0 0 20px rgba(57,255,20,0.15), inset 0 0 30px rgba(57,255,20,0.03)", position: "relative", overflow: "hidden" }}
        >
          {btnHover && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)", animation: "metal-sweep 0.6s ease forwards" }} />}
          [ Активировать свой билет ]
        </button>

        <div style={{ marginTop: "1.5rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
          🔒 100% ГАРАНТИЯ ВОЗВРАТА · БЕЗОПАСНАЯ ОПЛАТА · ВЛАДИВОСТОК 2025
        </div>
      </div>

      <style>{`
        @keyframes ring-pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); }
        }
        @keyframes metal-sweep {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default function ClosingBlock() {
  return (
    <>
      <FaqSection />
      <CasesSection />
      <GuaranteeSection />
    </>
  );
}
