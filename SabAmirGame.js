import React, { useState } from "react";

const getRandomNumber = () => Math.floor(Math.random() * 9) + 1;
const getColor = (num) => (num % 2 === 0 ? "Green" : "Red");
const getSize = (num) => (num > 5 ? "Big" : num < 5 ? "Small" : "Neutral");

export default function SabAmirGame() {
  const [number, setNumber] = useState(null);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState({ size: "", color: "" });
  const [wallet, setWallet] = useState(1000);

  const handlePlay = () => {
    if (wallet < 10) return;

    const newNumber = getRandomNumber();
    const newSize = getSize(newNumber);
    const newColor = getColor(newNumber);
    const newResult = { number: newNumber, size: newSize, color: newColor };

    const isWin = newSize === "Big" || newColor === "Red"; // basic win condition
    const reward = isWin ? 20 : 0;

    setWallet(wallet - 10 + reward);
    setNumber(newNumber);
    setResult({ size: newSize, color: newColor });
    setHistory([newResult, ...history]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-2">Sab Amir - Colour Trading Game</h1>
      <div className="mb-4 text-lg">Wallet Balance: <strong>{wallet} coins</strong></div>
      <button
        onClick={handlePlay}
        disabled={wallet < 10}
        className={`px-6 py-2 rounded-2xl shadow-lg text-white ${
          wallet < 10 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {wallet < 10 ? "Insufficient Balance" : "Play Round (-10 coins)"}
      </button>

      {number && (
        <div className="mt-6 text-center">
          <p className="text-xl">Number: <strong>{number}</strong></p>
          <p className="text-lg">Size: <strong>{result.size}</strong></p>
          <p className="text-lg">Color: <strong>{result.color}</strong></p>
        </div>
      )}

      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">History</h2>
        <ul className="bg-white rounded-xl shadow-md p-4 space-y-2">
          {history.map((entry, index) => (
            <li key={index} className="border-b last:border-none pb-2">
              #{index + 1} - Number: <strong>{entry.number}</strong>,
              Size: <span className="font-medium">{entry.size}</span>,
              Color: <span className="font-medium">{entry.color}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}