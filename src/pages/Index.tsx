import { useState } from "react";

function BottleButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://t.me/BuhoyVL_bot"
      target="_blank"
      rel="noopener noreferrer"
      title="Бутылка бесплатно при заказе тура!"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        textDecoration: "none",
        filter: hovered ? "drop-shadow(0 0 18px rgba(37,99,235,0.7))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.25))",
        transform: hovered ? "scale(1.08) translateY(-4px)" : "scale(1)",
        transition: "all 0.25s cubic-bezier(.34,1.56,.64,1)",
      }}
    >
      {/* Пузырёк с текстом */}
      <div
        style={{
          background: hovered ? "#1d4ed8" : "#2563eb",
          color: "#fff",
          fontSize: "11px",
          fontWeight: 700,
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
          lineHeight: 1.3,
          padding: "8px 12px",
          borderRadius: "12px",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 8px rgba(37,99,235,0.4)",
          position: "relative",
          transition: "background 0.2s",
        }}
      >
        🍾 БУТЫЛКА БЕСПЛАТНО
        <br />
        <span style={{ fontWeight: 400, opacity: 0.9 }}>при заказе тура</span>
        {/* Хвостик пузырька */}
        <div style={{
          position: "absolute",
          bottom: "-7px",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "7px solid transparent",
          borderRight: "7px solid transparent",
          borderTop: `7px solid ${hovered ? "#1d4ed8" : "#2563eb"}`,
          transition: "border-top-color 0.2s",
        }} />
      </div>

      {/* SVG Бутылка */}
      <svg
        width="54"
        height="110"
        viewBox="0 0 54 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Горлышко */}
        <rect x="19" y="0" width="16" height="6" rx="3" fill="#a3c4f3" />
        <rect x="17" y="6" width="20" height="4" rx="2" fill="#93b4e8" />
        {/* Переход */}
        <path d="M17 10 Q8 24 8 34 L8 90 Q8 102 27 102 Q46 102 46 90 L46 34 Q46 24 37 10 Z" fill={hovered ? "#3b82f6" : "#2563eb"} style={{ transition: "fill 0.2s" }} />
        {/* Блик */}
        <path d="M15 30 Q11 40 11 55 L11 80" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round" />
        {/* Жидкость */}
        <clipPath id="bottle-clip">
          <path d="M17 10 Q8 24 8 34 L8 90 Q8 102 27 102 Q46 102 46 90 L46 34 Q46 24 37 10 Z" />
        </clipPath>
        <rect x="8" y="48" width="38" height="54" fill={hovered ? "#60a5fa" : "#3b82f6"} clipPath="url(#bottle-clip)" style={{ transition: "fill 0.2s" }} />
        {/* Пузырьки в жидкости */}
        <circle cx="20" cy="72" r="2.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="33" cy="85" r="1.8" fill="rgba(255,255,255,0.25)" />
        <circle cx="26" cy="95" r="1.5" fill="rgba(255,255,255,0.2)" />
        {/* Этикетка */}
        <rect x="13" y="56" width="28" height="20" rx="4" fill="rgba(255,255,255,0.18)" />
        <text x="27" y="68" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="Inter,sans-serif">TOUR</text>
        {/* Дно */}
        <ellipse cx="27" cy="101" rx="19" ry="4" fill="#1d4ed8" opacity="0.6" />
      </svg>
    </a>
  );
}

const REVIEWS = [
  {
    initials: "АМ",
    gradient: "from-blue-400 to-purple-500",
    stars: 5,
    text: "Впервые поехала одна на Дальний Восток. ИИ расписал каждый шаг, я сэкономила около 20 тысяч на экскурсиях! Очень круто, что маршрут легко подстраивается под погоду прямо в телефоне.",
    name: "Анна М.",
    sub: "Маршрут на 7 дней",
  },
  {
    initials: "СВ",
    gradient: "from-green-400 to-teal-500",
    stars: 5,
    text: "Купил гайд по гастротуру. Очень удобно, все точки кликабельны и сразу открываются в навигаторе Яндекс. Сэкономил кучу времени на поиске нормальных мест для ужина с женой.",
    name: "Сергей В.",
    sub: "Покупатель PDF-гайда",
  },
];

