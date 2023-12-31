import { FC, useRef, useState } from 'react';
import cn from 'classnames';
import { Item, ItemProps } from './Item';
import { Button } from '../../../components/shared/Button';
import { Loader } from '../../../components/shared/Loader';
import { useFetchProductCategories } from '../../requests/products/useFetchProductCategories';
import { usePostProducts } from '../../requests/products/usePostProducts';
import { nanoid } from '../../../utils/idGenerator';
import { ProductProps } from '../../types/products';
import styles from './styles.module.scss';

interface AdminCreateProductProps {
  onClose: () => void;
  refetchProducts: () => void;
  loadingProducts: boolean;
}

interface ProductsListProps {
  id: string;
  Product: FC<ItemProps>;
}

export const CreateProduct: FC<AdminCreateProductProps> = ({
  onClose,
  refetchProducts,
  loadingProducts,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isValid, setIsValid] = useState(true);

  const [productsList, setProductsList] = useState<ProductsListProps[]>([
    { id: nanoid(), Product: Item },
  ]);

  const { categories } = useFetchProductCategories();
  const { postProducts, loading } = usePostProducts();

  const onSaveClick = async () => {
    const fieldsetArray = Array.from((formRef.current as HTMLFormElement).children);
    let isValid = true;

    const newProducts: ProductProps[] = fieldsetArray.map((fieldset) => {
      const inputsArray = Array.from(
        (fieldset as HTMLFieldSetElement).querySelectorAll('.create-product-input')
      );
      const product = inputsArray.reduce((acc, input) => {
        const { name, value } = input as HTMLInputElement | HTMLSelectElement;

        if (!value) {
          setIsValid(false);
          isValid = false;
        }

        return {
          ...acc,
          [name]: value,
        };
      }, {} as ProductProps);

      product.id = nanoid();
      return product;
    });

    if (isValid) {
      await postProducts(newProducts);
      await refetchProducts();
      onClose();
    }
  };

  const onAddProduct = () => {
    setProductsList((prev) => [...prev, { id: nanoid(), Product: Item }]);
  };

  const onDeleteProduct = (id: string) => {
    const newList = productsList.filter((product) => product.id !== id);
    setProductsList(newList);
  };

  return (
    <div className={styles.modalInner}>
      {(loading || loadingProducts) && <Loader />}
      <h4 className={cn({ [styles.invalidMessage]: !isValid })}>
        {isValid ? 'Create product' : 'Необходимо заполнить все поля'}
      </h4>
      <form ref={formRef} className={styles.form}>
        {productsList.map((item) => (
          <item.Product
            key={item.id}
            id={item.id}
            productsCount={productsList.length}
            deleteHandler={onDeleteProduct}
            categories={categories}
          />
        ))}
      </form>
      <div className={styles.buttonsWrapper}>
        <Button handler={onSaveClick}>
          <span>Save</span>
        </Button>
        <Button className={styles.addButton} handler={onAddProduct}>
          <span>Add product</span>
        </Button>
      </div>
    </div>
  );
};
