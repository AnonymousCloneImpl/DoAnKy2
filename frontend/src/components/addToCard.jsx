export default function FormatPrice({ price }) {
  // cart notification----------------------------------------------------------------------------------------------
  const [cartNotifications, setCartNotifications] = useState([]);

  //Add To card
  const addToCart = (product) => {
    const storedItemList = localStorage.getItem('itemList');
    let cartItemList = [];

    if (storedItemList) {
      cartItemList = JSON.parse(storedItemList);
    }

    const existingProductIndex = cartItemList.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
      const updatedCartItemList = [...cartItemList];
      updatedCartItemList[existingProductIndex] = {
        "image": product.image,
        "name": product.name,
        "price": product.price,
        "discountPercentage": product.discountPercentage,
        "type": product.type,
        "stock": product.stock.quantity
      };

      cartItemList = updatedCartItemList;
    } else {
      cartItemList.push({
        "image": product.image,
        "name": product.name,
        "price": product.price,
        "discountPercentage": product.discountPercentage,
        "type": product.type,
        "stock": product.stock.quantity
      });
    }

    localStorage.setItem('itemList', JSON.stringify(cartItemList));

    const newNotification = {
      message: 'The product has been added to Cart !',
    };

    setCartNotifications((prevNotifications) => [...prevNotifications, newNotification]);

    setTimeout(() => {
      setCartNotifications((prevNotifications) => prevNotifications.filter((n) => n !== newNotification));
    }, 3000);
  };

  return (
    <>
      {/* Cart notifications */}
      {cartNotifications.map((notification, index) => (
        <div
          key={index}
          className="cart-notification"
          style={{ bottom: `${10 + index * 40}px`, display: 'block' }}
        >
          <FontAwesomeIcon className="cart-check" icon={faCircleCheck} />
          {notification.message}
        </div>
      ))}
    </>
  )
}
