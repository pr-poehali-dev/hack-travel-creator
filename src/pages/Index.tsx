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

function QuantumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", resize);

    // Quantum particles
    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      color: string;
      alpha: number;
      life: number; maxLife: number;
      trail: { x: number; y: number }[];
    };

    const COLORS = ["#39ff14", "#00f0ff", "#b400ff", "#ff003c", "#ffffff"];
    const particles: Particle[] = [];

    // Rifts — space tears
    type Rift = {
      x: number; y: number;
      angle: number; length: number;
      width: number; alpha: number;
      color: string; speed: number;
      phase: number;
    };
    const rifts: Rift[] = Array.from({ length: 6 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      angle: Math.random() * Math.PI,
      length: 60 + Math.random() * 140,
      width: 1 + Math.random() * 3,
      alpha: 0,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: 0.008 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
    }));

    const spawnParticle = (x: number, y: number, color: string) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2.5,
        color,
        alpha: 1,
        life: 0, maxLife: 60 + Math.random() * 80,
        trail: [],
      });
    };

    let frame = 0;
    let raf: number;

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,5,0.18)";
      ctx.fillRect(0, 0, W, H);

      frame++;

      // Draw & update rifts
      rifts.forEach((r) => {
        r.phase += r.speed;
        r.alpha = 0.3 + Math.sin(r.phase) * 0.3;

        // Slowly drift
        r.x += Math.sin(r.phase * 0.3) * 0.3;
        r.y += Math.cos(r.phase * 0.2) * 0.2;
        if (r.x < -50) r.x = W + 50;
        if (r.x > W + 50) r.x = -50;
        if (r.y < -50) r.y = H + 50;
        if (r.y > H + 50) r.y = -50;

        // Rift tear line
        const len = r.length * (0.7 + Math.sin(r.phase * 2) * 0.3);
        const x1 = r.x - Math.cos(r.angle) * len / 2;
        const y1 = r.y - Math.sin(r.angle) * len / 2;
        const x2 = r.x + Math.cos(r.angle) * len / 2;
        const y2 = r.y + Math.sin(r.angle) * len / 2;

        // Outer glow
        ctx.save();
        ctx.globalAlpha = r.alpha * 0.15;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = r.width * 6;
        ctx.lineCap = "round";
        ctx.shadowBlur = 20;
        ctx.shadowColor = r.color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Core bright line
        ctx.globalAlpha = r.alpha;
        ctx.lineWidth = r.width;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();

        // Spawn particles from rift edges
        if (frame % 8 === 0 && Math.random() > 0.4) {
          spawnParticle(x1 + (Math.random() - 0.5) * 10, y1 + (Math.random() - 0.5) * 10, r.color);
          spawnParticle(x2 + (Math.random() - 0.5) * 10, y2 + (Math.random() - 0.5) * 10, r.color);
        }

        // Quantum energy pulses along rift
        const t = (Math.sin(r.phase * 3) + 1) / 2;
        const px = x1 + (x2 - x1) * t;
        const py = y1 + (y2 - y1) * t;
        ctx.save();
        ctx.globalAlpha = r.alpha * 0.9;
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = r.color;
        ctx.beginPath();
        ctx.arc(px, py, r.width * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Floating quantum dots
      if (frame % 3 === 0) {
        const c = COLORS[Math.floor(Math.random() * COLORS.length)];
        spawnParticle(Math.random() * W, Math.random() * H, c);
      }

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        // Draw trail
        if (p.trail.length > 1) {
          ctx.save();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.5;
          ctx.lineCap = "round";
          for (let t = 1; t < p.trail.length; t++) {
            ctx.globalAlpha = p.alpha * (t / p.trail.length) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Draw dot
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}

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
      angle += 0.016;
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
      padding: "clamp(4.5rem, 10vw, 120px) 40px 80px",
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

      {/* Quantum canvas */}
      <QuantumCanvas />

      {/* Scan lines */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: 900, width: "100%" }}>
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

      <div className="pain-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, minHeight: 560 }}>

        {/* LEFT — RED CHAOS */}
        <div className="pain-left" style={{
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
        <div className="pain-right" style={{
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

const CURATORS = [
  { name: "Алекс Нейро", power: "Prompt Engineering • Midjourney Master", avatar: "🤖" },
  { name: "Виктор Код", power: "ChatGPT • Claude • Автоматизация", avatar: "⚡" },
  { name: "Мария Veo", power: "AI-видео • Runway • Kling Pro", avatar: "🎬" },
  { name: "Дмитрий Flux", power: "Генерация фото • FLUX • Stable Diffusion", avatar: "🖼️" },
  { name: "Алина Suno", power: "AI-музыка • Suno • Udio", avatar: "🎵" },
  { name: "Рома Banana", power: "Nano Banana • AI-тексты • SEO", avatar: "✍️" },
  { name: "Юля Pixel", power: "Adobe Firefly • Canva AI • Брендинг", avatar: "🎨" },
  { name: "Саша GPT", power: "GPT-4o • Системные промпты", avatar: "🧠" },
  { name: "Никита Bot", power: "AI-автоматизация • Make • Zapier", avatar: "🔧" },
  { name: "Оля Vision", power: "AI-аналитика • Данные • Прогнозы", avatar: "🔮" },
  { name: "Паша Krea", power: "Krea AI • ComfyUI • LoRA", avatar: "🌀" },
  { name: "Таня Voice", power: "ElevenLabs • AI-озвучка • Подкасты", avatar: "🎙️" },
  { name: "Женя 3D", power: "Tripo3D • Meshy • AI-3D модели", avatar: "🧊" },
  { name: "Лена Script", power: "AI-сценарии • Reels • TikTok-виралы", avatar: "📱" },
  { name: "Макс Deploy", power: "Полный пайплайн • От идеи до продаж", avatar: "🚀" },
];

const PERKS = [
  { icon: "🎯", title: "15 ИИ-спецназовцев в зале", desc: "На каждых 3 участников — свой куратор. Не получается промпт? Куратор садится рядом и доводит твой результат до идеала." },
  { icon: "💳", title: "Снесли все барьеры", desc: "Нет зарубежной карты? Забудь. Мы сами поможем оплатить и подключить все топовые нейросети (Kling, Veo, Nano Banana, Suno) прямо на месте." },
  { icon: "⏱️", title: "Ноль воды", desc: "20 минут теории, 60 минут генерации твоих реальных активов. Никаких «разминок» и «домашних заданий»." },
];

function CuratorCard({ curator, index }: { curator: typeof CURATORS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="curator-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? "linear-gradient(135deg, rgba(57,255,20,0.08) 0%, rgba(0,240,255,0.08) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        border: `1px solid ${hovered ? "rgba(57,255,20,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 8,
        padding: "20px 16px",
        backdropFilter: "blur(12px)",
        cursor: "default",
        transition: "all 0.3s ease",
        boxShadow: hovered
          ? "0 0 24px rgba(57,255,20,0.15), 0 0 48px rgba(0,240,255,0.08), inset 0 0 20px rgba(57,255,20,0.03)"
          : "none",
        overflow: "hidden",
        minHeight: 130,
      }}
    >
      {/* Scan line on hover */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(57,255,20,0.03) 3px, rgba(57,255,20,0.03) 4px)",
        }} />
      )}

      {/* Number */}
      <div style={{
        position: "absolute", top: 10, right: 12,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.6rem",
        color: hovered ? "var(--neon)" : "rgba(255,255,255,0.15)",
        letterSpacing: "0.1em",
        transition: "color 0.3s",
      }}>#{String(index + 1).padStart(2, "0")}</div>

      {/* Avatar with glasses effect */}
      <div style={{
        fontSize: "2rem",
        marginBottom: 10,
        display: "inline-block",
        filter: hovered ? "drop-shadow(0 0 8px rgba(57,255,20,0.8))" : "none",
        transition: "filter 0.3s",
      }}>{curator.avatar}</div>

      {/* Glasses icon on hover */}
      {hovered && (
        <span style={{
          position: "absolute", top: 14, left: 14,
          fontSize: "0.9rem",
          animation: "glasses-glow 0.4s ease forwards",
        }}>🕶️</span>
      )}

      <div style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontWeight: 700,
        fontSize: "0.82rem",
        color: hovered ? "#fff" : "rgba(255,255,255,0.75)",
        marginBottom: 6,
        transition: "color 0.3s",
      }}>{curator.name}</div>

      {/* Superpower — shows on hover */}
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.65rem",
        color: "var(--neon)",
        lineHeight: 1.5,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(6px)",
        transition: "all 0.3s ease",
      }}>
        ⚡ {curator.power}
      </div>
    </div>
  );
}

function SolutionSection() {
  return (
    <section id="solution" style={{
      position: "relative",
      background: "#050505",
      padding: "100px 0 120px",
      overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem", maxWidth: 720 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "var(--neon-blue)",
            textTransform: "uppercase",
            marginBottom: "1.2rem",
            opacity: 0.8,
          }}>// БЛОК ЗАЩИТЫ ОТ СЛИВА</div>

          <h2 style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}>
            Почему ты не сольёшься<br />
            на полпути?{" "}
            <span style={{ color: "var(--neon)", textShadow: "0 0 24px rgba(57,255,20,0.5)" }}>Потому что<br />мы не дадим.</span>
          </h2>

          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.75,
          }}>
            Мы знаем, почему инфокурсы не работают. Ты остаёшься один на один с ошибкой «System Error». На нашем воркшопе всё иначе:
          </p>
        </div>

        {/* Perks row */}
        <div className="perks-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          marginBottom: "5rem",
        }}>
          {PERKS.map((p, i) => (
            <div key={i} style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(57,255,20,0.15)",
              borderRadius: 8,
              padding: "28px 24px",
              backdropFilter: "blur(8px)",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{p.icon}</div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--neon)",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}>{p.title}</div>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.65,
                margin: 0,
              }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Curators grid label */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "var(--neon)",
            textTransform: "uppercase",
            opacity: 0.8,
          }}>// 15 ИИ-СПЕЦНАЗОВЦЕВ — НАВЕДИ НА КАРТОЧКУ</div>
          <div style={{ flex: 1, height: "1px", background: "rgba(57,255,20,0.15)" }} />
        </div>

        {/* Curators grid */}
        <div className="curators-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1rem",
        }}>
          {CURATORS.map((c, i) => (
            <CuratorCard key={i} curator={c} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes glasses-glow {
          0%   { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 1024px) {
          #solution .curators-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          #solution .perks-grid { grid-template-columns: 1fr !important; }
          #solution .curators-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

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

function ArsenalSection() {
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
    <section ref={sectionRef} id="arsenal" style={{
      position: "relative",
      background: "linear-gradient(180deg, #050505 0%, #070b07 50%, #050505 100%)",
      padding: "100px 0 120px",
      overflow: "hidden",
    }}>
      {/* Faint grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(57,255,20,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.025) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "var(--neon)",
            textTransform: "uppercase",
            marginBottom: "1.2rem",
            opacity: 0.8,
          }}>// ТРОФЕИ ЧЕРЕЗ 48 ЧАСОВ</div>
          <h2 style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}>
            Твой арсенал{" "}
            <span style={{ color: "var(--neon)", textShadow: "0 0 24px rgba(57,255,20,0.5)" }}>хищника</span>
            <br />через 2 дня:
          </h2>
        </div>

        {/* Conveyor belt */}
        <div className="belt-wrap" style={{
          position: "relative",
          marginBottom: "5rem",
          padding: "0 0 40px",
        }}>
          {/* Belt track */}
          <div style={{
            position: "relative",
            height: 6,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 3,
            marginBottom: "3rem",
            overflow: "visible",
          }}>
            {/* Progress fill */}
            <div style={{
              position: "absolute", left: 0, top: 0, height: "100%",
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg, var(--neon), var(--neon-blue))",
              borderRadius: 3,
              boxShadow: "0 0 12px rgba(57,255,20,0.6)",
              transition: "width 0.1s linear",
            }} />

            {/* Artifact drops */}
            {ARTIFACTS.map((art, i) => (
              <div key={i} style={{
                position: "absolute",
                top: visibleArtifacts[i] ? -70 : -130,
                left: `${10 + i * 26}%`,
                transition: `top 0.35s cubic-bezier(.34,1.56,.64,1) ${art.delay * 0.4}s, opacity 0.25s ease ${art.delay * 0.4}s`,
                opacity: visibleArtifacts[i] ? 1 : 0,
                textAlign: "center",
              }}>
                <div style={{
                  fontSize: "2.8rem",
                  display: "block",
                  filter: `drop-shadow(0 0 12px ${art.glow})`,
                  animation: visibleArtifacts[i] ? `artifact-float-${i} 3s ease-in-out ${art.delay}s infinite` : "none",
                  marginBottom: 8,
                }}>{art.emoji}</div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  color: art.color,
                  letterSpacing: "0.1em",
                  whiteSpace: "nowrap",
                  textShadow: `0 0 10px ${art.glow}`,
                }}>{art.label}</div>
              </div>
            ))}

            {/* Belt dots */}
            {[...Array(20)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                top: "50%", transform: "translateY(-50%)",
                left: `${i * 5.2}%`,
                width: 4, height: 4, borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
              }} />
            ))}
          </div>
        </div>

        {/* Days grid */}
        <div className="days-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

          {/* DAY 1 */}
          <div style={{
            background: "linear-gradient(135deg, rgba(57,255,20,0.06), rgba(57,255,20,0.02))",
            border: "1px solid rgba(57,255,20,0.2)",
            borderRadius: 8,
            padding: "32px 28px",
            backdropFilter: "blur(8px)",
          }}>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 900,
              fontSize: "1.1rem",
              color: "var(--neon)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "1.8rem",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              🔥 <span>День 1. Смыслы и визуал</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              {DAY1.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem",
                      color: "var(--neon)",
                      letterSpacing: "0.1em",
                      marginBottom: 4,
                      opacity: 0.8,
                    }}>{item.tool}</div>
                    <p style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "0.92rem",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DAY 2 */}
          <div style={{
            background: "linear-gradient(135deg, rgba(0,240,255,0.06), rgba(0,240,255,0.02))",
            border: "1px solid rgba(0,240,255,0.2)",
            borderRadius: 8,
            padding: "32px 28px",
            backdropFilter: "blur(8px)",
          }}>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 900,
              fontSize: "1.1rem",
              color: "var(--neon-blue)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "1.8rem",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              ⚡ <span>День 2. Динамика и вау-эффект</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              {DAY2.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem",
                      color: "var(--neon-blue)",
                      letterSpacing: "0.1em",
                      marginBottom: 4,
                      opacity: 0.8,
                    }}>{item.tool}</div>
                    <p style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "0.92rem",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes artifact-float-0 {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes artifact-float-1 {
          0%, 100% { transform: translateY(0) rotate(2deg); }
          50% { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes artifact-float-2 {
          0%, 100% { transform: translateY(0) rotate(-2deg) scale(1); }
          50% { transform: translateY(-8px) rotate(4deg) scale(1.05); }
        }
        @keyframes artifact-float-3 {
          0%, 100% { transform: translateY(0) rotate(4deg); }
          50% { transform: translateY(-12px) rotate(-4deg); }
        }
        @media (max-width: 768px) {
          #arsenal .days-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

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

function ArchitectSection() {
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
    <section id="architect" style={{
      position: "relative",
      background: "#050505",
      padding: "100px 0 120px",
      overflow: "hidden",
    }}>
      {/* Divider top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent)" }} />

      <div className="architect-grid" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

        {/* LEFT — Photo + code bg */}
        <div style={{ position: "relative" }}>
          {/* Code stream background */}
          <div style={{
            position: "absolute",
            inset: "-30px -20px",
            overflow: "hidden",
            zIndex: 0,
            maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 40%, transparent 100%)",
          }}>
            <div ref={codeRef} style={{ display: "flex", flexDirection: "column", gap: 8, willChange: "transform" }}>
              {[...CODE_LINES, ...CODE_LINES].map((line, i) => (
                <div key={i} style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.62rem",
                  color: i % 3 === 0 ? "rgba(57,255,20,0.35)" : i % 3 === 1 ? "rgba(0,240,255,0.25)" : "rgba(255,255,255,0.12)",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.04em",
                  paddingLeft: `${(i % 4) * 20}px`,
                }}>{line}</div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Forbes badge */}
            <div style={{
              position: "absolute",
              top: 20, right: 20,
              zIndex: 3,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "var(--neon)",
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(57,255,20,0.4)",
              padding: "6px 10px",
              backdropFilter: "blur(4px)",
              textTransform: "uppercase",
            }}>FORBES 2047 //</div>

            <img
              src={SERGEY_PHOTO}
              alt="Сергей Черников — архитектор ИИ"
              style={{
                width: "100%",
                borderRadius: 6,
                display: "block",
                border: "1px solid rgba(57,255,20,0.15)",
                boxShadow: "0 0 60px rgba(57,255,20,0.1), 0 0 120px rgba(0,240,255,0.05)",
              }}
            />

            {/* Product badges */}
            <div style={{
              position: "absolute",
              bottom: 20, left: 20, right: 20,
              display: "flex", gap: 8,
              zIndex: 3,
            }}>
              {["МультиЧат", "ТГ-БОСС"].map((prod, i) => (
                <div key={i} style={{
                  flex: 1,
                  background: "rgba(0,0,0,0.75)",
                  border: `1px solid ${i === 0 ? "rgba(57,255,20,0.5)" : "rgba(0,240,255,0.5)"}`,
                  borderRadius: 4,
                  padding: "8px 12px",
                  backdropFilter: "blur(8px)",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  color: i === 0 ? "var(--neon)" : "var(--neon-blue)",
                  letterSpacing: "0.1em",
                  textAlign: "center",
                  fontWeight: 700,
                  boxShadow: i === 0 ? "0 0 12px rgba(57,255,20,0.2)" : "0 0 12px rgba(0,240,255,0.2)",
                }}>⚡ {prod}</div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Text */}
        <div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "var(--neon)",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
            opacity: 0.8,
          }}>// КТО ЛОМАЕТ СИСТЕМУ?</div>

          <h2 style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
          }}>Сергей</h2>
          <h2 style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--neon)",
            textTransform: "uppercase",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "2.5rem",
            textShadow: "0 0 30px rgba(57,255,20,0.4)",
          }}>Черников.</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {[
              { icon: "🚫", text: "Я не «инфоцыган», пересказывающий чужие статьи про ChatGPT." },
              { icon: "🏗️", text: "Я — архитектор ИИ-софтов: создатель МультиЧат и ТГ-БОСС, практик и бизнес-психолог." },
              { icon: "🎤", text: "Я уже собрал самое громкое «ИИ ШОУ без ширмы» на Дальнем Востоке." },
              { icon: "🎯", text: "Теперь собираю закрытую группу тех, кто готов забрать свой кусок рынка.", highlight: true },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                padding: item.highlight ? "14px 16px" : "0",
                background: item.highlight ? "rgba(57,255,20,0.05)" : "transparent",
                border: item.highlight ? "1px solid rgba(57,255,20,0.2)" : "none",
                borderRadius: item.highlight ? 6 : 0,
              }}>
                <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: item.highlight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
                  lineHeight: 1.7,
                  margin: 0,
                }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Punchline */}
          <div style={{
            marginTop: "2.5rem",
            padding: "20px 24px",
            background: "linear-gradient(135deg, rgba(0,240,255,0.06), rgba(57,255,20,0.04))",
            border: "1px solid rgba(0,240,255,0.2)",
            borderRadius: 6,
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.65,
          }}>
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

const EXPENSES = [
  { label: "Копирайтер, который не понимает твой продукт", amount: 50000 },
  { label: "Фотосессия с арендой студии", amount: 40000 },
  { label: "Видеомейкер для рилсов", amount: 60000 },
  { label: "Авторская музыка", amount: 30000 },
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
    <section ref={ref} id="calculator" style={{
      position: "relative",
      background: "#050505",
      padding: "100px 0 120px",
      overflow: "hidden",
    }}>
      {/* Divider top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,30,30,0.4), rgba(57,255,20,0.4), transparent)" }} />

      {/* BG glow */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,20,20,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "rgba(255,80,80,0.8)", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            // ЖЕСТОКАЯ МАТЕМАТИКА
          </div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            Сколько стоит твоё{" "}
            <span style={{ color: "rgba(255,60,60,0.9)", textShadow: "0 0 24px rgba(255,30,30,0.5)" }}>бездействие?</span>
          </h2>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
            Давай считать твои расходы на продакшен за месяц:
          </p>
        </div>

        {/* Two columns */}
        <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>

          {/* LEFT — Without AI (red, spinning) */}
          <div style={{
            background: "linear-gradient(135deg, rgba(255,20,20,0.08), rgba(180,0,0,0.04))",
            border: "1px solid rgba(255,40,40,0.25)",
            borderRadius: 8,
            padding: "32px 28px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Flame overlay */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 110%, rgba(255,50,0,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />

            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,80,80,0.7)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              🔥 БЕЗ ИИ / МЕСЯЦ
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2rem" }}>
              {EXPENSES.map((e, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem" }}>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, flex: 1 }}>{e.label}</span>
                  <div style={{ fontSize: "1rem", flexShrink: 0 }}>
                    <SlotNumber value={e.amount} active={active} red />
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{
              background: "rgba(255,20,20,0.1)",
              border: "1px solid rgba(255,40,40,0.3)",
              borderRadius: 6,
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.05em" }}>ИТОГО:</span>
              <div style={{ fontSize: "1.5rem" }}>
                <SlotNumber value={total} active={active} red />
              </div>
            </div>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,100,100,0.6)", marginTop: "0.8rem", textAlign: "center" }}>И куча потраченных нервов.</p>
          </div>

          {/* RIGHT — With AI (gold zero) */}
          <div style={{
            background: "linear-gradient(135deg, rgba(57,255,20,0.07), rgba(0,240,255,0.04))",
            border: "1px solid rgba(57,255,20,0.25)",
            borderRadius: 8,
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(57,255,20,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--neon)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              ⚡ С ИИ-ВОРКШОПОМ
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
              {/* Zero */}
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 900,
                fontSize: "clamp(4rem, 10vw, 7rem)",
                color: "#ffd700",
                textShadow: "0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.2)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                animation: active ? "gold-pulse 2s ease-in-out infinite" : "none",
              }}>0 ₽</div>

              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", textAlign: "center", lineHeight: 1.6, maxWidth: 260 }}>
                Нейросети работают на тебя <span style={{ color: "var(--neon)", fontWeight: 700 }}>бесплатно. Всегда.</span>
              </div>

              {/* AI tools list */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                {["МультиЧат", "Freepik", "Kling", "Suno", "Veo", "Нано Банано"].map((t, i) => (
                  <span key={i} style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    color: "var(--neon-blue)",
                    border: "1px solid rgba(0,240,255,0.25)",
                    borderRadius: 3,
                    padding: "3px 8px",
                    letterSpacing: "0.08em",
                  }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: "1.5rem",
              background: "rgba(57,255,20,0.07)",
              border: "1px solid rgba(57,255,20,0.2)",
              borderRadius: 6,
              padding: "14px 18px",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.6,
            }}>
              💡 Билет окупается в момент генерации <strong style={{ color: "#fff" }}>первой карточки товара.</strong>
            </div>
          </div>
        </div>

        {/* Bottom divider math */}
        <div style={{
          textAlign: "center",
          padding: "28px",
          background: "linear-gradient(135deg, rgba(255,215,0,0.04), rgba(57,255,20,0.04))",
          border: "1px solid rgba(255,215,0,0.15)",
          borderRadius: 8,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.05em",
        }}>
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
      {/* Holographic shimmer */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `linear-gradient(135deg, transparent 40%, ${tariff.glow} 50%, transparent 60%)`,
        backgroundSize: "200% 200%",
        animation: "holo-shine 4s linear infinite",
      }} />

      {/* Scan lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
      }} />

      {/* Badge */}
      {tariff.badge && (
        <div style={{
          position: "absolute", top: 16, right: 16,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "#000",
          background: tariff.accent,
          padding: "4px 10px",
          borderRadius: 3,
          zIndex: 2,
        }}>{tariff.badge}</div>
      )}

      {/* Seats left */}
      <div style={{
        position: "relative", zIndex: 1,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.15em",
        color: tariff.seats <= 3 ? "#ff5050" : "rgba(255,255,255,0.4)",
        marginBottom: "1.2rem",
        textTransform: "uppercase",
      }}>
        {tariff.seats <= 3 ? "⚠️ " : ""}ОСТАЛОСЬ {tariff.seats} МЕСТА
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.3em",
        color: tariff.accent,
        textTransform: "uppercase",
        marginBottom: "0.8rem",
        position: "relative", zIndex: 1,
        textShadow: `0 0 10px ${tariff.glow}`,
      }}>{tariff.label}</div>

      {/* Price */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: "2rem" }}>
        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
          color: "#fff",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}>{tariff.price}</div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.3)",
          textDecoration: "line-through",
          marginTop: 4,
        }}>{tariff.oldPrice}</div>
      </div>

      {/* Features */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "2rem" }}>
        {tariff.features.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
            <span style={{ color: tariff.accent, flexShrink: 0, fontSize: "0.8rem", marginTop: 2, textShadow: `0 0 6px ${tariff.glow}` }}>✦</span>
            <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Pass-style bottom */}
      <div style={{
        position: "relative", zIndex: 1,
        borderTop: `1px dashed ${tariff.border}`,
        paddingTop: "1rem",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.55rem",
        letterSpacing: "0.15em",
        color: "rgba(255,255,255,0.2)",
        textTransform: "uppercase",
      }}>VLADIVOSTOK · AI WORKSHOP · 2025 · #{tariff.id.toUpperCase()}</div>
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
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 900,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#ff3030",
            lineHeight: 1,
            letterSpacing: "0.04em",
            textShadow: glitch
              ? "3px 0 #39ff14, -3px 0 #00f0ff, 0 0 20px rgba(255,30,30,0.8)"
              : "0 0 20px rgba(255,30,30,0.6), 0 0 40px rgba(255,0,0,0.2)",
            transition: "text-shadow 0.1s",
            transform: glitch ? `translateX(${i % 2 === 0 ? 2 : -2}px)` : "none",
          }}>{pad(val as number)}</div>
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
      style={{
        position: "relative",
        background: "#050505",
        padding: "100px 0 120px",
        overflow: "hidden",
      }}>

      {/* Vault door BG */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px),
          repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px)
        `,
      }} />
      {/* Steel vault panels */}
      <div className="vault-panel" style={{ position: "absolute", top: 0, left: 0, width: "18%", height: "100%", background: "linear-gradient(90deg, rgba(30,30,35,0.9), rgba(20,20,25,0.4))", borderRight: "2px solid rgba(255,255,255,0.06)", zIndex: 0 }} />
      <div className="vault-panel" style={{ position: "absolute", top: 0, right: 0, width: "18%", height: "100%", background: "linear-gradient(270deg, rgba(30,30,35,0.9), rgba(20,20,25,0.4))", borderLeft: "2px solid rgba(255,255,255,0.06)", zIndex: 0 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "rgba(255,80,80,0.8)", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            // ФИЗИКА ЗАЛА НЕ ОБСУЖДАЕТСЯ
          </div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Физика зала и 15 кураторов<br />
            <span style={{ color: "rgba(255,60,60,0.9)", textShadow: "0 0 20px rgba(255,30,30,0.4)" }}>диктуют правила. Мест мало.</span>
          </h2>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.45)", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            Мы физически не сможем взять толпу — иначе качество рухнет. Когда билеты исчезнут, мы повесим табличку <span style={{ color: "#fff", fontWeight: 700 }}>«SOLD OUT»</span>. Это не маркетинговая уловка — это вместимость зала.
          </p>
        </div>

        {/* Countdown */}
        <div style={{
          marginBottom: "3.5rem",
          padding: "24px 32px",
          background: "rgba(255,20,20,0.05)",
          border: "1px solid rgba(255,40,40,0.2)",
          borderRadius: 8,
          textAlign: "center",
        }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,80,80,0.6)", textTransform: "uppercase", marginBottom: "1rem" }}>
            ⏱ ДО ЗАКРЫТИЯ ПРОДАЖ:
          </div>
          <Countdown targetDate={targetDate} />
        </div>

        {/* Tariff cards */}
        <div className="tariffs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
          {TARIFFS.map((t) => (
            <TariffCard key={t.id} tariff={t} mousePos={mousePos} />
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onClick={clickSound}
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "20px 60px",
              border: `2px solid ${btnHover ? "var(--neon)" : "rgba(57,255,20,0.5)"}`,
              background: btnHover ? "rgba(57,255,20,0.12)" : "rgba(57,255,20,0.06)",
              color: "var(--neon)",
              cursor: "pointer",
              borderRadius: 4,
              transition: "all 0.25s ease",
              boxShadow: btnHover
                ? "0 0 40px rgba(57,255,20,0.4), 0 0 80px rgba(57,255,20,0.15)"
                : "0 0 20px rgba(57,255,20,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {btnHover && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.08), transparent)", animation: "btn-sweep 0.6s ease forwards" }} />}
            [ Занять место в будущем ]
          </button>
          <div style={{ marginTop: "1rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
            🔒 БЕЗОПАСНАЯ ОПЛАТА · ГАРАНТИЯ ВОЗВРАТА
          </div>
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

/* ───────────── BLOCK 8: FAQ ───────────── */
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

        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "rgba(255,80,80,0.8)", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            // TERMINAL_ACCESS v2.0 — ДЕШИФРОВКА СОМНЕНИЙ
          </div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            ВЗЛОМ ТВОИХ ОТМАЗОК.<br />
            <span style={{ color: "var(--neon)", textShadow: "0 0 20px rgba(57,255,20,0.4)" }}>Отвечаем на вопросы,<br />которые ты боишься задать.</span>
          </h2>
        </div>

        {/* Terminal window */}
        <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, overflow: "hidden" }}>
          {/* Terminal title bar */}
          <div style={{ background: "#111", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: 0.8 }} />)}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", marginLeft: 8, letterSpacing: "0.1em" }}>objection_crusher.exe — root@workshop</span>
          </div>

          {/* FAQ items */}
          <div style={{ padding: "8px 0" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                {/* Question — ERROR line */}
                <button onClick={() => toggle(i)} style={{
                  width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                  padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: "1rem",
                  transition: "background 0.2s",
                  ...(open === i ? { background: "rgba(57,255,20,0.03)" } : {}),
                }}>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", fontWeight: 700,
                    color: open === i ? "rgba(57,255,20,0.6)" : "rgba(255,50,50,0.8)",
                    letterSpacing: "0.1em", flexShrink: 0, marginTop: 3,
                    transition: "color 0.3s",
                    textShadow: open === i ? "0 0 8px rgba(57,255,20,0.4)" : "0 0 8px rgba(255,30,30,0.4)",
                  }}>{open === i ? "[ACCESS]" : "[ ERROR]"}</span>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.82rem",
                    color: open === i ? "rgba(255,255,255,0.9)" : "rgba(255,150,150,0.85)",
                    lineHeight: 1.6, transition: "color 0.3s",
                  }}>{item.q}</span>
                  <span style={{
                    marginLeft: "auto", flexShrink: 0,
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.8rem",
                    color: open === i ? "var(--neon)" : "rgba(255,80,80,0.5)",
                    transition: "all 0.3s", transform: open === i ? "rotate(45deg)" : "none",
                  }}>+</span>
                </button>

                {/* Answer — ACCESS GRANTED */}
                {open === i && (
                  <div style={{ padding: "0 24px 20px 24px", paddingLeft: "calc(24px + 4.5rem)" }}>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem",
                      color: "var(--neon)", letterSpacing: "0.2em", marginBottom: "0.8rem",
                      textShadow: "0 0 10px rgba(57,255,20,0.5)",
                    }}>✓ ACCESS GRANTED</div>
                    <p style={{
                      fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.92rem",
                      color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: 0,
                      borderLeft: "2px solid rgba(57,255,20,0.3)", paddingLeft: "1rem",
                    }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Blinking cursor line */}
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

/* ───────────── BLOCK 9: CASES ───────────── */
const CASES = [
  { name: "Иван К.", niche: "Логистика", avatar: "🚛", before: "0 контента/мес", after: "40+ постов за 1 день", artifact: "Сайт + УТП за 40 минут прямо в зале", color: "rgba(57,255,20,0.6)", glow: "rgba(57,255,20,0.2)" },
  { name: "Марина Л.", niche: "Ресторанный бизнес", avatar: "🍣", before: "15 000 ₽/мес фотограф", after: "0 ₽ — нейрофото сама", artifact: "Меню + 30 фото блюд за 2 часа", color: "rgba(0,240,255,0.6)", glow: "rgba(0,240,255,0.2)" },
  { name: "Дмитрий В.", niche: "Строительство", avatar: "🏗️", before: "Нет контента вообще", after: "Вирусный Reels за 20 мин", artifact: "3D-визуализация объекта + трек", color: "rgba(200,0,255,0.6)", glow: "rgba(180,0,255,0.2)" },
  { name: "Алёна С.", niche: "Beauty / SPA", avatar: "💆", before: "60 000 ₽/мес SMM-агентство", after: "Уволила агентство на 2-й день", artifact: "Брендинг + воронка продаж", color: "rgba(255,215,0,0.7)", glow: "rgba(255,200,0,0.2)" },
];

function CaseCard({ c, i }: { c: typeof CASES[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      position: "relative", overflow: "hidden",
      background: hovered ? `linear-gradient(135deg, ${c.glow}, rgba(0,0,0,0.3))` : "rgba(255,255,255,0.03)",
      border: `1px solid ${hovered ? c.color : "rgba(255,255,255,0.07)"}`,
      borderRadius: 8, padding: "28px 24px",
      transition: "all 0.3s ease",
      boxShadow: hovered ? `0 0 30px ${c.glow}, 0 0 60px ${c.glow.replace("0.2", "0.08")}` : "none",
      cursor: "default",
    }}>
      {/* Glitch overlay on hover */}
      {hovered && <div style={{ position: "absolute", inset: 0, pointerEvents: "none", animation: "case-glitch 0.3s steps(2) forwards", background: `linear-gradient(135deg, ${c.glow}, transparent)`, opacity: 0.3 }} />}

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "2rem", filter: hovered ? `drop-shadow(0 0 10px ${c.color})` : "none", transition: "filter 0.3s" }}>{c.avatar}</div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>{c.name}</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: c.color, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.8 }}>{c.niche}</div>
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>#{String(i + 1).padStart(2, "0")}</div>
      </div>

      {/* Before / After */}
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

      {/* Artifact */}
      <div style={{
        background: "rgba(255,255,255,0.03)", borderTop: `1px dashed rgba(255,255,255,0.08)`,
        paddingTop: "1rem",
        fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.82rem",
        color: "rgba(255,255,255,0.6)", lineHeight: 1.5,
        opacity: hovered ? 1 : 0.7, transition: "opacity 0.3s",
      }}>
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
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--neon)", textTransform: "uppercase", marginBottom: "1.2rem", opacity: 0.8 }}>
            // СОЦИАЛЬНОЕ ДОКАЗАТЕЛЬСТВО — ДАННЫЕ НЕ ВРУТ
          </div>
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

/* ───────────── BLOCK 10: GUARANTEE ───────────── */
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

        {/* Pulsing shield */}
        <div style={{ display: "inline-block", position: "relative", marginBottom: "3rem" }}>
          {/* Outer rings */}
          {[80, 110, 140].map((size, i) => (
            <div key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              width: size, height: size, borderRadius: "50%",
              border: `1px solid rgba(57,255,20,${0.15 - i * 0.04})`,
              transform: "translate(-50%, -50%)",
              animation: `ring-pulse 2s ease-in-out ${i * 0.4}s infinite`,
            }} />
          ))}
          {/* Shield */}
          <div style={{
            width: 80, height: 80, position: "relative",
            background: "linear-gradient(135deg, rgba(57,255,20,0.12), rgba(0,240,255,0.08))",
            border: "2px solid rgba(57,255,20,0.4)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 30px rgba(57,255,20,0.2), 0 0 60px rgba(57,255,20,0.08)",
            fontSize: "2rem",
            overflow: "hidden",
          }}>
            🛡️
            {/* Laser scan line */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", pointerEvents: "none",
            }}>
              <div style={{
                position: "absolute", top: "50%", left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.8), transparent)",
                transform: `rotate(${scanAngle}deg)`,
                transformOrigin: "center center",
              }} />
            </div>
          </div>
        </div>

        {/* Header */}
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--neon)", textTransform: "uppercase", marginBottom: "1.2rem", opacity: 0.8 }}>
          // ПРОТОКОЛ НУЛЕВОГО РИСКА
        </div>
        <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
          НАША ЛИЧНАЯ<br />
          <span style={{ color: "var(--neon)", textShadow: "0 0 24px rgba(57,255,20,0.4)" }}>ГАРАНТИЯ.</span>
        </h2>

        {/* Guarantee text block */}
        <div className="guarantee-text-block" style={{
          background: "linear-gradient(135deg, rgba(57,255,20,0.05), rgba(0,240,255,0.03))",
          border: "1px solid rgba(57,255,20,0.2)",
          borderRadius: 8, padding: "32px 36px", marginBottom: "3rem",
          textAlign: "left", position: "relative",
        }}>
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

        {/* CTA Button — metallic */}
        <button
          className="guarantee-btn"
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 900, fontSize: "1.1rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "22px 70px",
            border: "2px solid transparent",
            background: btnHover
              ? "linear-gradient(135deg, #39ff14, #00f0ff, #39ff14)"
              : "linear-gradient(135deg, rgba(57,255,20,0.15), rgba(0,240,255,0.1))",
            backgroundOrigin: "border-box",
            color: btnHover ? "#000" : "var(--neon)",
            cursor: "pointer", borderRadius: 4,
            transition: "all 0.3s ease",
            boxShadow: btnHover
              ? "0 0 50px rgba(57,255,20,0.5), 0 0 100px rgba(57,255,20,0.2)"
              : "0 0 20px rgba(57,255,20,0.15), inset 0 0 30px rgba(57,255,20,0.03)",
            position: "relative", overflow: "hidden",
          }}
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

      {/* Solution Section */}
      <SolutionSection />

      {/* Arsenal Section */}
      <ArsenalSection />

      {/* Architect Section */}
      <ArchitectSection />

      {/* Calculator Section */}
      <CalculatorSection />

      {/* Tariffs Section */}
      <TariffsSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Cases Section */}
      <CasesSection />

      {/* Guarantee Section */}
      <GuaranteeSection />
    </>
  );
}