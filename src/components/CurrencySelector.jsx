const currencies = ["USD", "EUR", "GBP", "ETB", "JPY", "CAD"];

export default function CurrencySelector({ label, currency, setCurrency }) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
}
