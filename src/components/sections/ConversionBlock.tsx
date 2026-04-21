import { useEffect, useRef, useState } from "react";

const EXPENSES = [
  { label: "Копирайтер, который не понимает твой продукт", amount: 50000 },
  { label: "Фотосессия с арендой студии", amount: 40000 },
  { label: "Видеомейкер для рилсов", amount: 60000 },
  { label: "Авторская музыка", amount: 30000 },
];

const TARIFFS = [
  {
    id: "standard",
    label: "СТАНДАРТ",
    badge: null,
    price: "19 900 ₽",
    oldPrice: "35 000 ₽",
    seats: 8,
    color: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.12)",
    accent: "rgba(255,255,255,0.7)",
    glow: "rgba(255,255,255,0.1)",
    features: [
      "2 дня воркшопа",
      "Рабочие материалы",
      "Помощь куратора",
      "Доступ к нейросетям на месте",
    ],
  },
  {
    id: "business",
    label: "БИЗНЕС",
    badge: "ХИТ",
    price: "34 900 ₽",
    oldPrice: "60 000 ₽",
    seats: 5,
    color: "rgba(57,255,20,0.06)",
    border: "rgba(57,255,20,0.35)",
    accent: "var(--neon)",
    glow: "rgba(57,255,20,0.25)",
    features: [
      "Всё из Стандарта",
      "Персональная стратегия ИИ",
      "Готовая воронка под ваш бизнес",
      "30 дней поддержки в чате",
      "Запись воркшопа",
    ],
  },
  {
    id: "vip",
    label: "VIP",
    badge: "🔥 LAST",
    price: "69 900 ₽",
    oldPrice: "120 000 ₽",
    seats: 2,
    color: "rgba(0,240,255,0.06)",
    border: "rgba(0,240,255,0.35)",
    accent: "var(--neon-blue)",
    glow: "rgba(0,240,255,0.25)",
    features: [
      "Всё из Бизнеса",
      "Личная сессия с Сергеем (60 мин)",
      "Настройка МультиЧат под твой бизнес",
      "ТГ-БОСС: 3 месяца бесплатно",
      "VIP-место в первом ряду",
      "Пожизненный доступ к записям",
    ],
  },
];

function SlotNumber({ value, active, red }: { value: number; active: boolean; red?: boolean }) {
  const [displayed, setDisplayed] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (!active) return;
    setSpinning(true);
    let start: number | null = null;
    const duration = 1200 + Math.random() * 600;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      if (progress < 1) {
        setDisplayed(Math.floor(Math.random() * value * 1.5));
        requestAnimationFrame(raf);
      } else {
        setDisplayed(value);
        setSpinning(false);
      }
    };
    requestAnimationFrame(raf);
  }, [active, value]);

  return (
    <span style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 700,
      fontSize: "inherit",
      color: red ? (spinning ? "#ff6b6b" : "#ff3030") : "var(--neon)",
      textShadow: red
        ? (spinning ? "0 0 20px rgba(255,50,50,0.8), 0 0 40px rgba(255,0,0,0.4)" : "0 0 16px rgba(255,30,30,0.6)")
        : "0 0 16px rgba(57,255,20,0.6)",
      transition: "color 0.3s, text-shadow 0.3s",
      display: "inline-block",
      minWidth: "6ch",
    }}>
      {displayed.toLocaleString("ru-RU")} ₽
    </span>
  );
}

function TariffCard({ tariff, mousePos }: { tariff: typeof TARIFFS[0]; mousePos: { x: number; y: number } | null }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !mousePos) { setTilt({ rx: 0, ry: 0 }); return; }
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (mousePos.x - cx) / (rect.width / 2);
    const dy = (mousePos.y - cy) / (rect.height / 2);
    setTilt({ rx: dy * -8, ry: dx * 8 });
  }, [mousePos]);

  return (
    <div ref={cardRef} style={{
      background: tariff.color,
      border: `1px solid ${tariff.border}`,
      borderRadius: 10,
      padding: "36px 28px",
      position: "relative",
      overflow: "hidden",
      transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      transition: "transform 0.1s ease, box-shadow 0.3s ease",
      boxShadow: `0 0 40px ${tariff.glow}, 0 0 80px ${tariff.glow.replace("0.25", "0.08")}`,
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: `linear-gradient(135deg, transparent 40%, ${tariff.glow} 50%, transparent 60%)`, backgroundSize: "200% 200%", animation: "holo-shine 4s linear infinite" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)" }} />

      {tariff.badge && (
        <div style={{ position: "absolute", top: 16, right: 16, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", color: "#000", background: tariff.accent, padding: "4px 10px", borderRadius: 3, zIndex: 2 }}>{tariff.badge}</div>
      )}

      <div style={{ position: "relative", zIndex: 1, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: tariff.seats <= 3 ? "#ff5050" : "rgba(255,255,255,0.4)", marginBottom: "1.2rem", textTransform: "uppercase" }}>
        {tariff.seats <= 3 ? "⚠️ " : ""}ОСТАЛОСЬ {tariff.seats} МЕСТА
      </div>

      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: tariff.accent, textTransform: "uppercase", marginBottom: "0.8rem", position: "relative", zIndex: 1, textShadow: `0 0 10px ${tariff.glow}` }}>{tariff.label}</div>

      <div style={{ position: "relative", zIndex: 1, marginBottom: "2rem" }}>
        <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>{tariff.price}</div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textDecoration: "line-through", marginTop: 4 }}>{tariff.oldPrice}</div>
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "2rem" }}>
        {tariff.features.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
            <span style={{ color: tariff.accent, flexShrink: 0, fontSize: "0.8rem", marginTop: 2, textShadow: `0 0 6px ${tariff.glow}` }}>✦</span>
            <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{f}</span>
          </div>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, borderTop: `1px dashed ${tariff.border}`, paddingTop: "1rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
        VLADIVOSTOK · AI WORKSHOP · 2025 · #{tariff.id.toUpperCase()}
      </div>
    </div>
  );
}

