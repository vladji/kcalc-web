import { useState } from "react";
import cn from "classnames";
import { useFetchProductCategories } from "../../requests/useFetchProductCategories";
import styles from "./styles.module.scss";

const currentCategory = localStorage.getItem("currentProductCategory") || "";

export const ProductCategories = () => {
  const [activeCategory, setActiveCategory] = useState<string>(currentCategory);
  const { categories, isFetched } = useFetchProductCategories();

  const onCategoryClick = (category: string) => {
    localStorage.setItem("currentProductCategory", category);
    setActiveCategory(category);
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {isFetched && categories?.map((item, index) => (
          <li
            key={index}
            className={cn({ [styles.active]: item === activeCategory })}
            onClick={() => onCategoryClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
