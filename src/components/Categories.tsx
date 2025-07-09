import { act, useState } from "react";
import { useWhyDidYouUpdate } from "ahooks";
import React from "react";

const categoryArray = [
  {
    title: "Все",
    id: 0,
  },
  {
    title: "Мясные",
    id: 1,
  },
  {
    title: "Вегетарианская",
    id: 2,
  },
  {
    title: "Гриль",
    id: 3,
  },
  {
    title: "Острые",
    id: 4,
  },
  {
    title: "Закрытые",
    id: 5,
  },
];

type CategoriesProps = {

  value: number;
  onChangeCategory: (id:number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  useWhyDidYouUpdate("Categories", { value, onChangeCategory });

  return (
    <div className="categories">
      <ul className="categories-list">
        {categoryArray.map(({ title, id }) => (
          <li
            onClick={() => onChangeCategory(id)}
            className={value === id ? "active" : ""}
            key={id}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}); // 🔄 закрыли React.memo корректно

export default Categories; // ✅ теперь export работает

