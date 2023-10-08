import { FC, useState } from "react";
import { useFetchProductsByCategory } from "../../requests/useFetchProductsByCategory";
import { Loader } from "../UI/Loader";
import { Button } from "../UI/Button";
import { Item } from "./Item";
import { ProductFields, ProductsProps } from "../../types/prducts";
import styles from "./styles.module.scss";

export type InputChangesMap = Map<ProductFields, ProductsProps>;

interface AdminProductsListProps {
  category: string;
}

export const AdminProductsList: FC<AdminProductsListProps> = ({ category }) => {
  const [isSave, setIsSave] = useState<boolean>(false);
  const [itemsChanges, setItemsChanges] = useState<InputChangesMap>(new Map());

  const { productsList, loading } = useFetchProductsByCategory(category);

  const onCancelChanges = () => {
    setItemsChanges(new Map());
    setIsSave(false);
  };

  return (
    <div className={styles.wrapper}>
      {loading && <Loader />}
      <ul className={styles.listWrapper}>
        {!loading && productsList?.map((item) => (
          <Item
            key={item._id}
            item={{ ...item }}
            isSave={isSave}
            setIsSave={setIsSave}
            itemsChanges={itemsChanges}
            setItemsChanges={setItemsChanges}
          />
        ))
        }
      </ul>
      <div className={styles.controlPanel}>
        <Button handler={() => null} disabled={!isSave}>
          <span>Save all</span>
        </Button>
        <Button handler={onCancelChanges} disabled={!isSave}>
          <span>Cancel all</span>
        </Button>
      </div>
    </div>
  );
};
