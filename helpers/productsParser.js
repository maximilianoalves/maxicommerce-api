exports.allProducts = (req, rawProducts) => {
    let payload = [];
    rawProducts.forEach((product) => {
      let tmpProducts = {
        id: product.productId,
        name: product.name,
        price: product.price,
        formmatedPrice: product.formmatedPrice,
        quantity: product.quantity
      }
      payload.push(tmpProducts);
    });
    return payload;
}

exports.productsWithId = (req, rawProducts) => {
    try {
      let product = {
        id : rawProducts.productId,
        name : rawProducts.name,
        price : rawProducts.price,
        formmatedPrice : rawProducts.formmatedPrice,
        quantity : rawProducts.quantity
      }
      return product
    } catch(err) {
      return err.message;
    }
  }