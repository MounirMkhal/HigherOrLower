import { useState, useRef, useEffect } from 'react';
import Game from '../app/components/Game';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        audioRef.current.volume = 0.05;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Autoplay was prevented:', error);
      }
    };

    playAudio();
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const startGame = () => {
    setShowOverlay(false);
    setGameOver(false);
    audioRef.current.play();
  };

  const handleGameOver = () => {
    setGameOver(true);
    setShowOverlay(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/Memecoin.mp4" type="video/mp4" />
      </video>
      <audio ref={audioRef} src="/images/Main.mp3" />
      <button
        onClick={toggleAudio}
        className="absolute bottom-4 right-4 z-20 bg-yellow-500 text-black px-4 py-2 rounded"
      >
        {isPlaying ? 'Pause Audio' : 'Play Audio'}
      </button>
      {showOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-30 backdrop-blur-md">
          <img
            src="/images/memecoinlogo.png"
            alt="Logo"
            className="w-72 h-72 mb-4"
          />
          <p className="text-white text-xl mb-4 text-center">
            {gameOver ? 'You Lost! Try Again?' : 'Welcome to the Crypto Market Cap Game! Guess whether the next coin\'s market cap is higher or lower.'}
          </p>
          <button
            onClick={startGame}
            className="bg-green-500 text-white px-8 py-4 rounded text-2xl font-bold"
          >
            {gameOver ? 'Play Again' : 'Play Now'}
          </button>
        </div>
      )}
      <div className={`relative z-10 ${showOverlay ? 'blur-sm' : ''}`}>
        {!showOverlay && (
          <img
            src="/images/memecoinlogo.png"
            alt="Logo"
            className="absolute top-[-8%] left-[48.5%] transform -translate-x-1/2 w-72 h-72"
          />
        )}
        <Game onGameOver={handleGameOver} />
      </div>
    </div>
  );
}