import { useState } from "react";

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
      {hovered && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(57,255,20,0.03) 3px, rgba(57,255,20,0.03) 4px)" }} />
      )}
      <div style={{ position: "absolute", top: 10, right: 12, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: hovered ? "var(--neon)" : "rgba(255,255,255,0.15)", letterSpacing: "0.1em", transition: "color 0.3s" }}>
        #{String(index + 1).padStart(2, "0")}
      </div>
      <div style={{ fontSize: "2rem", marginBottom: 10, display: "inline-block", filter: hovered ? "drop-shadow(0 0 8px rgba(57,255,20,0.8))" : "none", transition: "filter 0.3s" }}>
        {curator.avatar}
      </div>
      {hovered && (
        <span style={{ position: "absolute", top: 14, left: 14, fontSize: "0.9rem", animation: "glasses-glow 0.4s ease forwards" }}>🕶️</span>
      )}
      <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: hovered ? "#fff" : "rgba(255,255,255,0.75)", marginBottom: 6, transition: "color 0.3s" }}>
        {curator.name}
      </div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "var(--neon)", lineHeight: 1.5, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "all 0.3s ease" }}>
        ⚡ {curator.power}
      </div>
    </div>
  );
}

export default function SolutionSection() {
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
