import { useEffect, useRef, useState } from "react";

const PAIN_ITEMS = [
  { icon: "💸", text: "Ты сливаешь бюджеты на дизайнеров, которые срывают дедлайны." },
  { icon: "🔐", text: "Тебя бесит танцевать с бубном вокруг VPN и криптокошельков, чтобы оплатить зарубежные сервисы." },
  { icon: "🤖", text: 'Ты открываешь ChatGPT, пишешь «сделай мне пост», получаешь роботизированный бред и закрываешь вкладку.' },
  { icon: "📉", text: "Пока ты сомневаешься, твои конкуренты уже генерируют контент бесплатно. Ты находишься в точке потери прибыли. Пора перерезать эти провода.", highlight: true },
];

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
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(57,255,20,0.03) 3px, rgba(57,255,20,0.03) 4px)",
        }} />
      )}
      <div style={{
        position: "absolute", top: 10, right: 12,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.6rem",
        color: hovered ? "var(--neon)" : "rgba(255,255,255,0.15)",
        letterSpacing: "0.1em",
        transition: "color 0.3s",
      }}>#{String(index + 1).padStart(2, "0")}</div>
      <div style={{
        fontSize: "2rem",
        marginBottom: 10,
        display: "inline-block",
        filter: hovered ? "drop-shadow(0 0 8px rgba(57,255,20,0.8))" : "none",
        transition: "filter 0.3s",
      }}>{curator.avatar}</div>
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

function PainSection() {
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

function SolutionSection() {
  return (
    <section id="solution" style={{ position: "relative", background: "#050505", padding: "100px 0 120px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "3.5rem", maxWidth: 720 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--neon-blue)", textTransform: "uppercase", marginBottom: "1.2rem", opacity: 0.8 }}>// БЛОК ЗАЩИТЫ ОТ СЛИВА</div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff", textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Почему ты не сольёшься<br />на полпути?{" "}
            <span style={{ color: "var(--neon)", textShadow: "0 0 24px rgba(57,255,20,0.5)" }}>Потому что<br />мы не дадим.</span>
          </h2>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
            Мы знаем, почему инфокурсы не работают. Ты остаёшься один на один с ошибкой «System Error». На нашем воркшопе всё иначе:
          </p>
        </div>

        <div className="perks-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "5rem" }}>
          {PERKS.map((p, i) => (
            <div key={i} style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))", border: "1px solid rgba(57,255,20,0.15)", borderRadius: 8, padding: "28px 24px", backdropFilter: "blur(8px)" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--neon)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.title}</div>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--neon)", textTransform: "uppercase", opacity: 0.8 }}>// 15 ИИ-СПЕЦНАЗОВЦЕВ — НАВЕДИ НА КАРТОЧКУ</div>
          <div style={{ flex: 1, height: "1px", background: "rgba(57,255,20,0.15)" }} />
        </div>

        <div className="curators-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
          {CURATORS.map((c, i) => <CuratorCard key={i} curator={c} index={i} />)}
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

export default function PainSolutionBlock() {
  return (
    <>
      <PainSection />
      <SolutionSection />
      <ArsenalSection />
      <ArchitectSection />
    </>
  );
}
