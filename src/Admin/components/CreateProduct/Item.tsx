import React, { Dispatch, FC, SetStateAction } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface ItemProps {
  categories?: string[];
  setItemsCount: Dispatch<SetStateAction<number>>;
}

export const Item: FC<ItemProps> = ({ categories, setItemsCount }) => {
  const onDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setItemsCount((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  return (
    <fieldset className={styles.fieldset}>
      <button className={styles.deleteButton} onClick={onDeleteButtonClick}>X</button>
      <div className={styles.inputBlock}>
        <label>category</label>
        <select className="create-product-input" name="category">
          {!!categories &&
            categories.map((category) => (
              <option key={category}>{category}</option>
            ))
          }
        </select>
      </div>
      <div className={cn(styles.inputBlock, styles.name)}>
        <label>name</label>
        <input className="create-product-input" name="name" type="text" />
      </div>
      <div className={styles.inputBlock}>
        <label>proteins</label>
        <input className="create-product-input" name="proteins" type="number" />
      </div>
      <div className={styles.inputBlock}>
        <label>fat</label>
        <input className="create-product-input" name="fat" type="number" />
      </div>
      <div className={styles.inputBlock}>
        <label>carb</label>
        <input className="create-product-input" name="carbohydrates" type="number" />
      </div>
      <div className={styles.inputBlock}>
        <label>kcal</label>
        <input className="create-product-input" name="kcal" type="number" />
      </div>
    </fieldset>
  );
};
