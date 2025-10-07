import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Home, RotateCcw } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const allQuestions: Question[] = [
  {
    question: "What causes geomagnetic storms on Earth?",
    options: [
      "Volcanic eruptions",
      "Solar wind interacting with Earth's magnetic field",
      "Lunar tides",
      "Cosmic radiation"
    ],
    correctAnswer: 1
  },
  {
    question: "What are coronal mass ejections (CMEs)?",
    options: [
      "Massive bursts of plasma and magnetic field from the Sun's corona",
      "Sunspots forming on the solar surface",
      "Solar flares visible at night",
      "Solar eclipses caused by the Moon"
    ],
    correctAnswer: 0
  },
  {
    question: "Which technology is most affected by space weather events?",
    options: [
      "Wind turbines",
      "Satellites and GPS systems",
      "Hydroelectric dams",
      "Undersea cables"
    ],
    correctAnswer: 1
  },
  {
    question: "What can intense solar radiation do to astronauts?",
    options: [
      "Increase gravity exposure",
      "Cause radiation sickness and damage electronics",
      "Enhance visibility of stars",
      "No effect at all"
    ],
    correctAnswer: 1
  },
  {
    question: "How can space weather affect power grids?",
    options: [
      "Overheating generators due to cosmic rays",
      "Inducing electric currents in long conductors causing blackouts",
      "Melting cables in the atmosphere",
      "Powering up extra circuits automatically"
    ],
    correctAnswer: 1
  },
  {
    question: "Which layer of Earth’s atmosphere is most affected by solar storms?",
    options: [
      "Stratosphere",
      "Mesosphere",
      "Ionosphere",
      "Troposphere"
    ],
    correctAnswer: 2
  },
  {
    question: "How do scientists monitor space weather?",
    options: [
      "Using ground telescopes only",
      "With spacecraft like the Solar and Heliospheric Observatory (SOHO)",
      "By observing the Moon’s surface",
      "By tracking meteor showers"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the main component of the solar wind?",
    options: [
      "Oxygen and nitrogen molecules",
      "Charged particles like protons and electrons",
      "Helium gas only",
      "Gamma radiation"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the approximate duration of the solar activity cycle?",
    options: [
      "1 year",
      "5 years",
      "11 years",
      "25 years"
    ],
    correctAnswer: 2
  },
  {
    question: "How can space weather affect radio communications?",
    options: [
      "Amplifying radio waves",
      "Causing signal disruptions and blackouts",
      "Making communication faster",
      "No effect at all"
    ],
    correctAnswer: 1
  }
];

export default function Game() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    const savedHighScore = localStorage.getItem("spaceWeatherHighScore");
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
  }, []);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === questions[currentQuestion].correctAnswer) setScore(score + 10);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const finalScore = answerIndex === questions[currentQuestion].correctAnswer ? score + 10 : score;
        if (finalScore > highScore) {
          localStorage.setItem("spaceWeatherHighScore", finalScore.toString());
          setHighScore(finalScore);
          setIsNewHighScore(true);
        }
        setGameOver(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
    setIsNewHighScore(false);
  };

  const progress = questions.length ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (gameOver) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-2xl">
          <div className="mb-8">
            {isNewHighScore ? (
              <Trophy className="text-yellow-400 mx-auto mb-4 animate-bounce" size={80} style={{ filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))' }} />
            ) : (
              <div className="text-6xl mb-4">🎉</div>
            )}
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 40px rgba(59, 130, 246, 0.6)" }}>
              {isNewHighScore ? "NEW HIGH SCORE!" : "GAME COMPLETE!"}
            </h1>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-blue-400/30 rounded-3xl p-8 mb-8">
            <p className="text-white/70 text-lg mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Your Score</p>
            <p className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>{score}</p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-white/50 text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Questions Answered</p>
                <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{questions.length}</p>
              </div>
              <div>
                <p className="text-white/50 text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>High Score</p>
                <p className="text-2xl font-bold text-yellow-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>{highScore}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={restartGame}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 border border-blue-400/30"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <RotateCcw size={20} />
              <span>Play Again</span>
            </button>
            <button
              onClick={() => navigate("/game")}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold text-lg border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm flex items-center justify-center space-x-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
          </div>
        </div>

        <style>{`
          @keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
        `}</style>
      </div>
    );
  }

  if (!questions.length) return null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden p-6">
      <div className="absolute inset-0">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/game")}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ← Back
          </button>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-white/50 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Score</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>{score}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-blue-400/30 rounded-3xl p-8 md:p-12 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-blue-300 font-bold text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Question {currentQuestion + 1}/{questions.length}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {questions[currentQuestion].question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => {
              const isCorrect = index === questions[currentQuestion].correctAnswer;
              const isSelected = index === selectedAnswer;
              let buttonClass = "w-full p-6 rounded-2xl font-semibold text-lg text-left transition-all border-2 ";
              if (showResult) {
                if (isCorrect) buttonClass += "bg-green-500/20 border-green-400 text-white";
                else if (isSelected && !isCorrect) buttonClass += "bg-red-500/20 border-red-400 text-white";
                else buttonClass += "bg-white/5 border-white/10 text-white/50";
              } else {
                buttonClass += "bg-white/5 hover:bg-white/10 border-blue-400/30 hover:border-blue-400 text-white hover:scale-105";
              }
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="text-blue-300 font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Progress</span>
            <span className="text-white font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
      `}</style>
    </div>
  );
}
