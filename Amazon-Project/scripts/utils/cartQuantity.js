import { cart } from "../../data/cart.js";

export function updateCartQuantity() {
    // this is for calculating total quantity
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  
  const displayCartQuantity = document.querySelector('.js-return-to-home-link');
  if (displayCartQuantity) {
    displayCartQuantity.innerHTML = `${cartQuantity} items`;
  }
}
