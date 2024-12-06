export default function CryptoCard({ coin }) {
    return (
      <div className="bg-gray-700 p-4 rounded shadow-md text-center w-64">
        <img src={coin.image} alt={coin.name} className="w-16 h-16 mx-auto mb-2" />
        <h2 className="text-xl">{coin.name}</h2>
        <p>ATH Market Cap: ${coin.ath_market_cap.toLocaleString()}</p>
      </div>
    );
  }
  