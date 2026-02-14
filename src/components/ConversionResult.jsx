export default function ConversionResult({ amount, fromCurrency, toCurrency }) {
  return (
    <div className="mt-8 text-center">
      {amount ? (
        <p className="text-xl font-semibold text-gray-800">
          {amount} {fromCurrency} →
          <span className="text-blue-600 ml-2">{toCurrency}</span>
        </p>
      ) : (
        <p className="text-gray-500 italic">Enter an amount to convert</p>
      )}
    </div>
  );
}
