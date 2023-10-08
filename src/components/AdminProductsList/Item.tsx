import { Dispatch, FC, SetStateAction, useState } from "react";
import cn from "classnames";
import { ProductFields, ProductsProps } from "../../types/prducts";
import { InputButton } from "./InputButton";
import { InputChangesMap } from "./index";
import { Input } from "./Input";
import styles from "./styles.module.scss";

export type OnInputChange = (field: ProductFields) => (value: string) => void;

interface ItemProps {
  item: ProductsProps;
  isSave: boolean;
  setIsSave: Dispatch<SetStateAction<boolean>>;
  itemsChanges: InputChangesMap;
  setItemsChanges: Dispatch<SetStateAction<InputChangesMap>>;
}

export const Item: FC<ItemProps> = ({
  item,
  isSave,
  setIsSave,
  itemsChanges,
  setItemsChanges
}) => {
  const [cancelChanges, setCancelChanges] = useState<boolean>(false);

  const onInputChange: OnInputChange = (field: ProductFields) => (value) => {
    const product = itemsChanges.get(item._id as ProductFields._id) as ProductsProps;
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

  const isReset = cancelChanges || !isSave;

  return (
    <li
      className={cn(styles.item, { [styles.active]: itemsChanges.has(item._id as ProductFields) })}
    >
      <Input
        className={styles.name}
        readOnly={!itemsChanges.has(item._id as ProductFields)}
        isReset={isReset}
        initialValue={item.name}
        handler={onInputChange(ProductFields.name)}
      />
      <Input
        readOnly={!itemsChanges.has(item._id as ProductFields)}
        isReset={isReset}
        initialValue={item.proteins}
        handler={onInputChange(ProductFields.proteins)}
      />
      <InputButton text="Change" handler={() => onChangeItem(item._id as ProductFields._id)} />
      <InputButton text="Cancel" handler={() => onCancelChanges(item._id as ProductFields._id)} gray />
      <InputButton text="Delete" handler={() => null} alert />
    </li>
  );
};
