import { Dispatch, FC, SetStateAction } from 'react';
import { useFetchProductCategories } from '../../requests/useFetchProductCategories';
import cn from 'classnames';
import styles from './styles.module.scss';

interface AdminProductCategoriesProps {
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
}

export const AdminProductCategories: FC<AdminProductCategoriesProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const { categories, isFetched } = useFetchProductCategories();

  const onCategoryClick = (value: string) => {
    localStorage.setItem('currentProductCategory', value);
    setActiveCategory(value);
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {isFetched &&
          categories?.map((item, index) => (
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