const GUIDES = [
  {
    img: "https://images.unsplash.com/photo-1590418389658-0051e5e542cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "5 дней",
    tags: [
      { label: "Природа", cls: "bg-blue-100 text-blue-800" },
      { label: "Сложность: Средняя", cls: "bg-gray-100 text-gray-600" },
    ],
    title: "Морские волки: По диким бухтам Приморья",
    desc: "Детальный план самостоятельной поездки. Включает сложную навигацию по бухтам, точный список снаряжения и проверенные точки аренды сапов и катеров.",
    oldPrice: "2 000 ₽",
    price: "990 ₽",
  },
  {
    img: "https://images.unsplash.com/photo-1582260656828-56ba361f67f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Уикенд",
    tags: [
      { label: "Гастро", cls: "bg-orange-100 text-orange-800" },
      { label: "Город", cls: "bg-purple-100 text-purple-800" },
    ],
    title: "Азиатский Владивосток: Гастротур",
    desc: "Отдых со вкусом. Секретные чифаньки «для своих», лучшие рестораны с морепродуктами и видовые площадки, о которых не пишут в путеводителях.",
    oldPrice: "1 000 ₽",
    price: "500 ₽",
  },
];

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      <BottleButton />
      {/* Navbar */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-blue-600 tracking-tight">Хакни Маршрут</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#hero-ai" className="hover:text-blue-600 font-medium transition">ИИ-Планировщик</a>
            <a href="#how-it-works" className="hover:text-blue-600 font-medium transition">Как это работает</a>
            <a href="#routes" className="hover:text-blue-600 font-medium transition">Гайды</a>
            <a href="#social-proof" className="hover:text-blue-600 font-medium transition">Отзывы</a>
          </nav>
          <a
            href="#lead-magnet"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Начать бесплатно
          </a>
        </div>
      </header>

      {/* Hero */}
      <section
        id="hero-ai"
        className="min-h-screen flex items-center pt-20"
        style={{
          background:
            "linear-gradient(rgba(15,23,42,0.7),rgba(15,23,42,0.7)), url('https://images.unsplash.com/photo-1629163353347-7925c04b5003?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover no-repeat",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <span className="inline-block bg-blue-500/20 border border-blue-400/30 backdrop-blur-md text-blue-100 text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6">
            🚀 Будущее самостоятельного туризма
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Спланируй идеальное<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              путешествие за 2 минуты
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 drop-shadow-md">
            Введи свои интересы, бюджет и даты — наша нейросеть соберет логичный маршрут, найдет билеты и подскажет секретные локации Приморья и мира.
          </p>

          <div className="max-w-4xl mx-auto bg-white p-2.5 rounded-full flex flex-col md:flex-row shadow-2xl items-center focus-within:ring-4 focus-within:ring-blue-500/30 transition-all">
            <div className="pl-6 text-2xl">✨</div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Хочу на 3 дня во Владивосток, бюджет 50к, люблю морепродукты и маяки..."
              className="flex-grow px-4 py-4 text-gray-800 bg-transparent focus:outline-none text-lg w-full placeholder-gray-400"
            />
            <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-md whitespace-nowrap mt-2 md:mt-0">
              Сгенерировать маршрут
            </button>
          </div>

          <div className="mt-8 text-sm opacity-70 flex flex-wrap justify-center gap-6">
            <span>✓ Без регистрации</span>
            <span>✓ 100% бесплатно для старта</span>
            <span>✓ Интеграция с картами</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
            Почему самостоятельный туризм — это просто?
          </h2>
          <p className="text-gray-500 mb-16 max-w-2xl mx-auto text-lg">
            Забудьте про скучные пакетные туры. С нашим подходом вы сами контролируете каждую минуту своего времени.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "🧠",
                title: "Умная логистика",
                desc: "ИИ учитывает реальное расписание транспорта и физически не предложит места, до которых невозможно добраться за один день.",
              },
              {
                icon: "🗺️",
                title: "Без банальщины",
                desc: "Обходим стандартные туристические ловушки. Только по-настоящему интересные, скрытые локации от местных экспертов.",
              },
              {
                icon: "💰",
                title: "Прозрачный бюджет",
                desc: "Точный расчет всех затрат до копейки: от такси до ужина в ресторане. Вы точно знаете, сколько потратите.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 group"
              >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routes / Guides */}
      <section id="routes" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Эксклюзив</span>
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Или выбери готовые авторские гайды</h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto text-lg">
            Пошаговые PDF-инструкции с интерактивными картами и лайфхаками от создателей школы «Хакни Нейросети».
          </p>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto text-left">
            {GUIDES.map((g) => (
              <div
                key={g.title}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
              >
                <div className="relative h-72">
                  <img src={g.img} alt={g.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-gray-900 shadow-sm">
                    {g.badge}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {g.tags.map((t) => (
                      <span key={t.label} className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${t.cls}`}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{g.title}</h3>
                  <p className="text-gray-600 mb-8 flex-grow">{g.desc}</p>
                  <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-gray-400 line-through text-sm">{g.oldPrice}</span>
                      <span className="text-3xl font-extrabold text-gray-900">{g.price}</span>
                    </div>
                    <button className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-600 transition shadow-md">
                      Купить гайд
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="social-proof" className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-16 text-gray-900">Уже путешествуют с нами</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="p-8 border border-gray-100 rounded-3xl shadow-sm bg-gray-50 relative"
              >
                <div className="absolute top-6 right-8 text-6xl text-gray-200 font-serif opacity-50">"</div>
                <div className="text-yellow-400 mb-4 text-xl tracking-widest">
                  {"★".repeat(r.stars)}
                </div>
                <p className="text-gray-700 italic mb-8 text-lg relative z-10">{r.text}</p>
                <div className="flex items-center">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${r.gradient} rounded-full mr-4 flex items-center justify-center text-white font-bold text-xl shadow-inner`}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{r.name}</div>
                    <div className="text-gray-500 text-sm">{r.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section id="lead-magnet" className="py-24 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Сомневаетесь, куда поехать?</h2>
          <p className="mb-12 max-w-2xl mx-auto text-xl opacity-90 leading-relaxed">
            Оставьте email, и мы пришлем бесплатный PDF-чек-лист<br />
            <span className="font-bold bg-white/20 px-2 py-1 rounded">
              «Топ-10 ошибок самостоятельного туриста в 2026 году»
            </span>
          </p>

          {submitted ? (
            <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-2xl text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Готово!</h3>
              <p className="text-gray-600">Мы отправим чек-лист на ваш email в течение нескольких минут.</p>
            </div>
          ) : (
            <form
              className="max-w-md mx-auto flex flex-col space-y-4 bg-white p-10 rounded-3xl shadow-2xl"
              onSubmit={handleLeadSubmit}
            >
              <div className="text-left">
                <label className="text-gray-700 text-sm font-bold mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl text-gray-800 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div className="text-left mb-2">
                <label className="text-gray-700 text-sm font-bold mb-2 block">Ваш E-mail</label>
                <input
                  type="email"
                  placeholder="ivan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl text-gray-800 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition shadow-lg text-lg transform hover:-translate-y-1 mt-4"
              >
                Получить чек-лист 🎁
              </button>
              <div className="text-xs text-gray-400 mt-4 text-center leading-tight">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="#" className="underline hover:text-gray-600">политикой конфиденциальности</a>{" "}
                и обработкой персональных данных.
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 text-center border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-3xl font-extrabold text-white mb-6 tracking-tight">Хакни Маршрут</div>
          <p className="mb-8 max-w-md mx-auto text-sm">
            Проект школы «Хакни Нейросети». Создаем технологии, которые делают путешествия доступными и интересными.
          </p>
          <div className="mb-8 text-sm">© 2026 ИП Черников С.Н. ОГРНИП 321253600091137.</div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm">
            <a href="#" className="hover:text-white transition">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition">Договор оферты</a>
            <a href="#" className="hover:text-white transition">Связаться с нами</a>
          </div>
        </div>
      </footer>
    </div>
  );
}