function Countdown({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    const glitchId = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 3700);
    return () => { clearInterval(id); clearInterval(glitchId); };
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
      {[["ДНЕЙ", time.d], ["ЧАСОВ", time.h], ["МИНУТ", time.m], ["СЕКУНД", time.s]].map(([label, val], i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#ff3030", lineHeight: 1, letterSpacing: "0.04em", textShadow: glitch ? "3px 0 #39ff14, -3px 0 #00f0ff, 0 0 20px rgba(255,30,30,0.8)" : "0 0 20px rgba(255,30,30,0.6), 0 0 40px rgba(255,0,0,0.2)", transition: "text-shadow 0.1s", transform: glitch ? `translateX(${i % 2 === 0 ? 2 : -2}px)` : "none" }}>{pad(val as number)}</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,80,80,0.5)", marginTop: 4 }}>{label as string}</div>
        </div>
      )).reduce<React.ReactNode[]>((acc, el, i) => {
        if (i > 0) acc.push(<span key={`sep-${i}`} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "2rem", color: "rgba(255,80,80,0.4)", alignSelf: "flex-start", paddingTop: 4 }}>:</span>);
        acc.push(el);
        return acc;
      }, [])}
    </div>
  );
}

function CalculatorSection() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const total = EXPENSES.reduce((s, e) => s + e.amount, 0);

  return (
    <section ref={ref} id="calculator" style={{ position: "relative", background: "#050505", padding: "100px 0 120px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,30,30,0.4), rgba(57,255,20,0.4), transparent)" }} />
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,20,20,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "rgba(255,80,80,0.8)", textTransform: "uppercase", marginBottom: "1.2rem" }}>// ЖЕСТОКАЯ МАТЕМАТИКА</div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            Сколько стоит твоё{" "}
            <span style={{ color: "rgba(255,60,60,0.9)", textShadow: "0 0 24px rgba(255,30,30,0.5)" }}>бездействие?</span>
          </h2>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Давай считать твои расходы на продакшен за месяц:</p>
        </div>

        <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(255,20,20,0.08), rgba(180,0,0,0.04))", border: "1px solid rgba(255,40,40,0.25)", borderRadius: 8, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 110%, rgba(255,50,0,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,80,80,0.7)", textTransform: "uppercase", marginBottom: "1.5rem" }}>🔥 БЕЗ ИИ / МЕСЯЦ</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2rem" }}>
              {EXPENSES.map((e, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem" }}>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, flex: 1 }}>{e.label}</span>
                  <div style={{ fontSize: "1rem", flexShrink: 0 }}><SlotNumber value={e.amount} active={active} red /></div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,20,20,0.1)", border: "1px solid rgba(255,40,40,0.3)", borderRadius: 6, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.05em" }}>ИТОГО:</span>
              <div style={{ fontSize: "1.5rem" }}><SlotNumber value={total} active={active} red /></div>
            </div>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,100,100,0.6)", marginTop: "0.8rem", textAlign: "center" }}>И куча потраченных нервов.</p>
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(57,255,20,0.07), rgba(0,240,255,0.04))", border: "1px solid rgba(57,255,20,0.25)", borderRadius: 8, padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(57,255,20,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--neon)", textTransform: "uppercase", marginBottom: "1.5rem" }}>⚡ С ИИ-ВОРКШОПОМ</div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 900, fontSize: "clamp(4rem, 10vw, 7rem)", color: "#ffd700", textShadow: "0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.2)", lineHeight: 1, letterSpacing: "-0.04em", animation: active ? "gold-pulse 2s ease-in-out infinite" : "none" }}>0 ₽</div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", textAlign: "center", lineHeight: 1.6, maxWidth: 260 }}>
                Нейросети работают на тебя <span style={{ color: "var(--neon)", fontWeight: 700 }}>бесплатно. Всегда.</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                {["МультиЧат", "Freepik", "Kling", "Suno", "Veo", "Нано Банано"].map((t, i) => (
                  <span key={i} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "var(--neon-blue)", border: "1px solid rgba(0,240,255,0.25)", borderRadius: 3, padding: "3px 8px", letterSpacing: "0.08em" }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "1.5rem", background: "rgba(57,255,20,0.07)", border: "1px solid rgba(57,255,20,0.2)", borderRadius: 6, padding: "14px 18px", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
              💡 Билет окупается в момент генерации <strong style={{ color: "#fff" }}>первой карточки товара.</strong>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "28px", background: "linear-gradient(135deg, rgba(255,215,0,0.04), rgba(57,255,20,0.04))", border: "1px solid rgba(255,215,0,0.15)", borderRadius: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: "clamp(0.8rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>
          <span style={{ color: "rgba(255,80,80,0.8)" }}>180 000 ₽/мес</span>
          {" "}×{" "}
          <span style={{ color: "rgba(255,255,255,0.4)" }}>12 месяцев</span>
          {" "}={" "}
          <span style={{ color: "#ff3030", fontWeight: 700, textShadow: "0 0 12px rgba(255,0,0,0.4)" }}>2 160 000 ₽ в год</span>
          {" "}→{" "}
          <span style={{ color: "#ffd700", fontWeight: 700, textShadow: "0 0 12px rgba(255,215,0,0.4)" }}>ты сжигаешь</span>
        </div>
      </div>

      <style>{`
        @keyframes gold-pulse {
          0%, 100% { text-shadow: 0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.2); }
          50% { text-shadow: 0 0 60px rgba(255,215,0,0.9), 0 0 120px rgba(255,215,0,0.4), 0 0 160px rgba(255,215,0,0.15); }
        }
        @media (max-width: 768px) {
          #calculator > div > div[style*="grid"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function TariffsSection() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [btnHover, setBtnHover] = useState(false);
  const targetDate = new Date(Date.now() + 12 * 24 * 3600 * 1000);

  const clickSound = () => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    } catch { /* silent */ }
  };

  return (
    <section id="tariffs"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setMousePos(null)}
      style={{ position: "relative", background: "#050505", padding: "100px 0 120px", overflow: "hidden" }}>

      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px)` }} />
      <div className="vault-panel" style={{ position: "absolute", top: 0, left: 0, width: "18%", height: "100%", background: "linear-gradient(90deg, rgba(30,30,35,0.9), rgba(20,20,25,0.4))", borderRight: "2px solid rgba(255,255,255,0.06)", zIndex: 0 }} />
      <div className="vault-panel" style={{ position: "absolute", top: 0, right: 0, width: "18%", height: "100%", background: "linear-gradient(270deg, rgba(30,30,35,0.9), rgba(20,20,25,0.4))", borderLeft: "2px solid rgba(255,255,255,0.06)", zIndex: 0 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "rgba(255,80,80,0.8)", textTransform: "uppercase", marginBottom: "1.2rem" }}>// ФИЗИКА ЗАЛА НЕ ОБСУЖДАЕТСЯ</div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Физика зала и 15 кураторов<br />
            <span style={{ color: "rgba(255,60,60,0.9)", textShadow: "0 0 20px rgba(255,30,30,0.4)" }}>диктуют правила. Мест мало.</span>
          </h2>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.45)", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            Мы физически не сможем взять толпу — иначе качество рухнет. Когда билеты исчезнут, мы повесим табличку <span style={{ color: "#fff", fontWeight: 700 }}>«SOLD OUT»</span>. Это не маркетинговая уловка — это вместимость зала.
          </p>
        </div>

        <div style={{ marginBottom: "3.5rem", padding: "24px 32px", background: "rgba(255,20,20,0.05)", border: "1px solid rgba(255,40,40,0.2)", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,80,80,0.6)", textTransform: "uppercase", marginBottom: "1rem" }}>⏱ ДО ЗАКРЫТИЯ ПРОДАЖ:</div>
          <Countdown targetDate={targetDate} />
        </div>

        <div className="tariffs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
          {TARIFFS.map((t) => <TariffCard key={t.id} tariff={t} mousePos={mousePos} />)}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onClick={clickSound}
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "20px 60px", border: `2px solid ${btnHover ? "var(--neon)" : "rgba(57,255,20,0.5)"}`, background: btnHover ? "rgba(57,255,20,0.12)" : "rgba(57,255,20,0.06)", color: "var(--neon)", cursor: "pointer", borderRadius: 4, transition: "all 0.25s ease", boxShadow: btnHover ? "0 0 40px rgba(57,255,20,0.4), 0 0 80px rgba(57,255,20,0.15)" : "0 0 20px rgba(57,255,20,0.15)", position: "relative", overflow: "hidden" }}
          >
            {btnHover && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.08), transparent)", animation: "btn-sweep 0.6s ease forwards" }} />}
            [ Занять место в будущем ]
          </button>
          <div style={{ marginTop: "1rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>🔒 БЕЗОПАСНАЯ ОПЛАТА · ГАРАНТИЯ ВОЗВРАТА</div>
        </div>
      </div>

      <style>{`
        @keyframes holo-shine {
          0%   { background-position: 200% 200%; }
          100% { background-position: -200% -200%; }
        }
        @keyframes btn-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (max-width: 900px) {
          #tariffs .tariffs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

export default function ConversionBlock() {
  return (
    <>
      <CalculatorSection />
      <TariffsSection />
    </>
  );
}
