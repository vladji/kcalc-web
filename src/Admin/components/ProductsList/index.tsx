import { FC, useEffect, useState } from 'react';
import { Loader } from '../../../components/shared/Loader';
import { Button } from '../../../components/shared/Button';
import { Item } from './Item';
import { Modal } from '../../../components/shared/Modal';
import { CreateProduct } from '../CreateProduct';
import { useFetchProductsByCategory } from '../../requests/products/useFetchProductsByCategory';
import { useUpdateProducts } from '../../requests/products/useUpdateProducts';
import { useFetchProductCategories } from '../../requests/products/useFetchProductCategories';
import { ProductFields, ProductsPropsWithDbId } from '../../types/products';
import styles from './styles.module.scss';

export type InputChangesMap = Map<ProductFields, ProductsPropsWithDbId>;

interface AdminProductsListProps {
  category: string;
}

export const ProductsList: FC<AdminProductsListProps> = ({ category }) => {
  const [showCreateProductModal, setShowCreateProductModal] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [manualLoading, setManualLoading] = useState<boolean>(false);
  const [itemsChanges, setItemsChanges] = useState<InputChangesMap>(new Map());

  useEffect(() => {
    if (!itemsChanges.size) {
      setIsSave(false);
    }
  }, [itemsChanges.size]);

  const { categories } = useFetchProductCategories();
  const { productsList, loading, refetch } = useFetchProductsByCategory(category);
  const { updateProducts } = useUpdateProducts();

  const onSaveAllChanges = async () => {
    setManualLoading(true);
    const products = Object.values(Object.fromEntries(itemsChanges.entries()));
    const response = await updateProducts(products);

    if (response?.ok) {
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

  const onCreateClick = () => {
    setShowCreateProductModal(true);
  };

  const isLoading = manualLoading || loading;

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      <div className={styles.tableHeader}>
        <span>category</span>
        <span className={styles.name}>name</span>
        <span>proteins</span>
        <span>fat</span>
        <span>carb</span>
        <span>kcal</span>
        <span />
        <span />
        <span />
      </div>
      <ul className={styles.listWrapper}>
        {!loading &&
          productsList?.map((item) => (
            <Item
              key={item._id}
              item={{ ...item }}
              isSave={isSave}
              setIsSave={setIsSave}
              itemsChanges={itemsChanges}
              setItemsChanges={setItemsChanges}
              refetchProducts={refetch}
              currentCategory={category}
              categories={categories}
            />
          ))}
      </ul>
      <div className={styles.controlPanelWrapper}>
        <div className={styles.controlPanelBlock}>
          <Button handler={onSaveAllChanges} disabled={!isSave}>
            <span>Save all</span>
          </Button>
          <Button handler={onCancelAllChanges} disabled={!isSave}>
            <span>Cancel all</span>
          </Button>
        </div>
        <Button handler={onCreateClick} blue>
          <span>Create Product</span>
        </Button>
      </div>
      {showCreateProductModal && (
        <Modal onClose={() => setShowCreateProductModal(false)}>
          <CreateProduct
            onClose={() => setShowCreateProductModal(false)}
            refetchProducts={refetch}
            loadingProducts={loading}
          />
        </Modal>
      )}
    </div>
  );
};
