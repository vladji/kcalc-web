import { FC } from 'react';
import { Loader } from '../../../components/shared/Loader';
import { Button } from '../../../components/shared/Button';
import cn from 'classnames';
import styles from './styles.module.scss';

interface CategoriesListProps<T> {
  clickHandler: (category: T) => void;
  activeCategory: T;
  isLoading: boolean;
  categories?: T[];
}

export const CategoriesList: FC<CategoriesListProps<any>> = ({
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
      <Button className={styles.button} handler={() => null} blue>
        <span>New recipe</span>
      </Button>
    </div>
  );
};
