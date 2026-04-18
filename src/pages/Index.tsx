import { useEffect, useRef } from "react";

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
      <section className="hero" id="home">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-glow" />
        </div>
        <div className="hero-number">07</div>
        <div className="hero-content">
          <p className="hero-eyebrow">Студия визуальных решений</p>
          <h1 className="hero-title">
            Мы делаем
            <span>дерзкий</span>
            дизайн
          </h1>
          <p className="hero-subtitle">
            Создаём бренды, интерфейсы и digital-продукты, которые невозможно игнорировать.
          </p>
          <div className="hero-cta">
            <button className="btn-primary">
              <span>Начать проект</span>
            </button>
            <button className="btn-outline">
              Смотреть работы &nbsp;→
            </button>
          </div>
        </div>
      </section>

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
