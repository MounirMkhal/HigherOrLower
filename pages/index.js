import Game from '../app/components/Game';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Memecoin Higher or Lower</h1>
      <Game />
    </div>
  );
}