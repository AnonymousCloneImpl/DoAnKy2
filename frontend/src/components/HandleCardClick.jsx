function HandleCardClick({ product }) {
  // Add To card

  const storedItemList = localStorage.getItem('itemList');
  let cartItemList = [];

  if (storedItemList) {
    cartItemList = JSON.parse(storedItemList);
  }

  const existingProductIndex = cartItemList.findIndex(item => item.name === product.name);
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
      "price": product.price,
      "discountPercentage": product.discountPercentage,
      "type": product.type,
      "quantity": 1,
      "stock": null
    });
  }

  localStorage.setItem('itemList', JSON.stringify(cartItemList));
}

export default HandleCardClick;
