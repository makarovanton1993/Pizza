import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
export const CartPizzaInfo = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    name:string,
    imageUrl:string,
    price:number
  }>();

  
  useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          'https://63051e75697408f7edc21c09.mockapi.io/ReactPizza/' + id,
        );
        setPizza(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPizzas();
  }, []);
  if (!pizza) {
    return <h2>Ожидание загрузки</h2>;
  }
  return (
    <div className="container">
      <div className="cart-info_inner">
        <h1>{pizza.name}</h1>
        <img className="cart-info_img" src={pizza.imageUrl} alt="" />
        <p>{pizza.price} рублей</p>
      </div>
    </div>
  );
};
