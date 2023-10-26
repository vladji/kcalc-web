import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ProductFields, ProductsPropsWithDbId } from '../../types/products';
import { InputButton } from '../shared/InputButton';
import { InputChangesMap } from './index';
import { Input } from '../shared/Input';
import { Modal } from '../../../components/shared/Modal';
import { ConfirmModal } from './ConfirmModal';
import { useDeleteProduct } from '../../requests/products/useDeleteProduct';
import cn from 'classnames';
import styles from './styles.module.scss';

export type OnInputChange = (field: ProductFields) => (value: string) => void;

interface ItemProps {
  item: ProductsPropsWithDbId;
  showId: boolean;
  isSave: boolean;
  setIsSave: Dispatch<SetStateAction<boolean>>;
  itemsChanges: InputChangesMap;
  setItemsChanges: Dispatch<SetStateAction<InputChangesMap>>;
  refetchProducts: () => void;
  currentCategory: string;
  categories?: string[];
}

export const Item: FC<ItemProps> = ({
  item,
  showId,
  isSave,
  setIsSave,
  itemsChanges,
  setItemsChanges,
  refetchProducts,
  currentCategory,
  categories,
}) => {
  const [category, setCategory] = useState<string>(currentCategory);
  const [cancelChanges, setCancelChanges] = useState<boolean>(false);
  const [showDelConfirm, setShowDelConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isActive = itemsChanges.has(item._id as ProductFields);

  const { deleteProduct } = useDeleteProduct();

  const onInputChange: OnInputChange = (field: ProductFields) => (value) => {
    const product = itemsChanges.get(item._id as ProductFields._id) as ProductsPropsWithDbId;
    product[field] = value;
  };

  const onChangeItem = (_id: ProductFields._id) => {
    const newItemsChanges = new Map(itemsChanges);
    newItemsChanges.set(_id, item);
    setItemsChanges(newItemsChanges);
    setIsSave(true);
    setCancelChanges(false);
  };

  const onCancelChanges = (_id: ProductFields._id) => {
    const newItemsChanges = new Map(itemsChanges);
    newItemsChanges.delete(_id);
    setItemsChanges(newItemsChanges);
    setCancelChanges(true);
  };

  const onDeleteProduct = async () => {
    setLoading(true);
    await deleteProduct(item._id);
    await refetchProducts();
    setLoading(false);
    setShowDelConfirm(false);
  };

  const onSelectCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    const product = itemsChanges.get(item._id as ProductFields._id) as ProductsPropsWithDbId;
    product.category = newCategory;
    setCategory(newCategory);
  };

  const isReset = cancelChanges || !isSave;

  useEffect(() => {
    if (isReset) {
      setCategory(currentCategory);
    }
  }, [isReset, currentCategory]);

  return (
    <li className={cn(styles.item, { [styles.active]: isActive })}>
      {!isActive && showId && <span className={styles.cellId}>{item._id}</span>}
      {isActive && (
        <select
          className={cn(styles.cellCategory, { [styles.active]: isActive })}
          disabled={!isActive}
          onChange={onSelectCategory}
          value={category}
        >
          {!!categories && categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      )}
      <Input
        className={styles.cellName}
        active={isActive}
        isReset={isReset}
        initialValue={item.name}
        handler={onInputChange(ProductFields.name)}
      />
      <Input
        type="number"
        active={isActive}
        isReset={isReset}
        initialValue={item.proteins}
        handler={onInputChange(ProductFields.proteins)}
      />
      <Input
        type="number"
        active={isActive}
        isReset={isReset}
        initialValue={item.fat}
        handler={onInputChange(ProductFields.fat)}
      />
      <Input
        type="number"
        active={isActive}
        isReset={isReset}
        initialValue={item.carbohydrates}
        handler={onInputChange(ProductFields.carbohydrates)}
      />
      <Input
        type="number"
        active={isActive}
        isReset={isReset}
        initialValue={item.kcal}
        handler={onInputChange(ProductFields.kcal)}
      />
      <InputButton text="Change" handler={() => onChangeItem(item._id as ProductFields._id)} />
      <InputButton
        text="Cancel"
        handler={() => onCancelChanges(item._id as ProductFields._id)}
        gray
      />
      <InputButton text="Delete" handler={() => setShowDelConfirm(true)} alert />
      {showDelConfirm && (
        <Modal onClose={() => setShowDelConfirm(false)}>
          <ConfirmModal
            confirmHandler={onDeleteProduct}
            cancelHandler={() => setShowDelConfirm(false)}
            loading={loading}
          />
        </Modal>
      )}
    </li>
  );
};
