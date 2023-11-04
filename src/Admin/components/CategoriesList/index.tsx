import { FC, useState } from 'react';
import { Loader } from '../../../components/shared/Loader';
import { Button } from '../../../components/shared/Button';
import { Modal } from '../../../components/shared/Modal';
import { CreateRecipe } from '../CreateRecipe';
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
  const [showCreateModal, setShowCreateModal] = useState(false);

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
      <Button className={styles.button} handler={() => setShowCreateModal(true)} blue>
        <span>Create recipe</span>
      </Button>
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)}>
          <CreateRecipe closeHandler={() => setShowCreateModal(false)} />
        </Modal>
      )}
    </div>
  );
};
