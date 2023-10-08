import { Dispatch, FC, SetStateAction } from "react";
import cn from "classnames";
import { useFetchProductCategories } from "../../requests/useFetchProductCategories";
import styles from "./styles.module.scss";

interface AdminProductCategoriesProps {
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
}

export const AdminProductCategories: FC<AdminProductCategoriesProps> = ({ activeCategory, setActiveCategory }) => {
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
