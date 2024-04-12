export default function FormatPrice({price, type}) {
    const formattedPrice = price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    const trimmedPrice = formattedPrice.replace(/(\.0+|(\.\d+?)0+)$/, '$2');

    if (type === 'discount') {
        return (
            <div className="flex price_discount justify-center text-xl">
                {trimmedPrice}
            </div>
        );
    }

    if (type === 'normal') {
        return (
            <div className="flex normal_price justify-center">
                {trimmedPrice}
            </div>
        );
    }

    return (
        <div className="flex price justify-center">
            {trimmedPrice}
        </div>
    );
}
