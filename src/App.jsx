import { useState, useEffect } from "react";
import AmountInput from "./components/AmountInput";
import CurrencySelector from "./components/CurrencySelector";
import ConversionResult from "./components/ConversionResult";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rates, setRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false); // <-- Dark mode state

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode); // <-- Toggle function

  // Fetch exchange rates on load
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();

        if (data.result === "success") {
          setRates(data.rates);
        } else {
          setError("Failed to load exchange rates.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  // Recalculate when amount or currency changes
  useEffect(() => {
    if (!amount || !rates[fromCurrency] || !rates[toCurrency]) return;

    const result = (amount / rates[fromCurrency]) * rates[toCurrency];
    setConvertedAmount(result.toFixed(2));
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-blue-200"
      }`}
    >
      <div
        className={`p-10 w-full max-w-lg rounded-3xl shadow-2xl border ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white/80 border-white/40 backdrop-blur-md"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`text-4xl font-extrabold tracking-tight ${darkMode ? "text-blue-400" : "text-blue-600"}`}
          >
            Currency Converter
          </h1>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`px-2 py-1 rounded-full font-small transition ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mb-4">
            Loading exchange rates...
          </p>
        )}

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <AmountInput amount={amount} setAmount={setAmount} />

        <div className="flex items-end gap-3 mt-4">
          <CurrencySelector
            label="From"
            currency={fromCurrency}
            setCurrency={setFromCurrency}
            rates={rates}
          />

          <button
            onClick={handleSwap}
            className="mb-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-md transition-all active:scale-95"
          >
            ⇄
          </button>

          <CurrencySelector
            label="To"
            currency={toCurrency}
            setCurrency={setToCurrency}
            rates={rates}
          />
        </div>

        <ConversionResult
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          convertedAmount={convertedAmount}
        />
      </div>
    </div>
  );
}
