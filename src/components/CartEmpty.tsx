import React from 'react';
import cartEmptyImg from '../assets/img/cart-empty-img.svg';
const CartEmpty = () => {
  return (
    <div className="container">
      <div className="cart-empty">
        <h2 className="cart-empty_title">Корзина пустая</h2>
        <p className="cart-empty_text">
          Вероятней всего,вы не заказали еще пиццу.Для того,чтобы заказать пиццу,перейди на главную
          страницу
        </p>
        <img className="cart-empty_img" src={cartEmptyImg} alt="" />
      </div>
    </div>
  );
};
export default CartEmpty;
