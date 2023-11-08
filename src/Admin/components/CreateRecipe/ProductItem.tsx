import React, { FC } from 'react';
import { DeleteButton } from '../shared/DeleteButton';
import cn from 'classnames';
import styles from './styles.module.scss';

export interface ProductItemProps {
  id: string;
  productsCount: number;
  deleteHandler: (id: string) => void;
}

export const ProductItem: FC<ProductItemProps> = ({ id, productsCount, deleteHandler }) => {
  const onDeleteButtonClick = () => {
    deleteHandler(id);
  };

  return (
    <div className={cn(styles.inputsRow, 'product-item')}>
      {productsCount > 1 && <DeleteButton handler={onDeleteButtonClick} />}
      <input className={cn('product-input', styles.inputId)} type="text" name="prodId" />
      <input className={cn('product-input', styles.inputName)} type="text" name="prod" />
      <input className={cn('product-input', styles.shortInput)} type="number" name="amount" />
    </div>
  );
};
