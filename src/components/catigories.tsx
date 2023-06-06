import React from 'react';

type CategoriesProps = {
  categoryId:number,
  onSelectCategory:(i:number)=> void
}

const Categories:React.FC<CategoriesProps>  = function Catigories({ categoryId, onSelectCategory}) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category + index}
            className={categoryId === index ? 'active' : ''}
            onClick={() => onSelectCategory(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
