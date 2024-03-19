export default function FormatPrice({price, type}) {
    const formattedPrice = price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const cleanedPrice = formattedPrice.replace(/[^\d.]/g, '');

    if (type === 'discount') {
        return (
            <div className="flex price_discount justify-center">
                {cleanedPrice}
                <p className="underline">đ</p>
            </div>
        );
    }

    return (

        <div className="flex price justify-center">
            {cleanedPrice}
            <p className="underline">đ</p>
        </div>
    );
}