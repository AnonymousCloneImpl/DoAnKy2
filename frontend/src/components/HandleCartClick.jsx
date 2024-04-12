function HandleCartClick({product, setCartNotifications}) {
    const storedItemList = localStorage.getItem('itemList');
    let cartItemList = [];

    if (storedItemList) {
        cartItemList = JSON.parse(storedItemList);
    }

    const existingProductIndex = cartItemList.findIndex(item => item.model === product.model);
    if (existingProductIndex !== -1) {
        const updatedCartItemList = [...cartItemList];
        let quantity;
        updatedCartItemList.map((item) => {
            if (item.id === product.id) {
                quantity = 1 + parseInt(item.quantity, 10);
            }
        })
        updatedCartItemList[existingProductIndex] = {
            "id": product.id,
            "image": product.image,
            "name": product.name,
            "model": product.model,
            "price": product.price,
            "discountPercentage": product.discountPercentage,
            "type": product.type,
            "quantity": quantity,
            "stock": null
        };
        cartItemList = updatedCartItemList;
    } else {
        cartItemList.push({
            "id": product.id,
            "image": product.image,
            "name": product.name,
            "model": product.model,
            "price": product.price,
            "discountPercentage": product.discountPercentage,
            "type": product.type,
            "quantity": 1,
            "stock": null
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

    return null;

}

export default HandleCartClick;
