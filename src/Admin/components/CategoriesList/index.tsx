import { FC } from 'react';
import { Loader } from '../../../components/shared/Loader';
import cn from 'classnames';
import styles from './styles.module.scss';

interface CategoriesListProps {
  clickHandler: (category: string) => void;
  activeCategory: string;
  isLoading: boolean;
  categories?: string[];
}

export const CategoriesList: FC<CategoriesListProps> = ({
  clickHandler,
  activeCategory,
  isLoading,
  categories,
}) => {
  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      {!isLoading && (
        <ul className={styles.list}>
          {categories?.map((item, index) => (
            <li
              key={index}
              className={cn({ [styles.active]: item === activeCategory })}
              onClick={() => clickHandler(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
