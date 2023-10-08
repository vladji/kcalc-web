import { FC, useEffect, useState } from "react";
import { useFetchProductsByCategory } from "../../requests/useFetchProductsByCategory";
import { Loader } from "../UI/Loader";
import { Button } from "../UI/Button";
import { Item } from "./Item";
import { ProductFields, ProductsProps } from "../../types/prducts";
import { useUpdateProducts } from "../../requests/useUpdateProducts";
import { ResponseStatus } from "../../requests/types";
import styles from "./styles.module.scss";

export type InputChangesMap = Map<ProductFields, ProductsProps>;

interface AdminProductsListProps {
  category: string;
}

export const AdminProductsList: FC<AdminProductsListProps> = ({ category }) => {
  const [isSave, setIsSave] = useState<boolean>(false);
  const [manualLoading, setManualLoading] = useState<boolean>(false);
  const [itemsChanges, setItemsChanges] = useState<InputChangesMap>(new Map());

  useEffect(() => {
    if (!itemsChanges.size) {
      setIsSave(false);
    }
  }, [itemsChanges.size]);

  const { productsList, loading, refetch } = useFetchProductsByCategory(category);
  const { updateProducts } = useUpdateProducts();

  const onSaveAllChanges = async () => {
    setManualLoading(true);
    const products = Object.values((Object.fromEntries(itemsChanges.entries())));
    const response = await updateProducts(products);

    if (response === ResponseStatus.successUpdate) {
      await refetch();
      setIsSave(false);
      setItemsChanges(new Map());
    }
    setManualLoading(false);
  };

  const onCancelAllChanges = () => {
    setItemsChanges(new Map());
    setIsSave(false);
  };

  const isLoading = manualLoading || loading;

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
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
        <Button handler={onSaveAllChanges} disabled={!isSave}>
          <span>Save all</span>
        </Button>
        <Button handler={onCancelAllChanges} disabled={!isSave}>
          <span>Cancel all</span>
        </Button>
      </div>
    </div>
  );
};
