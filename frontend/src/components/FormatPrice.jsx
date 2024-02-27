export default function FormatPrice({price}) {
    const formattedPrice = price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const cleanedPrice = formattedPrice.replace(/[^\d.]/g, '');

    return (
        <>
            {cleanedPrice}
        </>
    );
}