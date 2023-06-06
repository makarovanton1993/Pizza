import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortType, selectFilter, StateSort } from '../redux/slices/filterSlice';


type SortListItem = {
  name: string,
  sort: StateSort,
  order: string
}
type PopupClick = MouseEvent & {
  path: Node[];
};
export const sortItems: SortListItem[] = [
  { name: 'популярности', sort: StateSort.RATING, order: 'asc' },
  { name: 'цене (по уменьшению)', sort: StateSort.PRICE, order: 'desc' },
  { name: 'цене (по увелечению)', sort: StateSort.PRICE, order: 'asc' },
  { name: 'алфавиту(по увелечению)', sort: StateSort.NAME, order: 'desc' },
  { name: 'алфавиту(по уменьшению)', sort: StateSort.NAME, order: 'asc' },
];
// Убрать сорт тупе и функцию сетсорт тупе!!!!!
function Sort() {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const dispatch = useDispatch();
  const { sortProperty } = useSelector(selectFilter);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleClick = (event: MouseEvent) => {
      const _event = event as PopupClick
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setVisiblePopup(false);
      }
    };

    document.body.addEventListener('click', handleClick);
    return () => document.body.removeEventListener('click', handleClick);
  }, []);

  const onClickSort = (obj: SortListItem) => {
    dispatch(setSortType(obj));
  };
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setVisiblePopup(!visiblePopup)}>{sortProperty.name}</span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {sortItems.map((item, index) => (
              <li
                className={sortProperty.name === item.name ? 'active' : ''}
                onClick={() => onClickSort(item)}
                key={index}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
