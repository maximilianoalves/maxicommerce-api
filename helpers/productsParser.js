exports.allProducts = (req, rawProducts) => {
    let payload = [];
    rawProducts.forEach((product) => {
      let tmpProducts = {
        id: product.productsId,
        name: product.name,
        price: product.price,
        formmatedPrice: product.formmatedPrice,
        quantity: product.quantity
      }
      payload.push(tmpProducts);
    });
    return payload;
  }