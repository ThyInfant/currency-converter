import { useState } from "react";
import AmountInput from "./components/AmountInput";
import CurrencySelector from "./components/CurrencySelector";
import ConversionResult from "./components/ConversionResult";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-white/40">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600 tracking-tight">
          Currency Converter
        </h1>

        <AmountInput amount={amount} setAmount={setAmount} />

        <div className="flex gap-4 mt-4">
          <CurrencySelector
            label="From"
            currency={fromCurrency}
            setCurrency={setFromCurrency}
          />
          <CurrencySelector
            label="To"
            currency={toCurrency}
            setCurrency={setToCurrency}
          />
        </div>

        <ConversionResult
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      </div>
    </div>
  );
}
