export default function CryptoCard({ coin, showMarketCap }) {
  if (!coin) {
    return null; // Return null if coin is undefined
  }

  return (
    <div className="relative w-full h-1/2 flex items-center justify-center">
      <img
        src={coin.image}
        className="absolute inset-0 w-1/2 h-1/2 top-1/2 left-[23%] object-contain scale-150"
      />
      <div className="relative top-[-25%] left-[-2%] z-10 text-center text-white bg-opacity-100 p-4 rounded mt-2">
      <h2 className="text-3xl font-bold">{coin.name}</h2>
        {showMarketCap && (
          <p className="text-xl">ATH Market Cap: ${coin.ath_market_cap.toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}
  