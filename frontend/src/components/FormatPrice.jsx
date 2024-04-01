export default function FormatPrice({ price, type }) {
  const formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  const srcPrice = formattedPrice.replace(/[^\d.]/g, '');
  const trimmedPrice = srcPrice.replace(/(\.0+|(\.\d+?)0+)$/, '$2');

  if (type === 'discount') {
    return (
      <div className="flex price_discount justify-center text-xl">
        {trimmedPrice}
        <p className="ml-1">$</p>
      </div>
    );
  }

  if (type === 'normal') {
    return (
      <div className="flex normal_price justify-center">
        {trimmedPrice}
        <p className="ml-1">$</p>
      </div>
    );
  }

  return (
    <div className="flex price justify-center">
      {trimmedPrice}
      <p className="ml-1">$</p>
    </div>
  );
}
