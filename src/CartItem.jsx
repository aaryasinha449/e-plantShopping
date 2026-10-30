
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const price = (item) => Number(String(item.cost).replace(/[^0-9.]/g, ''));

  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + price(item) * item.quantity, 0).toFixed(2);

  const calculateTotalCost = (item) =>
    (price(item) * item.quantity).toFixed(2);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Your Shopping Cart</h2>
      <h3 style={{ color: 'black' }}>Total Items: {totalItems}</h3>
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Continue shopping to add plants!</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  aria-label={`Decrease ${item.name} quantity`}
                >-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                  aria-label={`Increase ${item.name} quantity`}
                >+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => alert('Functionality to be added for future reference')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
