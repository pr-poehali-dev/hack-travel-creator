import { useEffect, useRef, useState } from "react";

const IMG1 = "https://cdn.poehali.dev/projects/4a857690-a271-41da-9c2d-6bd6a05799d9/files/139bdf45-56c3-4601-804d-c32794defb14.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/4a857690-a271-41da-9c2d-6bd6a05799d9/files/4e76fd5c-4ade-4b79-8ea6-c610aaa9c75b.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/4a857690-a271-41da-9c2d-6bd6a05799d9/files/f6e3a84d-17b1-4bf6-b08a-0b08a83941ea.jpg";

const MARQUEE_ITEMS = [
  "Брендинг", "UI/UX Дизайн", "Веб-разработка", "Айдентика", "Анимация", "Стратегия",
  "Брендинг", "UI/UX Дизайн", "Веб-разработка", "Айдентика", "Анимация", "Стратегия",
];

const SERVICES = [
  { num: "01", icon: "✦", name: "Брендинг", desc: "Создаём идентичность, которая врезается в память. Логотипы, гайдлайны, айдентика — от идеи до финального руководства." },
  { num: "02", icon: "◈", name: "Веб-дизайн", desc: "Сайты и интерфейсы с характером. Проектируем опыт, который конвертирует посетителей в клиентов." },
  { num: "03", icon: "⬡", name: "Стратегия", desc: "Анализируем рынок и конкурентов, выстраиваем позиционирование, которое работает на долгосрочный результат." },
  { num: "04", icon: "◎", name: "Анимация", desc: "Motion-дизайн и анимации для продуктов, соцсетей и презентаций. Ваш бренд оживает." },
  { num: "05", icon: "▲", name: "Разработка", desc: "Фронтенд и веб-приложения на современных технологиях. Быстро, красиво, надёжно." },
  { num: "06", icon: "◉", name: "Фото / Видео", desc: "Полный цикл визуального контента: концепция, съёмка, постпродакшн — для брендов и продуктов." },
];

const PORTFOLIO = [
  { img: IMG1, tag: "Брендинг", title: "Lumex Studio" },
  { img: IMG2, tag: "UI/UX", title: "Forma App" },
  { img: IMG3, tag: "Айдентика", title: "Nord Agency" },
  { img: IMG2, tag: "Веб-сайт", title: "Pulse Digital" },
];

