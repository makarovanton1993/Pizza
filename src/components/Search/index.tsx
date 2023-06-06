import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import style from './Search.module.scss';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const [value, setValue] = useState('');
  // const { setSearch } = React.useContext(SearchContext);
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const updateSearchInput = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 150),
    [],
  );

  const onSearchClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    
      searchRef.current?.focus();
   
  };

  const onSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchInput(e.target.value);
  };
  return (
    <div className={style.root}>
      <svg
        className={style.iconSearch}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 487.95 487.95">
        <g>
          <g>
            <path
              d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
			c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
			c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
            />
          </g>
        </g>
      </svg>
      <input
        ref={searchRef}
        value={value}
        onChange={onSearch}
        className={style.input}
        placeholder="Поиск пиццы "
      />
      {value && (
        <svg
          className={style.iconClose}
          onClick={onSearchClear}
          height="512px"
          version="1.1"
          viewBox="0 0 512 512"
          width="512px">
          <g className="st2" id="cross">
            <g className="st0">
              <line className="st1" x1="112.5" x2="401" y1="112.5" y2="401" />
              <line className="st1" x1="401" x2="112.5" y1="112.5" y2="401" />
            </g>
          </g>
          <g id="cross_copy">
            <path d="M268.064,256.75l138.593-138.593c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256.75,245.436   L118.157,106.843c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L245.436,256.75L106.843,395.343   c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256.75,268.064l138.593,138.593   c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L268.064,256.75z" />
          </g>
        </svg>
      )}
    </div>
  );
};
export default Search;
