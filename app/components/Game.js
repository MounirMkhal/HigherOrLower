import { useState, useEffect } from 'react';
import CryptoCard from './CryptoCard';
import data from '../../data/crypto-data.json';

export default function Game() {
  const [currentPair, setCurrentPair] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCurrentPair(getRandomPair(data));
  }, []);

  function getRandomPair(data) {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }

  const handleGuess = (guess) => {
    const [coin1, coin2] = currentPair;

    const isCorrect =
      (guess === 'higher' && coin1.ath_market_cap > coin2.ath_market_cap) ||
      (guess === 'lower' && coin1.ath_market_cap < coin2.ath_market_cap);

    if (isCorrect) {
      setScore(score + 1);
      setCurrentPair(getRandomPair(data));
    } else {
      alert(`Game Over! Your final score was ${score}`);
      setScore(0);
      setCurrentPair(getRandomPair(data));
    }
  };

  return (
    <div className="text-center">
      <p className="mb-4">Score: {score}</p>
      <div className="flex justify-center items-center gap-8">
        {currentPair.map((coin, index) => (
          <CryptoCard key={index} coin={coin} />
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={() => handleGuess('higher')}
          className="bg-green-500 px-4 py-2 rounded mr-2"
        >
          Higher
        </button>
        <button
          onClick={() => handleGuess('lower')}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Lower
        </button>
      </div>
    </div>
  );
}
