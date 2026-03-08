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
    color: "from-blue-500 to-indigo-600",
    time: "Сегодня в 10:22",
    text: "Всем привет! Рад быть здесь 👋",
  },
  {
    id: 2,
    author: "Анна",
    avatar: "А",
    color: "from-pink-500 to-rose-500",
    time: "Сегодня в 10:25",
    text: "Привет! Отличный форум, давно искала такое место для общения.",
  },
  {
    id: 3,
    author: "Михаил",
    avatar: "М",
    color: "from-green-500 to-teal-500",
    time: "Сегодня в 10:31",
    text: "Тут можно поднимать любые темы? Или есть ограничения?",
  },
  {
    id: 4,
    author: "Анна",
    avatar: "А",
    color: "from-pink-500 to-rose-500",
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
  { name: "Дмитрий", status: "В сети", avatar: "Д", color: "from-blue-500 to-indigo-600" },
  { name: "Анна", status: "Пишет сообщение...", avatar: "А", color: "from-pink-500 to-rose-500" },
  { name: "Михаил", status: "В сети", avatar: "М", color: "from-green-500 to-teal-500" },
];

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
    <div className="min-h-screen bg-[#36393f] text-white overflow-x-hidden">
      {/* Навигация */}
      <nav className="bg-[#2f3136] border-b border-[#202225] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#5865f2] rounded-full flex items-center justify-center">
              <Icon name="MessageSquare" size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Наш Форум</h1>
              <p className="text-xs text-[#b9bbbe] hidden sm:block">Сообщество и информация</p>
            </div>
          </div>

          {/* Вкладки — центр */}
          <div className="hidden sm:flex items-center bg-[#202225] rounded-lg p-1 gap-1">
            <button
              onClick={() => setActiveTab("discussion")}
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                activeTab === "discussion"
                  ? "bg-[#5865f2] text-white"
                  : "text-[#b9bbbe] hover:text-white hover:bg-[#36393f]"
              }`}
            >
              💬 Обсуждение
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                activeTab === "info"
                  ? "bg-[#5865f2] text-white"
                  : "text-[#b9bbbe] hover:text-white hover:bg-[#36393f]"
              }`}
            >
              📋 Информирование
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-[#b9bbbe] hover:text-white hover:bg-[#40444b]">
              <Search className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              className="sm:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t border-[#202225]">
            <div className="flex gap-2">
              <button
                onClick={() => { setActiveTab("discussion"); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded text-sm font-medium transition-all ${
                  activeTab === "discussion" ? "bg-[#5865f2] text-white" : "bg-[#40444b] text-[#b9bbbe]"
                }`}
              >
                💬 Обсуждение
              </button>
              <button
                onClick={() => { setActiveTab("info"); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded text-sm font-medium transition-all ${
                  activeTab === "info" ? "bg-[#5865f2] text-white" : "bg-[#40444b] text-[#b9bbbe]"
                }`}
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
          className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 bg-[#2f3136] flex flex-col flex-shrink-0`}
        >
          <div className="p-3 border-b border-[#202225] flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm truncate">
              {activeTab === "discussion" ? "💬 Обсуждение" : "📋 Информирование"}
            </h2>
            <Button
              variant="ghost"
              className="lg:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-1"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {currentFolders.map((folder) => (
              <div key={folder.id} className="mb-2">
                <button
                  className="w-full flex items-center gap-1 px-2 py-1.5 text-[#8e9297] text-xs font-semibold uppercase tracking-wide hover:text-[#dcddde] transition-colors"
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
                        className={`w-full flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
                          activeChannel === ch
                            ? "bg-[#393c43] text-white"
                            : "text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43]"
                        }`}
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

          {/* Пользователь снизу */}
          <div className="p-2 bg-[#292b2f] flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">Администратор</div>
              <div className="text-[#b9bbbe] text-xs truncate">Управление форумом</div>
            </div>
            <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-[#40444b]">
              <Settings className="w-3.5 h-3.5 text-[#b9bbbe]" />
            </Button>
          </div>
        </div>

        {/* Основная область */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Заголовок канала */}
          <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              className="lg:hidden text-[#8e9297] hover:text-[#dcddde] hover:bg-[#40444b] p-1 mr-1"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <Hash className="w-5 h-5 text-[#8e9297] flex-shrink-0" />
            <span className="text-white font-semibold">{activeChannel}</span>
            <div className="w-px h-5 bg-[#40444b] mx-2 hidden sm:block"></div>
            <span className="text-[#8e9297] text-sm hidden sm:block truncate">
              {activeTab === "discussion"
                ? "Общайтесь с участниками форума"
                : "Официальные посты администратора"}
            </span>
            <div className="ml-auto flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
              <Users className="w-5 h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
              <Search className="w-5 h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde] hidden sm:block" />
            </div>
          </div>

          {/* Контент */}
          {activeTab === "discussion" ? (
            <>
              {/* Чат */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Системное сообщение */}
                <div className="flex items-center gap-3 my-2">
                  <div className="h-px flex-1 bg-[#40444b]"></div>
                  <span className="text-[#72767d] text-xs">Начало канала #{activeChannel}</span>
                  <div className="h-px flex-1 bg-[#40444b]"></div>
                </div>

                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 group hover:bg-[#32353b] px-2 py-1 rounded transition-colors">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${msg.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <span className="text-white text-sm font-semibold">{msg.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-white font-semibold text-sm">{msg.author}</span>
                        <span className="text-[#72767d] text-xs">{msg.time}</span>
                      </div>
                      <p className="text-[#dcddde] text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Поле ввода */}
              <div className="p-4 flex-shrink-0">
                <div className="bg-[#40444b] rounded-lg flex items-center gap-3 px-4 py-3">
                  <button className="text-[#b9bbbe] hover:text-[#dcddde] transition-colors">
                    <Icon name="Plus" size={20} />
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Написать в #${activeChannel}`}
                    className="flex-1 bg-transparent text-[#dcddde] placeholder-[#72767d] text-sm outline-none"
                  />
                  <button className="text-[#b9bbbe] hover:text-[#5865f2] transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Посты информирования */
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Системное сообщение */}
              <div className="flex items-center gap-3 my-2">
                <div className="h-px flex-1 bg-[#40444b]"></div>
                <span className="text-[#72767d] text-xs">Официальные публикации</span>
                <div className="h-px flex-1 bg-[#40444b]"></div>
              </div>

              {infoPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#2f3136] border border-[#202225] rounded-lg p-4 hover:border-[#40444b] transition-colors"
                >
                  {/* Шапка поста */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-semibold text-sm">Администратор</span>
                        <span className="bg-[#5865f2] text-white text-xs px-1.5 py-0.5 rounded font-medium">Админ</span>
                        {post.pinned && (
                          <span className="flex items-center gap-1 text-[#faa61a] text-xs">
                            <Pin className="w-3 h-3" />
                            Закреплено
                          </span>
                        )}
                        <span className="text-[#72767d] text-xs ml-auto">{post.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Контент поста */}
                  <div className={post.pinned ? "border-l-4 border-[#5865f2] pl-4" : ""}>
                    <h3 className="text-white font-semibold mb-2">{post.title}</h3>
                    <p className="text-[#dcddde] text-sm leading-relaxed mb-3">{post.content}</p>

                    {post.type === "media" && (
                      <div
                        className={`rounded-lg flex items-center justify-center h-40 ${
                          post.mediaType === "photo"
                            ? "bg-gradient-to-br from-[#5865f2] to-[#7c3aed]"
                            : "bg-gradient-to-br from-[#3ba55c] to-[#2d7d46]"
                        }`}
                      >
                        {post.mediaType === "photo" ? (
                          <div className="flex flex-col items-center gap-2 text-white opacity-70">
                            <Image className="w-10 h-10" />
                            <span className="text-sm">Фото</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-white opacity-70">
                            <Video className="w-10 h-10" />
                            <span className="text-sm">Видео</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Реакции */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#40444b]">
                    {["👍", "❤️", "🔥"].map((emoji) => (
                      <button
                        key={emoji}
                        className="flex items-center gap-1 bg-[#36393f] hover:bg-[#5865f2] px-2 py-1 rounded-full text-sm transition-colors"
                      >
                        <span>{emoji}</span>
                        <span className="text-[#b9bbbe] text-xs">{Math.floor(Math.random() * 20) + 1}</span>
                      </button>
                    ))}
                    <button className="text-[#8e9297] hover:text-[#dcddde] text-sm px-2 py-1 rounded transition-colors">
                      + Добавить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Боковая панель участников */}
        <div className="hidden xl:flex w-56 bg-[#2f3136] flex-col flex-shrink-0">
          <div className="p-4 border-b border-[#202225]">
            <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
              В сети — {onlineUsers.length}
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {onlineUsers.map((user, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded hover:bg-[#36393f] cursor-pointer">
                <div className={`w-8 h-8 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative flex-shrink-0`}>
                  <span className="text-white text-sm font-semibold">{user.avatar}</span>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#2f3136] rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{user.name}</div>
                  <div className="text-[#b9bbbe] text-xs truncate">{user.status}</div>
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
