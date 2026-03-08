import { useState } from "react";
import {
  Hash,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Image,
  Video,
  Pin,
  Send,
  Shield,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

type Tab = "discussion" | "info";

const folders = {
  discussion: [
    {
      id: "general",
      name: "Общее",
      channels: ["общий-чат", "знакомства", "вопросы"],
    },
    {
      id: "topics",
      name: "Темы",
      channels: ["идеи", "предложения", "обратная-связь"],
    },
    {
      id: "offtop",
      name: "Офф-топ",
      channels: ["юмор", "жизнь", "разное"],
    },
  ],
  info: [
    {
      id: "announcements",
      name: "Объявления",
      channels: ["новости", "обновления", "события"],
    },
    {
      id: "media",
      name: "Медиа",
      channels: ["фото", "видео"],
    },
    {
      id: "rules",
      name: "Правила",
      channels: ["правила-форума", "инструкции"],
    },
  ],
};

const chatMessages = [
  {
    id: 1,
    author: "Дмитрий",
    avatar: "Д",
    color: "from-emerald-700 to-teal-800",
    time: "Сегодня в 10:22",
    text: "Всем привет! Рад быть здесь 👋",
  },
  {
    id: 2,
    author: "Анна",
    avatar: "А",
    color: "from-lime-700 to-green-800",
    time: "Сегодня в 10:25",
    text: "Привет! Отличный форум, давно искала такое место для общения.",
  },
  {
    id: 3,
    author: "Михаил",
    avatar: "М",
    color: "from-amber-700 to-yellow-800",
    time: "Сегодня в 10:31",
    text: "Тут можно поднимать любые темы? Или есть ограничения?",
  },
  {
    id: 4,
    author: "Анна",
    avatar: "А",
    color: "from-lime-700 to-green-800",
    time: "Сегодня в 10:33",
    text: "Правила есть в разделе Информирование, там всё расписано 📋",
  },
];

const infoPosts = [
  {
    id: 1,
    type: "text",
    title: "Добро пожаловать на форум!",
    content:
      "Рады приветствовать вас в нашем сообществе. Здесь вы найдёте актуальную информацию, новости и сможете общаться с другими участниками. Соблюдайте правила и уважайте друг друга.",
    time: "Вчера в 18:00",
    pinned: true,
  },
  {
    id: 2,
    type: "text",
    title: "Обновление правил форума",
    content:
      "Мы обновили правила поведения. Теперь запрещается публикация спама и оскорбительного контента. Нарушители будут заблокированы.",
    time: "Сегодня в 09:00",
    pinned: false,
  },
  {
    id: 3,
    type: "media",
    title: "Фото с последнего события",
    content: "Делимся фотографиями с нашей встречи! Было здорово пообщаться вживую.",
    time: "Сегодня в 11:30",
    pinned: false,
    mediaType: "photo",
  },
  {
    id: 4,
    type: "media",
    title: "Видео-обращение администратора",
    content: "Короткое видео с важными новостями для всех участников форума.",
    time: "Сегодня в 12:00",
    pinned: false,
    mediaType: "video",
  },
];

const onlineUsers = [
  { name: "Дмитрий", status: "В сети", avatar: "Д", color: "from-emerald-700 to-teal-800" },
  { name: "Анна", status: "Пишет сообщение...", avatar: "А", color: "from-lime-700 to-green-800" },
  { name: "Михаил", status: "В сети", avatar: "М", color: "from-amber-700 to-yellow-800" },
];

// Палитра фэнтезийного леса
// bg-deep:    #1a2318  — тёмная чаща
// bg-dark:    #1f2d1e  — ночной лес
// bg-mid:     #263525  — подлесок
// bg-light:   #2e3f2c  — поляна в тени
// bg-hover:   #364a33  — светлая поляна
// accent:     #5a9e47  — магический зелёный
// accent-h:   #4a8939  — глубже в лес
// text-dim:   #7a9e74  — туман
// text-muted: #a3c49b  — листва
// text-main:  #d4edcc  — лунный свет
// gold:       #c8a84b  — эльфийское золото
// online:     #4caf72  — светлячок

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("discussion");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    general: true,
    announcements: true,
    media: true,
  });
  const [activeChannel, setActiveChannel] = useState("общий-чат");
  const [messageText, setMessageText] = useState("");

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentFolders = folders[activeTab];

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: "#1a2318" }}>
      {/* Навигация */}
      <nav className="border-b px-4 sm:px-6 py-3" style={{ background: "#1f2d1e", borderColor: "#141c13" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#5a9e47" }}>
              <Icon name="MessageSquare" size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: "#d4edcc" }}>Наш Форум</h1>
              <p className="text-xs hidden sm:block" style={{ color: "#7a9e74" }}>Сообщество и информация</p>
            </div>
          </div>

          {/* Вкладки */}
          <div className="hidden sm:flex items-center rounded-lg p-1 gap-1" style={{ background: "#141c13" }}>
            <button
              onClick={() => setActiveTab("discussion")}
              className="px-4 py-2 rounded text-sm font-medium transition-all"
              style={
                activeTab === "discussion"
                  ? { background: "#5a9e47", color: "#fff" }
                  : { color: "#7a9e74" }
              }
            >
              💬 Обсуждение
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className="px-4 py-2 rounded text-sm font-medium transition-all"
              style={
                activeTab === "info"
                  ? { background: "#5a9e47", color: "#fff" }
                  : { color: "#7a9e74" }
              }
            >
              📋 Информирование
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex" style={{ color: "#7a9e74" }}>
              <Search className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              className="sm:hidden p-2"
              style={{ color: "#7a9e74" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t" style={{ borderColor: "#141c13" }}>
            <div className="flex gap-2">
              <button
                onClick={() => { setActiveTab("discussion"); setMobileMenuOpen(false); }}
                className="flex-1 py-2 rounded text-sm font-medium transition-all"
                style={activeTab === "discussion" ? { background: "#5a9e47", color: "#fff" } : { background: "#2e3f2c", color: "#7a9e74" }}
              >
                💬 Обсуждение
              </button>
              <button
                onClick={() => { setActiveTab("info"); setMobileMenuOpen(false); }}
                className="flex-1 py-2 rounded text-sm font-medium transition-all"
                style={activeTab === "info" ? { background: "#5a9e47", color: "#fff" } : { background: "#2e3f2c", color: "#7a9e74" }}
              >
                📋 Информирование
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Основной макет */}
      <div className="flex" style={{ height: "calc(100vh - 61px)" }}>
        {/* Боковая панель с папками */}
        <div
          className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 flex flex-col flex-shrink-0`}
          style={{ background: "#1f2d1e" }}
        >
          <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: "#141c13" }}>
            <h2 className="font-semibold text-sm truncate" style={{ color: "#d4edcc" }}>
              {activeTab === "discussion" ? "💬 Обсуждение" : "📋 Информирование"}
            </h2>
            <Button
              variant="ghost"
              className="lg:hidden p-1"
              style={{ color: "#7a9e74" }}
              onClick={() => setMobileSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {currentFolders.map((folder) => (
              <div key={folder.id} className="mb-2">
                <button
                  className="w-full flex items-center gap-1 px-2 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors"
                  style={{ color: "#7a9e74" }}
                  onClick={() => toggleFolder(folder.id)}
                >
                  {openFolders[folder.id] ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                  <span>{folder.name}</span>
                </button>

                {openFolders[folder.id] && (
                  <div className="mt-0.5 space-y-0.5">
                    {folder.channels.map((ch) => (
                      <button
                        key={ch}
                        onClick={() => { setActiveChannel(ch); setMobileSidebarOpen(false); }}
                        className="w-full flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors"
                        style={
                          activeChannel === ch
                            ? { background: "#2e3f2c", color: "#d4edcc" }
                            : { color: "#7a9e74" }
                        }
                      >
                        {activeTab === "discussion" ? (
                          <Hash className="w-4 h-4 flex-shrink-0" />
                        ) : ch === "фото" ? (
                          <Image className="w-4 h-4 flex-shrink-0" />
                        ) : ch === "видео" ? (
                          <Video className="w-4 h-4 flex-shrink-0" />
                        ) : (
                          <FileText className="w-4 h-4 flex-shrink-0" />
                        )}
                        <span className="truncate">{ch}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Администратор снизу */}
          <div className="p-2 flex items-center gap-2" style={{ background: "#1a2318" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#5a9e47" }}>
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate" style={{ color: "#d4edcc" }}>Администратор</div>
              <div className="text-xs truncate" style={{ color: "#7a9e74" }}>Управление форумом</div>
            </div>
            <Button variant="ghost" size="sm" className="w-7 h-7 p-0">
              <Settings className="w-3.5 h-3.5" style={{ color: "#7a9e74" }} />
            </Button>
          </div>
        </div>

        {/* Основная область */}
        <div className="flex-1 flex flex-col min-w-0" style={{ background: "#1a2318" }}>
          {/* Заголовок канала */}
          <div className="h-12 border-b flex items-center px-4 gap-2 flex-shrink-0" style={{ background: "#1a2318", borderColor: "#141c13" }}>
            <Button
              variant="ghost"
              className="lg:hidden p-1 mr-1"
              style={{ color: "#7a9e74" }}
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <Hash className="w-5 h-5 flex-shrink-0" style={{ color: "#7a9e74" }} />
            <span className="font-semibold" style={{ color: "#d4edcc" }}>{activeChannel}</span>
            <div className="w-px h-5 mx-2 hidden sm:block" style={{ background: "#2e3f2c" }}></div>
            <span className="text-sm hidden sm:block truncate" style={{ color: "#7a9e74" }}>
              {activeTab === "discussion"
                ? "Общайтесь с участниками форума"
                : "Официальные посты администратора"}
            </span>
            <div className="ml-auto flex items-center gap-3">
              <Bell className="w-5 h-5 cursor-pointer" style={{ color: "#7a9e74" }} />
              <Users className="w-5 h-5 cursor-pointer" style={{ color: "#7a9e74" }} />
              <Search className="w-5 h-5 cursor-pointer hidden sm:block" style={{ color: "#7a9e74" }} />
            </div>
          </div>

          {activeTab === "discussion" ? (
            <>
              {/* Чат */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-center gap-3 my-2">
                  <div className="h-px flex-1" style={{ background: "#2e3f2c" }}></div>
                  <span className="text-xs" style={{ color: "#7a9e74" }}>Начало канала #{activeChannel}</span>
                  <div className="h-px flex-1" style={{ background: "#2e3f2c" }}></div>
                </div>

                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 group px-2 py-1 rounded transition-colors hover:bg-[#1f2d1e]">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${msg.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <span className="text-white text-sm font-semibold">{msg.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-semibold text-sm" style={{ color: "#d4edcc" }}>{msg.author}</span>
                        <span className="text-xs" style={{ color: "#7a9e74" }}>{msg.time}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#a3c49b" }}>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Поле ввода */}
              <div className="p-4 flex-shrink-0">
                <div className="rounded-lg flex items-center gap-3 px-4 py-3" style={{ background: "#2e3f2c" }}>
                  <button style={{ color: "#7a9e74" }}>
                    <Icon name="Plus" size={20} />
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Написать в #${activeChannel}`}
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: "#d4edcc" }}
                  />
                  <button style={{ color: "#5a9e47" }}>
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Посты */
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex items-center gap-3 my-2">
                <div className="h-px flex-1" style={{ background: "#2e3f2c" }}></div>
                <span className="text-xs" style={{ color: "#7a9e74" }}>Официальные публикации</span>
                <div className="h-px flex-1" style={{ background: "#2e3f2c" }}></div>
              </div>

              {infoPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg p-4 transition-colors"
                  style={{ background: "#1f2d1e", border: "1px solid #263525" }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#5a9e47" }}>
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm" style={{ color: "#d4edcc" }}>Администратор</span>
                        <span className="text-xs px-1.5 py-0.5 rounded font-medium text-white" style={{ background: "#5a9e47" }}>Админ</span>
                        {post.pinned && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: "#c8a84b" }}>
                            <Pin className="w-3 h-3" />
                            Закреплено
                          </span>
                        )}
                        <span className="text-xs ml-auto" style={{ color: "#7a9e74" }}>{post.time}</span>
                      </div>
                    </div>
                  </div>

                  <div style={post.pinned ? { borderLeft: "4px solid #5a9e47", paddingLeft: "1rem" } : {}}>
                    <h3 className="font-semibold mb-2" style={{ color: "#d4edcc" }}>{post.title}</h3>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "#a3c49b" }}>{post.content}</p>

                    {post.type === "media" && (
                      <div
                        className="rounded-lg flex items-center justify-center h-40"
                        style={{
                          background:
                            post.mediaType === "photo"
                              ? "linear-gradient(135deg, #3a6b2a, #5a9e47)"
                              : "linear-gradient(135deg, #2d5a1e, #4a8939)",
                        }}
                      >
                        {post.mediaType === "photo" ? (
                          <div className="flex flex-col items-center gap-2 text-white opacity-80">
                            <Image className="w-10 h-10" />
                            <span className="text-sm">Фото</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-white opacity-80">
                            <Video className="w-10 h-10" />
                            <span className="text-sm">Видео</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #2e3f2c" }}>
                    {["👍", "❤️", "🌿"].map((emoji) => (
                      <button
                        key={emoji}
                        className="flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-colors hover:opacity-80"
                        style={{ background: "#263525" }}
                      >
                        <span>{emoji}</span>
                        <span className="text-xs" style={{ color: "#7a9e74" }}>{Math.floor(Math.random() * 20) + 1}</span>
                      </button>
                    ))}
                    <button className="text-sm px-2 py-1 rounded transition-colors" style={{ color: "#7a9e74" }}>
                      + Добавить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Онлайн-участники */}
        <div className="hidden xl:flex w-56 flex-col flex-shrink-0" style={{ background: "#1f2d1e" }}>
          <div className="p-4 border-b" style={{ borderColor: "#141c13" }}>
            <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#7a9e74" }}>
              В сети — {onlineUsers.length}
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {onlineUsers.map((user, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded cursor-pointer transition-colors hover:bg-[#263525]">
                <div className={`w-8 h-8 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative flex-shrink-0`}>
                  <span className="text-white text-sm font-semibold">{user.avatar}</span>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 rounded-full" style={{ background: "#4caf72", borderColor: "#1f2d1e" }}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "#d4edcc" }}>{user.name}</div>
                  <div className="text-xs truncate" style={{ color: "#7a9e74" }}>{user.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
