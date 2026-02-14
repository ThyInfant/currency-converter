export default function CurrencySelector({
  label,
  currency,
  setCurrency,
  rates,
}) {
  const currencyOptions = Object.keys(rates);

  return (
    <div className="flex-1">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        {currencyOptions.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
}
