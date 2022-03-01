exports.cart = (req, rawCart) => {
    try {
      let cart = {
        products: rawCart.products,
        total: rawCart.total,
        totalFormmated: rawCart.totalFormmated,
        count: rawCart.count
      }
      return cart
    } catch(err) {
      return err.message;
    }
  }