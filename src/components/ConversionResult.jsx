export default function ConversionResult({
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
}) {
  return (
    <div className="mt-8 text-center">
      {amount && convertedAmount ? (
        <>
          <p className="text-2xl font-bold text-gray-800">
            {amount} {fromCurrency} =
          </p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">
            {convertedAmount} {toCurrency}
          </p>
        </>
      ) : (
        <p className="text-gray-500 italic">Enter an amount to convert</p>
      )}
    </div>
  );
}
