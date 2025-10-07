import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import StoryLibrary from './pages/StoryLibrary';
import StoryBook from './pages/StoryBook';
import ChatbotPage from './pages/ChatbotPage';
import GameStart from './pages/GameStart';
import Game from './pages/Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/game" element={<GameStart />} />
        <Route path="/game/play" element={<Game />} />
        <Route path="/library" element={<StoryLibrary />} />
        <Route path="/story/:id" element={<StoryBook />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
