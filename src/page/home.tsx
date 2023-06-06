import React, { useEffect } from 'react';

import _ from 'lodash';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setStringQueary,
  selectFilter,
} from '../redux/slices/filterSlice';
import { fetchData,selectPizzas } from '../redux/slices/pizzaSlice';

import Categories from '../components/catigories';
import PizzaBlock from '../components/pizzaBlock';
import Skeleton from '../components/skeleton';
import Sort from '../components/sort';
import Paginate from '../components/Paginate';
import { useRef } from 'react';
import { sortItems } from '../components/sort';
import { useAppDispatch } from '../redux/store';
const Home = function() {
  const navigate = useNavigate();
  const isMount = useRef(false);

  const { categoryId, sortProperty, currentPage, searchValue } = useSelector(selectFilter);
  const { pizzas, loading } = useSelector(selectPizzas);
  const dispatch = useAppDispatch();

  // вставляем в строку запроса параметры
// @ts-ignore
  //Посмотреть как работает поиск!!!!!!
  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    
    dispatch(
      fetchData({
        category,
        sortProperty,
        searchValue,
        currentPage,
      }),
    );

    if (isMount.current) {
      const params = qs.stringify({
        category: categoryId,
        sort: sortProperty.sort,
        page: currentPage,
      });

      navigate(`/?${params}`);
    }

    isMount.current = true;
  }, [categoryId, sortProperty, searchValue, currentPage]);

  // useEffect(() => {
  //   // setIsLoaded(true);
  //   // const category = categoryId > 0 ? `category=${categoryId}` : '';
  //   // const res = await axios
  //   //   .get(
  //   //     `https://63051e75697408f7edc21c09.mockapi.io/ReactPizza?${category}&sortBy=${sortProperty.sort}&order=${sortProperty.order}&page=${currentPage}&limit=4`,
  //   //   )
  //   //   .then((res) => {
  //   //     setPizzas(res.data);
  //   //   })
  //   //   .catch((err) => console.log(err))
  //   //   .finally(() => {
  //   //     setIsLoaded(false);
  //   //   });
  //   // console.log(res);
  // }, [categoryId, sortProperty, searchValue, currentPage]);

  //При изменении строки запроса вшивает в стате изменения.
  //при перезагрузке ищет значения в window.location.search если есть то производит ререддринг
  // useEffect(() => {
  //   if (window.location.search) {
  //     const param = qs.parse(window.location.search.substring(1));
  //     const sort = sortItems.find((item) => item.sort === param.sort);

  //     dispatch(
  //       setStringQueary({
  //         ...param,
  //         sort,
  //       }),
  //     );
  //   }
  // }, []);
  const searchPizzas = pizzas
    .filter((obj) => {
      if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((item:any, key:number) => <PizzaBlock key={key} {...item} />);

  const skeletons = _.range(1, 5).map((item, index) => <Skeleton key={index}></Skeleton>);
    
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onSelectCategory={(id:number) => dispatch(setCategoryId(id))}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {loading === 'error' ? (
          <div>Извините произошла ошибка при загрузке</div>
        ) : (
          <div className="content__items">{loading === 'loading' ? skeletons : searchPizzas}</div>
        )}
        <Paginate setPage={(page) => dispatch(setCurrentPage(page))}></Paginate>
      </div>
    </div>
  );
}

export default Home;