function HeroSection() {
  const [btnHover, setBtnHover] = useState(false);
  const glitchRef = useRef<HTMLHeadingElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glitchRef.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const trigger = () => {
      el.classList.add("glitch-active");
      t = setTimeout(() => {
        el.classList.remove("glitch-active");
        t = setTimeout(trigger, 2800 + Math.random() * 2000);
      }, 400);
    };
    t = setTimeout(trigger, 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = ticketRef.current;
    if (!el) return;
    let angle = 0;
    let raf: number;
    const animate = () => {
      angle += 0.008;
      const y = Math.sin(angle) * 12;
      const rx = Math.cos(angle * 0.7) * 6;
      el.style.transform = `translateY(${y}px) rotateX(${rx}deg) rotateY(${angle * 20}deg)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="home" style={{
      position: "relative",
      minHeight: "100vh",
      background: "#050505",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      padding: "120px 40px 80px",
    }}>
      {/* Animated grid bg */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(57,255,20,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(57,255,20,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Neon glows */}
      <div style={{
        position: "absolute", top: "20%", left: "10%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(57,255,20,0.07) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "5%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* Scan lines */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 900, width: "100%" }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.3em",
          color: "var(--neon)",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
          opacity: 0.9,
        }}>
          &gt;&gt; Хватит кормить посредственных фрилансеров.
        </p>

        {/* Main title with glitch */}
        <h1 ref={glitchRef} className="hero-glitch-title" style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          lineHeight: 0.95,
          color: "#ffffff",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          marginBottom: "2rem",
          position: "relative",
        }}>
          КВАНТОВЫЙ
          <br />
          <span style={{
            color: "var(--neon)",
            textShadow: "0 0 30px rgba(57,255,20,0.6), 0 0 60px rgba(57,255,20,0.3)",
          }}>РАЗРЫВ</span>
          <br />
          ШАБЛОНОВ.
        </h1>

        {/* Sub heading */}
        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
          color: "var(--neon-blue)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "1.5rem",
          textShadow: "0 0 20px rgba(0,240,255,0.4)",
        }}>
          Замени отдел продакшена нейросетями за 48 часов.
        </p>

        {/* Body text */}
        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.75,
          maxWidth: 640,
          marginBottom: "3rem",
        }}>
          Закрытый 2-дневный ИИ-воркшоп во Владивостоке. Ты приходишь с пустым экраном — уходишь с готовыми фотосессиями, вирусными видео, треками и текстами, которые продают. Мы научим тебя делать деньги из пикселей.
        </p>

        {/* CTA Button */}
        <button
          className="hero-neon-btn"
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 800,
            fontSize: "1rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "18px 48px",
            border: `2px solid ${btnHover ? "var(--neon-blue)" : "var(--neon)"}`,
            background: btnHover
              ? "rgba(0,240,255,0.1)"
              : "rgba(57,255,20,0.08)",
            color: btnHover ? "var(--neon-blue)" : "var(--neon)",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s ease",
            boxShadow: btnHover
              ? "0 0 30px rgba(0,240,255,0.5), 0 0 60px rgba(0,240,255,0.2), inset 0 0 20px rgba(0,240,255,0.05)"
              : "0 0 20px rgba(57,255,20,0.3), 0 0 40px rgba(57,255,20,0.1)",
          }}
        >
          {btnHover && (
            <>
              <span className="btn-spark btn-spark-1" />
              <span className="btn-spark btn-spark-2" />
              <span className="btn-spark btn-spark-3" />
            </>
          )}
          [ Взломать свой бизнес ]
        </button>
      </div>

      {/* Floating holographic ticket */}
      <div ref={ticketRef} className="holo-ticket" style={{
        position: "absolute",
        right: "8%",
        top: "50%",
        marginTop: "-100px",
        zIndex: 2,
        perspective: 800,
      }}>
        <div style={{
          width: 180,
          background: "linear-gradient(135deg, rgba(57,255,20,0.15) 0%, rgba(0,240,255,0.15) 50%, rgba(180,0,255,0.15) 100%)",
          border: "1px solid rgba(57,255,20,0.4)",
          borderRadius: "8px",
          padding: "24px 20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 40px rgba(57,255,20,0.2), 0 0 80px rgba(0,240,255,0.1)",
          fontFamily: "'IBM Plex Mono', monospace",
        }}>
          <div style={{ fontSize: "2rem", textAlign: "center", marginBottom: 12 }}>🎟️</div>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--neon)", textTransform: "uppercase", marginBottom: 6 }}>VIP ACCESS</div>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 10 }}>AI<br />WORKSHOP</div>
          <div style={{ borderTop: "1px dashed rgba(255,255,255,0.2)", paddingTop: 10 }}>
            <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em" }}>VLADIVOSTOK</div>
            <div style={{ fontSize: "0.7rem", color: "var(--neon-blue)", marginTop: 3 }}>48 HOURS</div>
          </div>
          <div style={{
            marginTop: 12,
            height: 30,
            background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 3px)",
            borderRadius: 2,
            opacity: 0.7,
          }} />
        </div>
      </div>

      <style>{`
        .hero-glitch-title.glitch-active {
          animation: glitch-anim 0.4s steps(2) forwards;
        }
        @keyframes glitch-anim {
          0%   { text-shadow: 3px 0 #39ff14, -3px 0 #00f0ff; clip-path: inset(10% 0 80% 0); }
          20%  { text-shadow: -3px 0 #39ff14, 3px 0 #00f0ff; clip-path: inset(60% 0 20% 0); transform: translateX(4px); }
          40%  { text-shadow: 3px 0 #ff00ff, -3px 0 #39ff14; clip-path: inset(30% 0 50% 0); transform: translateX(-4px); }
          60%  { text-shadow: -2px 0 #00f0ff, 2px 0 #ff00ff; clip-path: inset(70% 0 5% 0); transform: translateX(2px); }
          80%  { clip-path: inset(5% 0 90% 0); transform: translateX(-2px); }
          100% { text-shadow: none; clip-path: none; transform: none; }
        }
        .btn-spark {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--neon-blue);
          animation: spark-fly 0.6s ease-out infinite;
          box-shadow: 0 0 6px var(--neon-blue);
        }
        .btn-spark-1 { top: -4px; left: 20%; animation-delay: 0s; }
        .btn-spark-2 { top: -4px; left: 60%; animation-delay: 0.2s; }
        .btn-spark-3 { bottom: -4px; left: 40%; animation-delay: 0.1s; }
        @keyframes spark-fly {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-16px) scale(0.2); }
        }
        @media (max-width: 768px) {
          .holo-ticket { display: none; }
        }
      `}</style>
    </section>
  );
}

const PAIN_ITEMS = [
  {
    icon: "💸",
    text: "Ты сливаешь бюджеты на дизайнеров, которые срывают дедлайны.",
  },
  {
    icon: "🔐",
    text: "Тебя бесит танцевать с бубном вокруг VPN и криптокошельков, чтобы оплатить зарубежные сервисы.",
  },
  {
    icon: "🤖",
    text: 'Ты открываешь ChatGPT, пишешь «сделай мне пост», получаешь роботизированный бред и закрываешь вкладку.',
  },
  {
    icon: "📉",
    text: "Пока ты сомневаешься, твои конкуренты уже генерируют контент бесплатно. Ты находишься в точке потери прибыли. Пора перерезать эти провода.",
    highlight: true,
  },
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

function PainSection() {
  return (
    <section id="pain" style={{
      position: "relative",
      background: "#050505",
      padding: "100px 0",
      overflow: "hidden",
    }}>
      {/* Divider line top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,40,40,0.5), transparent)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, minHeight: 560 }}>

        {/* LEFT — RED CHAOS */}
        <div style={{
          position: "relative",
          background: "linear-gradient(135deg, rgba(180,0,0,0.12) 0%, rgba(255,40,40,0.06) 100%)",
          borderRight: "1px solid rgba(255,40,40,0.2)",
          padding: "60px 50px",
          overflow: "hidden",
        }}>
          {/* Red glow */}
          <div style={{
            position: "absolute", top: "30%", left: "20%",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,40,40,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Falling icons */}
          {["💸", "📋", "🧾", "📉", "⏰", "😤"].map((emoji, i) => (
            <span key={i} className={`fall-icon fall-icon-${i}`} style={{
              position: "absolute",
              fontSize: "1.5rem",
              opacity: 0.25,
              animation: `fall-down ${2.5 + i * 0.4}s linear ${i * 0.6}s infinite`,
              left: `${10 + i * 14}%`,
              top: `-40px`,
              filter: "grayscale(0.3)",
            }}>{emoji}</span>
          ))}

          {/* Title */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "rgba(255,80,80,0.8)",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}>// STATUS: КРИТИЧЕСКАЯ ОШИБКА</div>

          <h2 style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 1.05,
            marginBottom: "2.5rem",
            letterSpacing: "-0.02em",
          }}>
            Твоя старая<br />
            бизнес-модель<br />
            <span style={{ color: "rgba(255,80,80,0.9)", textShadow: "0 0 20px rgba(255,40,40,0.5)" }}>мертва.</span>
            <br />
            <span style={{ fontSize: "0.55em", color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>Узнаёшь себя?</span>
          </h2>

          {/* Glitchy mannequin placeholder */}
          <div style={{
            width: "100%",
            height: 120,
            background: "linear-gradient(135deg, rgba(255,40,40,0.08), rgba(180,0,0,0.04))",
            border: "1px solid rgba(255,40,40,0.15)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "3rem",
            position: "relative",
            overflow: "hidden",
          }}>
            <span className="glitch-mannequin">🧍</span>
            <div style={{
              position: "absolute", inset: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,40,40,0.04) 3px, rgba(255,40,40,0.04) 4px)",
            }} />
          </div>
        </div>

        {/* RIGHT — GREEN FUTURE */}
        <div style={{
          background: "linear-gradient(135deg, rgba(0,10,0,0.8) 0%, rgba(0,20,5,0.6) 100%)",
          padding: "60px 50px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Green glow */}
          <div style={{
            position: "absolute", bottom: "20%", right: "10%",
            width: 280, height: 280, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Terminal header */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "var(--neon)",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
            opacity: 0.7,
          }}>
            &gt; terminal_v2.exe — [БОЛИ РАСПОЗНАНЫ]
          </div>

          {/* Pain items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {PAIN_ITEMS.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                padding: item.highlight ? "16px" : "0",
                background: item.highlight ? "rgba(57,255,20,0.05)" : "transparent",
                border: item.highlight ? "1px solid rgba(57,255,20,0.2)" : "none",
                borderRadius: item.highlight ? 4 : 0,
              }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <TypewriterLine text={item.text} delay={i * 300} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider line bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.3), transparent)",
      }} />

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

      {/* Hero */}
      <HeroSection />

      {/* Pain Section */}
      <PainSection />

      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <div className="marquee-item" key={i}>
              {item}
              <span className="marquee-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="about-section" id="about">
        <div className="section-label fade-up">О нас</div>
        <h2 className="section-title fade-up fade-up-delay-1">
          Мы — другие.<br />
          <span style={{ color: "var(--gray)", fontWeight: 300 }}>И гордимся этим.</span>
        </h2>
        <div className="about-grid">
          <div className="about-left">
            <p className="about-text fade-up fade-up-delay-1">
              <strong>Kreativ</strong> — студия визуальных решений, которая верит: <strong>дизайн должен продавать, вдохновлять и шокировать</strong> — одновременно. Мы не делаем «как у всех».
            </p>
            <p className="about-text fade-up fade-up-delay-2">
              Наш подход — глубокое погружение в бизнес клиента, честный диалог и неудобные вопросы. Потому что красивая обёртка без стратегии внутри — это просто дорогой мусор.
            </p>
            <div className="about-stats fade-up fade-up-delay-3">
              {([["120+", "проектов"], ["6", "лет опыта"], ["98%", "довольных"]] as const).map(([n, l]) => (
                <div key={n}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image fade-up fade-up-delay-2">
            <img src={IMG3} alt="Команда Kreativ" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section" id="services">
        <div className="services-header">
          <div>
            <div className="section-label fade-up">Услуги</div>
            <h2 className="section-title fade-up fade-up-delay-1">
              Что мы<br />умеем
            </h2>
          </div>
          <p className="fade-up" style={{ maxWidth: 320, color: "var(--gray)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            Полный спектр визуальных и digital-решений — от стратегии до воплощения.
          </p>
        </div>
        <div className="services-list">
          {SERVICES.map((s, i) => (
            <div className={`service-item fade-up fade-up-delay-${(i % 3) + 1}`} key={i}>
              <div className="service-num">{s.num}</div>
              <span className="service-icon">{s.icon}</span>
              <div className="service-name">{s.name}</div>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section className="portfolio-section" id="portfolio">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div className="section-label fade-up">Портфолио</div>
            <h2 className="section-title fade-up fade-up-delay-1">
              Избранные<br />работы
            </h2>
          </div>
          <button className="btn-outline fade-up" style={{ paddingBottom: 0 }}>
            Все проекты →
          </button>
        </div>
        <div className="portfolio-grid">
          {PORTFOLIO.map((p, i) => (
            <div className={`port-item fade-up fade-up-delay-${(i % 3) + 1}`} key={i}>
              <img src={p.img} alt={p.title} />
              <div className="port-overlay">
                <div className="port-meta">
                  <span className="port-tag">{p.tag}</span>
                  <div className="port-title">{p.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="contact-left">
            <div className="section-label fade-up">Контакты</div>
            <h2 className="contact-big fade-up fade-up-delay-1">
              Есть<br />
              <span>проект?</span><br />
              Пиши.
            </h2>
            <div className="contact-info fade-up fade-up-delay-2">
              {([
                ["Телефон", "+7 (999) 000-00-00"],
                ["Email", "hello@kreativ.ru"],
                ["Адрес", "Москва, Россия"],
              ] as const).map(([label, val]) => (
                <div className="contact-info-item" key={label}>
                  <span className="info-label">{label}</span>
                  <span className="info-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <form className="contact-form fade-up fade-up-delay-2" onSubmit={(e) => e.preventDefault()}>
            {[
              { name: "name", label: "Ваше имя" },
              { name: "company", label: "Компания" },
              { name: "email", label: "Email" },
            ].map((f) => (
              <div className="form-group" key={f.name}>
                <input type="text" className="form-input" placeholder=" " name={f.name} />
                <label className="form-label">{f.label}</label>
              </div>
            ))}
            <div className="form-group">
              <textarea className="form-input" placeholder=" " rows={3} style={{ resize: "none" }} />
              <label className="form-label">Расскажите о проекте</label>
            </div>
            <button type="submit" className="form-submit">
              Отправить заявку
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">Kreativ</div>
        <div className="footer-copy">© 2024 Все права защищены</div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Telegram", "Instagram", "Behance"].map((s) => (
            <a
              key={s}
              href="#"
              style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--neon)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--gray)")}
            >
              {s}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}