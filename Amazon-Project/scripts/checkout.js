import {cart, removeFromCart, calculateCartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import {deliveryOptions} from '../data/deliveryOptions.js';


// without {} its a default export
hello();
// current date & time object, check their docs in dayjs online
const today = dayjs();
const deliveryDate = today.add(6, 'day');
console.log(deliveryDate.format('dddd, MMM D, YYYY'));

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
            
        }
    });

    cartSummaryHTML +=
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>

        <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>

                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
                </span>
                <input class="quantity-input" data-product-id="${matchingProduct.id}" name="quantity-input">
                <span class="save-quantity-link link-primary">Save</span>

                <span class="delete-quantity-link link-primary
                js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct)}
           
            </div>
        </div>
    </div>

    `;
});

function deliveryOptionHTML(matchingProduct) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');
        //checking if priceCents is 0, like an if statement whereby the condition is before the ?
        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`; 
        
        //which option is checked
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId
        html +=
        `
        <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
            </div>
                </div>
        </div>
        `
    });

    return html;
}
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    
document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();

            calculateCartQuantity();
        });
});
calculateCartQuantity();
let updateMessage = document.querySelectorAll('.js-update-link');
updateMessage.forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        console.log(productId);


        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');

        if(link.innerHTML === 'Update') {
            link.innerHTML = '';
            console.log('Balls')
        }

    });
});