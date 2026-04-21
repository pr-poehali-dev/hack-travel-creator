import { useEffect, useRef, useState } from "react";

function QuantumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const s = canvas.parentElement;
      if (!s) return;
      canvas.width = s.offsetWidth;
      canvas.height = s.offsetHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; alpha: number;
      life: number; maxLife: number; trail: { x: number; y: number }[];
    };
    type Rift = {
      x: number; y: number; angle: number; length: number;
      width: number; alpha: number; color: string; speed: number; phase: number;
    };

    const COLORS = ["#39ff14", "#00f0ff", "#b400ff", "#ff003c", "#ffffff"];
    const particles: Particle[] = [];
    const rifts: Rift[] = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angle: Math.random() * Math.PI,
      length: 60 + Math.random() * 140,
      width: 1 + Math.random() * 3,
      alpha: 0,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: 0.008 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
    }));

    const spawn = (x: number, y: number, color: string) => {
      const a = Math.random() * Math.PI * 2;
      const s = 0.5 + Math.random() * 2;
      particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, size: 1 + Math.random() * 2.5, color, alpha: 1, life: 0, maxLife: 60 + Math.random() * 80, trail: [] });
    };

    let frame = 0;
    let raf: number;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.fillStyle = "rgba(5,5,5,0.18)";
      ctx.fillRect(0, 0, W, H);
      frame++;

      rifts.forEach((r) => {
        r.phase += r.speed;
        r.alpha = 0.3 + Math.sin(r.phase) * 0.3;
        r.x += Math.sin(r.phase * 0.3) * 0.3;
        r.y += Math.cos(r.phase * 0.2) * 0.2;
        if (r.x < -50) r.x = W + 50;
        if (r.x > W + 50) r.x = -50;
        if (r.y < -50) r.y = H + 50;
        if (r.y > H + 50) r.y = -50;

        const len = r.length * (0.7 + Math.sin(r.phase * 2) * 0.3);
        const x1 = r.x - Math.cos(r.angle) * len / 2;
        const y1 = r.y - Math.sin(r.angle) * len / 2;
        const x2 = r.x + Math.cos(r.angle) * len / 2;
        const y2 = r.y + Math.sin(r.angle) * len / 2;

        ctx.save();
        ctx.globalAlpha = r.alpha * 0.15;
        ctx.strokeStyle = r.color; ctx.lineWidth = r.width * 6;
        ctx.lineCap = "round"; ctx.shadowBlur = 20; ctx.shadowColor = r.color;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        ctx.globalAlpha = r.alpha; ctx.lineWidth = r.width; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        ctx.restore();

        if (frame % 8 === 0 && Math.random() > 0.4) {
          spawn(x1 + (Math.random() - 0.5) * 10, y1 + (Math.random() - 0.5) * 10, r.color);
          spawn(x2 + (Math.random() - 0.5) * 10, y2 + (Math.random() - 0.5) * 10, r.color);
        }

        const t = (Math.sin(r.phase * 3) + 1) / 2;
        ctx.save();
        ctx.globalAlpha = r.alpha * 0.9; ctx.fillStyle = r.color;
        ctx.shadowBlur = 15; ctx.shadowColor = r.color;
        ctx.beginPath(); ctx.arc(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, r.width * 2, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });

      if (frame % 3 === 0) spawn(Math.random() * W, Math.random() * H, COLORS[Math.floor(Math.random() * COLORS.length)]);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.shift();
        p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy *= 0.97;
        p.life++; p.alpha = 1 - p.life / p.maxLife;
        if (p.trail.length > 1) {
          ctx.save(); ctx.strokeStyle = p.color; ctx.lineWidth = p.size * 0.5; ctx.lineCap = "round";
          for (let t = 1; t < p.trail.length; t++) {
            ctx.globalAlpha = p.alpha * (t / p.trail.length) * 0.4;
            ctx.beginPath(); ctx.moveTo(p.trail[t-1].x, p.trail[t-1].y); ctx.lineTo(p.trail[t].x, p.trail[t].y); ctx.stroke();
          }
          ctx.restore();
        }
        ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
        ctx.shadowBlur = 8; ctx.shadowColor = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", setSize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none", display: "block" }} />
  );
}

export default function HeroBlock() {
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
      background: "#050505",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      overflow: "hidden",
      padding: "54px 40px 80px",
      minHeight: "100vh",
    }}>
      <QuantumCanvas />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: 900, width: "100%" }}>
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
            background: btnHover ? "rgba(0,240,255,0.1)" : "rgba(57,255,20,0.08)",
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