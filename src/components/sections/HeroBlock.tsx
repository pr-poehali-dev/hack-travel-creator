import { useEffect, useRef, useState } from "react";

function ParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = canvas.width = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; color: string; life: number; max: number; tail: [number,number][] };
    const COLORS = ["#39ff14","#00f0ff","#ff003c","#b400ff","#ffffff","#ffdd00"];
    const ps: P[] = [];

    const add = (x: number, y: number, burst = false) => {
      const n = burst ? 12 : 1;
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? 1 + Math.random() * 4 : 0.3 + Math.random() * 1.2;
        ps.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: burst ? 1.5 + Math.random() * 3 : 1 + Math.random() * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 0, max: burst ? 80 + Math.random() * 60 : 120 + Math.random() * 80,
          tail: [],
        });
      }
    };

    // seed initial particles
    for (let i = 0; i < 40; i++) add(Math.random() * (W||1200), Math.random() * (H||700));

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.fillStyle = "rgba(5,5,5,0.15)";
      ctx.fillRect(0, 0, W, H);

      // spawn new
      if (frame % 4 === 0) add(Math.random() * W, Math.random() * H);
      // random burst
      if (frame % 90 === 0) add(Math.random() * W, Math.random() * H, true);

      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.tail.push([p.x, p.y]);
        if (p.tail.length > 10) p.tail.shift();
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.98; p.vy *= 0.98;
        p.life++;
        const a = 1 - p.life / p.max;

        // tail
        if (p.tail.length > 1) {
          ctx.save();
          for (let t = 1; t < p.tail.length; t++) {
            ctx.globalAlpha = a * (t / p.tail.length) * 0.5;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = p.r * 0.4;
            ctx.shadowBlur = 6; ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.moveTo(p.tail[t-1][0], p.tail[t-1][1]);
            ctx.lineTo(p.tail[t][0], p.tail[t][1]);
            ctx.stroke();
          }
          ctx.restore();
        }

        // dot
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12; ctx.shadowColor = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        if (p.life >= p.max) ps.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

export default function HeroBlock() {
  const [btnHover, setBtnHover] = useState(false);
  const glitchRef = useRef<HTMLHeadingElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const s = sectionRef.current;
    if (s) {
      const cs = window.getComputedStyle(s);
      console.log("HOME computed paddingTop:", cs.paddingTop);
      console.log("HOME computed marginTop:", cs.marginTop);
      console.log("HOME getBoundingClientRect top:", s.getBoundingClientRect().top);
    }
  }, []);

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
    <section id="home" ref={sectionRef} style={{
      position: "relative",
      background: "red",
      overflow: "hidden",
      padding: "0 40px 80px",
    }}>
      <ParticlesBg />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: 900, width: "100%", paddingTop: "58px" }}>
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