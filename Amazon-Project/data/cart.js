export let cart = JSON.parse(localStorage.getItem('cart'));

//default value when null
if (!cart) {
    cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},
{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}
];
};


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId) {
    const selectElement = document.querySelector(`.js-product-quantity-selector[data-product-id="${productId}"]`);
    const selectvalue = Number(selectElement.value);

    // saving matching item in a variable
  let matchingItem = cart.find((cartItem) => cartItem.productId === productId); // One line arrow functions, refer to lesson 12-p2 if lost

  cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
          matchingItem = cartItem;
      }
  });

  if (matchingItem) {
      matchingItem.quantity += selectvalue;
  } else {
      cart.push({
      productId: productId,
      quantity: 1
  });
  };

  saveToStorage();
};

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}
function resetCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
}
resetCart();