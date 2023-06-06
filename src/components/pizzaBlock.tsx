import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem,selectCart } from '../redux/slices/CartSlice';

type PizzaBlockProps = {
  id:string,
  imageUrl:string,
  price:number,
  name:string,
  types:number[],
  sizes:number[],
}

const PizzaBlock:React.FC<PizzaBlockProps> = function ({ id, imageUrl, price, name, types, sizes }) {
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);

  const typesPizzas = ['Тонкое', 'традиционное'];

  const dispatch = useDispatch();

  const { cartItems } = useSelector(selectCart);
 
  const pizza = cartItems.find((item) => item.id === id);
  const count = pizza ? pizza.count : '';
  

  const onClickType = (index:number) => {
    setActiveType(index);
  };

  const onClickSize = (index:number) => {
    setActiveSize(index);
  };

  const addPizza = () => {
    const obj = {
      id,
      imageUrl,
      price,
      name,
      types: typesPizzas[activeType],
      sizes: sizes[activeSize],
      count:0
    };
    dispatch(addItem(obj));
  };
  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              onClick={() => onClickType(index)}
              key={type + index}
              className={index === activeType ? 'active' : ''}>
              {typesPizzas[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size + index}
              className={index === activeSize ? 'active' : ''}
              onClick={() => onClickSize(index)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span onClick={addPizza}>Добавить</span>
          {count && <i>{count}</i>}
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
