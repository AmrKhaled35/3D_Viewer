import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  ArrowLeft,
  Bot,
  Sparkles,
  Zap,
  Brain,
  MessageCircle,
  Star,
  Volume2,
  Copy,
  Maximize2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface StoryPage {
  id: number;
  illustration: string;
  text: string;
}

// ============ DJANGO BACKEND INTEGRATION ============
// قم بفك التعليق عن الكود التالي عند الربط مع Django Backend

// const DJANGO_API_URL = 'http://localhost:8000/api'; // غير الرابط حسب عنوان السيرفر

// ============ END DJANGO BACKEND INTEGRATION ============

// بيانات تجريبية - سيتم استبدالها بالبيانات القادمة من الباك اند
const previewStoryPages: StoryPage[] = [
  {
    id: 1,
    illustration:
      "https://scitechdaily.com/images/Solar-Wind-and-Earth-Magnetosphere.jpg",
    text: "The Sun is the engine of space weather. It constantly releases streams of charged particles and bursts of energy that travel across the solar system",
  },
  {
    id: 2,
    illustration:
      "https://tse4.mm.bing.net/th/id/OIP.oujw2Si_ALMqy53u2su9RAHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    text: "Solar wind is a continuous flow of charged particles from the Sun. It shapes the magnetic environment of planets and can disturb Earth’s protective shield",
  },
];

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [previewPage, setPreviewPage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ============ DJANGO BACKEND INTEGRATION ============
  // State للقصة القادمة من الباك اند
  // const [storyPages, setStoryPages] = useState<StoryPage[]>([]);
  // ============ END DJANGO BACKEND INTEGRATION ============

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ============ DJANGO BACKEND INTEGRATION ============
  // دالة لإرسال الرسالة إلى Django Backend والحصول على الرد
  // const sendMessageToBackend = async (userMessage: string) => {
  //   try {
  //     const response = await fetch(`${DJANGO_API_URL}/chat/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         message: userMessage,
  //       }),
  //     });
  //
  //     const data = await response.json();
  //
  //     // البيانات المتوقعة من الباك اند:
  //     // {
  //     //   response: "رد البوت",
  //     //   story_pages: [
  //     //     { id: 1, illustration: "url", text: "text" },
  //     //     { id: 2, illustration: "url", text: "text" }
  //     //   ]
  //     // }
  //
  //     return data;
  //   } catch (error) {
  //     console.error('Error sending message to backend:', error);
  //     return null;
  //   }
  // };
  // ============ END DJANGO BACKEND INTEGRATION ============

  const simulateAIResponse = (): string => {
    const responses = [
      "That is a fascinating question! Space weather describes how solar activity, like solar flares and coronal mass ejections, affects the space environment around Earth.",
      "Great question! Solar wind is a continuous stream of charged particles from the Sun that can disturb Earth's magnetic field and create geomagnetic storms.",
      "Excellent inquiry! Auroras are one of the most visible effects of space weather. They appear when solar particles collide with Earth's atmosphere near the poles.",
      "Wonderful question! Space weather is important to study because it can impact satellites, astronauts, power grids, and communication systems on Earth.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    if (!isActive) {
      setTimeout(() => setIsActive(true), 400);
    }
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    const userMessageText = inputText;
    setInputText("");
    setIsTyping(true);

    // ============ DJANGO BACKEND INTEGRATION ============
    // استخدم هذا الكود عند الربط مع الباك اند
    // sendMessageToBackend(userMessageText).then((data) => {
    //   if (data) {
    //     const aiMessage: Message = {
    //       id: messages.length + 2,
    //       text: data.response,
    //       isUser: false,
    //       timestamp: new Date(),
    //     };
    //     setMessages((prev) => [...prev, aiMessage]);
    //
    //     // تحديث صفحات القصة بالبيانات القادمة من الباك اند
    //     if (data.story_pages && data.story_pages.length > 0) {
    //       setStoryPages(data.story_pages);
    //       setPreviewPage(0); // إعادة تعيين الصفحة للصفحة الأولى
    //     }
    //
    //     setIsTyping(false);
    //   } else {
    //     // في حالة حدوث خطأ، عرض رسالة خطأ
    //     const errorMessage: Message = {
    //       id: messages.length + 2,
    //       text: "Sorry, something went wrong. Please try again.",
    //       isUser: false,
    //       timestamp: new Date(),
    //     };
    //     setMessages((prev) => [...prev, errorMessage]);
    //     setIsTyping(false);
    //   }
    // });
    // ============ END DJANGO BACKEND INTEGRATION ============

    // الكود التجريبي الحالي - احذف هذا الجزء عند الربط مع الباك اند
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: simulateAIResponse(),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestions = [
    {
      text: "Explain what space weather is and how it affects Earth",
      icon: <Zap className="w-4 h-4" />,
    },
    { text: "Tell me about black holes", icon: <Star className="w-4 h-4" /> },
    { text: "What is a supernova?", icon: <Brain className="w-4 h-4" /> },
    { text: "How do planets form?", icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {Array.from({ length: 100 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.2;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: size + "px",
              height: size + "px",
              top: top + "%",
              left: left + "%",
              opacity: opacity,
            }}
          />
        );
      })}

      <div className="relative z-10 bg-black/90 backdrop-blur-xl border-b border-blue-400/30 p-4">
        <div className="flex items-center max-w-full">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-xl hover:bg-blue-500/20 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-3">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className="text-xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                AI Learning Assistant
              </h1>
              <p
                className="text-sm text-blue-400 font-medium"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Interactive Story Visualization
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-50">
        {!isActive ? (
          <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 overflow-auto">
            <div className="text-center w-full max-w-4xl mx-auto">
              <div className="relative mt-32 sm:mt-40">
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-snug sm:leading-tight"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    textShadow: "0 0 30px rgba(100, 200, 255, 0.6)",
                  }}
                >
                  Ask Anything, Learn Everything
                </h2>
                <p
                  className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto font-light"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Experience the future of learning with our AI-powered
                  assistant. Get instant answers with interactive story
                  visualizations.
                </p>
              </div>

              <div className="relative mb-8 sm:mb-12 w-full max-w-2xl mx-auto">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="What would you like to learn today?"
                    className="w-full bg-white/10 backdrop-blur-sm border-2 border-blue-400/30 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-all duration-300 text-sm sm:text-lg font-medium pr-14 sm:pr-16"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl p-2 sm:p-3 transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 w-full max-w-4xl mx-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputText(suggestion.text);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="group bg-white/5 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-4 sm:p-6 text-left hover:bg-blue-500/20 transition-all duration-500 hover:scale-105 hover:border-blue-400/50"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="p-2 sm:p-3 bg-blue-500/30 rounded-xl mr-2 sm:mr-3 group-hover:bg-blue-500/50 transition-colors">
                        {suggestion.icon}
                      </div>
                      <div className="w-full h-px bg-blue-400/30" />
                    </div>
                    <p className="text-white font-semibold text-sm sm:text-lg mb-1 sm:mb-2">
                      {suggestion.text}
                    </p>
                    <p className="text-white/60 text-xs sm:text-sm">
                      Interactive story visualization included
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col-reverse md:flex-row transition-all duration-500 h-auto sm:h-screen">
            {/* CHAT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-start space-x-4 max-w-full">
                      {!message.isUser && (
                        <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      {message.isUser ? (
                        <div className="p-5 rounded-3xl bg-blue-500 text-white rounded-br-lg shadow-xl">
                          <p
                            className="text-sm leading-relaxed font-medium"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {message.text}
                          </p>
                        </div>
                      ) : (
                        <div className="w-full p-5 rounded-3xl text-white bg-white/5 relative">
                          <p
                            className="text-base leading-loose font-light whitespace-pre-line"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {message.text}
                          </p>
                        </div>
                      )}
                      {message.isUser && (
                        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span className="text-black text-sm font-bold">
                            U
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-blue-400/30 p-5 rounded-3xl shadow-xl">
                        <div className="flex space-x-2 items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-6 border-t border-blue-400/30 bg-black/90 backdrop-blur-xl flex-shrink-0">
                <div className="relative flex-1 flex">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Continue the conversation..."
                    className="w-full bg-white/10 backdrop-blur-sm border-2 border-blue-400/30 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-all duration-300 text-base font-medium pr-16"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 rounded-xl p-3 transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* STORY PREVIEW */}
            <div className="md:w-3/5 w-full bg-white/5 backdrop-blur-xl border-t md:border-t-0 md:border-l border-blue-400/30 p-6 flex-shrink-0">
              <div className="absolute top-4 md:top-16 right-4 z-10">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="p-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-xl transition-all duration-300"
                >
                  <Maximize2 className="text-white w-5 h-5" />
                </button>
              </div>

              <div className="h-full flex flex-col">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      Story Visualization
                    </h3>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                  </div>
                  <p
                    className="text-sm text-white/60 font-medium"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Interactive story book preview
                  </p>
                </div>

                <div className="flex-1 relative rounded-2xl overflow-hidden border border-blue-400/30 bg-black/40">
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div
                      className="max-w-5xl w-full rounded-2xl overflow-hidden"
                      style={{
                        background: "rgba(15, 15, 35, 0.8)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
                        border: "1px solid rgba(100, 200, 255, 0.2)",
                      }}
                    >
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[300px] overflow-hidden">
                          <img
                            src={previewStoryPages[previewPage].illustration}
                            alt="Story preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center relative bg-white/5">
                          <div
                            className="text-lg md:text-xl leading-relaxed text-white"
                            style={{
                              fontFamily: "'Georgia', 'Times New Roman', serif",
                              lineHeight: "1.8",
                            }}
                          >
                            {previewStoryPages[previewPage].text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 md:top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span
                      className="text-xs text-blue-400 font-medium"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Live Preview
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[100] p-4 md:p-6 overflow-y-auto">
          <div className="relative w-full max-w-6xl bg-white/10 rounded-3xl border border-blue-400/40 shadow-2xl overflow-hidden">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 bg-blue-500/30 hover:bg-blue-500/60 rounded-xl p-2 transition-all duration-300 z-10"
            >
              <X className="text-white w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() =>
                setPreviewPage(
                  (prev) =>
                    (prev - 1 + previewStoryPages.length) %
                    previewStoryPages.length
                )
              }
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-blue-500/30 hover:bg-blue-500/60 rounded-xl p-2 md:p-3 transition-all duration-300 z-10"
            >
              <ArrowLeft className="text-white w-5 md:w-6 h-5 md:h-6" />
            </button>

            <button
              onClick={() =>
                setPreviewPage((prev) => (prev + 1) % previewStoryPages.length)
              }
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-blue-500/30 hover:bg-blue-500/60 rounded-xl p-2 md:p-3 transition-all duration-300 z-10 rotate-180"
            >
              <ArrowLeft className="text-white w-5 md:w-6 h-5 md:h-6" />
            </button>

            {/* Grid or Column layout */}
            <div className="flex flex-col md:grid md:grid-cols-2">
              <img
                src={previewStoryPages[previewPage].illustration}
                alt="Expanded story"
                className="w-full md:h-[500px] h-64 md:object-cover object-cover"
              />
              <div className="p-6 md:p-12 flex flex-col justify-center bg-black/50">
                <p
                  className="text-base md:text-xl text-white leading-relaxed"
                  style={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    lineHeight: "1.8",
                  }}
                >
                  {previewStoryPages[previewPage].text}
                </p>

                {/* Page indicator */}
                <div className="mt-6 md:mt-8 flex items-center justify-center gap-2 flex-wrap">
                  {previewStoryPages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPreviewPage(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === previewPage
                          ? "bg-blue-400 w-6 h-2 md:w-8 md:h-2"
                          : "bg-white/30 w-2 h-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotPage;
