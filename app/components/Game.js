import { useState, useEffect } from "react";
import CryptoCard from "./CryptoCard";
import data from "../../data/crypto-data.json";

export default function Game({ onGameOver }) {
  const [currentPair, setCurrentPair] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [showMarketCap, setShowMarketCap] = useState(false);

  useEffect(() => {
    setCurrentPair(getRandomPair(data));
    const savedHighscore = localStorage.getItem("highscore");
    if (savedHighscore) {
      setHighscore(parseInt(savedHighscore, 10));
    }
  }, []);

  function getRandomPair(data) {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const firstCoin = shuffled[0];
    // Filter out the first coin and get a random one from remaining coins
    const remainingCoins = shuffled.filter(coin => coin.name !== firstCoin.name);
    const secondCoin = remainingCoins[Math.floor(Math.random() * remainingCoins.length)];
    return [firstCoin, secondCoin];
  }

  const handleGuess = (guess) => {
    const [coin1, coin2] = currentPair;
  
    const isCorrect =
      (guess === 'higher' && coin1.ath_market_cap <= coin2.ath_market_cap) ||
      (guess === 'lower' && coin1.ath_market_cap >= coin2.ath_market_cap);
  
    setShowMarketCap(true);
  
    const soundFile = isCorrect ? '/images/correct.mp3' : '/images/wrong.mp3';
    const feedbackSound = new Audio(soundFile);
    feedbackSound.volume = 0.05;
  
    if (isCorrect) {
      feedbackSound.play();
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highscore) {
        setHighscore(newScore);
        localStorage.setItem('highscore', newScore);
      }
      setTimeout(() => {
        // Swap the coins and get a new right coin
        setCurrentPair([coin2, ...getRandomPair(data).slice(1)]);
        setShowMarketCap(false);
      }, 2000);
    } else {
      feedbackSound.play();
      onGameOver(score);
      setScore(0);
      setCurrentPair(getRandomPair(data));
      setShowMarketCap(false);
    }
  };

    return (
      <div id="game-container" className="text-center w-full h-screen">
        <div className="absolute top-4 right-9 flex space-x-4 z-20">
          <a
            href="https://x.com/MemecoinHOL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/x.png" alt="Twitter" className="w-8 h-8" />
          </a>
          <a href="https://pump.fun/coin/" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/pumpfun.png"
              alt="Chart Line"
              className="w-14 h-8"
            />
          </a>
          <a
            href="https://dexscreener.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/dex.png" alt="Chart Pie" className="w-8 h-8" />
          </a>
        </div>
        <p className="absolute top-4 left-[1%] z-10 font-bold text-2xl">
          Highscore: {highscore}
        </p>
        <p className="mb-4 absolute left-[1%] bottom-[0%] z-10 font-bold text-2xl">
          Score: {score}
        </p>
        <div className="flex h-screen">
          <div className="w-1/2 relative">
            <CryptoCard coin={currentPair[0]} />
            <div className="relative bottom-[-10%] left-[-3%] text-white text-xl font-bold">
                has
        </div>
            <div className="relative left-[-3%] bottom-[-15%] text-gold text-4xl font-cursive">
              {`$${currentPair[0]?.ath_market_cap.toLocaleString()}`}
            </div>
            <div className="relative bottom-[-16%] left-[-3%] text-white text-l font-bold">
                ATH Market Cap
        </div>
          </div>
          <div className="flex justify-center items-center w-28 h-28 bg-white text-black rounded-full text-4xl font-bold absolute right-[48%] top-[40%] z-10">
            VS
          </div>
          <div className="w-1/2 relative">
            <CryptoCard coin={currentPair[1]} showMarketCap={false} />
            <div className="relative bottom-[-10%] left-[-2%] text-white text-xl font-bold">
                has
        </div>
            <div className="relative right-[2%] bottom-[-12.5%] flex flex-col items-center mb-4">
              <button
                onClick={() => handleGuess("higher")}
                className="bg-green-500 px-16 py-2 rounded mb-2 font-bold border-2 border-white"
              >
                Higher
              </button>
              <button
                onClick={() => handleGuess("lower")}
                className="bg-red-500 px-16 py-2 rounded font-bold border-2 border-white"
              >
                Lower
              </button>
            </div>
            <div className="relative bottom-[-13.5%] left-[-1.8%] text-white text-l font-bold">
                ATH Market Cap
        </div>
          </div>
        </div>
        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-2xl">
          CA: 
        </p>
      </div>
    );
  };
