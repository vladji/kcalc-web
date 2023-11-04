import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export interface ProductItemProps {
  id: string;
  productsCount: number;
  deleteHandler: (id: string) => void;
}

export const ProductItem: FC<ProductItemProps> = ({ id, productsCount, deleteHandler }) => {
  const onDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    deleteHandler(id);
  };

  return (
    <div className={cn(styles.inputsRow, 'product-item')}>
      {productsCount > 1 && (
        <button className={styles.deleteButton} onClick={onDeleteButtonClick}>
          X
        </button>
      )}
      <input className={cn('product-input', styles.inputId)} type="text" name="prodId" />
      <input className={cn('product-input', styles.inputName)} type="text" name="prod" />
      <input className={cn('product-input', styles.shortInput)} type="number" name="amount" />
    </div>
  );
};
