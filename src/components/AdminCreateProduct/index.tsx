import { FC, Fragment, useRef, useState } from "react";
import cn from "classnames";
import { Item } from "./Item";
import { Button } from "../UI/Button";
import { Loader } from "../UI/Loader";
import { useFetchProductCategories } from "../../requests/useFetchProductCategories";
import { usePostProducts } from "../../requests/usePostProducts";
import { v4 as uuidv4 } from "uuid";
import { ProductProps } from "../../types/products";
import styles from "./styles.module.scss";

interface AdminCreateProductProps {
  onClose: () => void;
  refetchProducts: () => void;
  loadingProducts: boolean;
}

export const AdminCreateProduct: FC<AdminCreateProductProps> = ({
  onClose,
  refetchProducts,
  loadingProducts
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isValid, setIsValid] = useState(true);
  const [itemsCount, setItemsCount] = useState(1);

  const items = Array.from({ length: itemsCount });

  const { categories } = useFetchProductCategories();
  const { postProducts, loading } = usePostProducts();

  const onSaveClick = async () => {
    const fieldsetArray = Array.from((formRef.current as HTMLFormElement).children);
    let isValid = true;

    const newProducts: ProductProps[] = fieldsetArray.map((fieldset) => {
      const inputsArray = Array.from((fieldset as HTMLFieldSetElement).querySelectorAll(".create-product-input"));
      return inputsArray.reduce((acc, input) => {
        const { name, value } = input as HTMLInputElement | HTMLSelectElement;

        if (!value) {
          setIsValid(false);
          isValid = false;
        }

        return {
          ...acc,
          id: uuidv4(),
          [name]: value
        };
      }, {} as ProductProps);
    });

    if (isValid) {
      await postProducts(newProducts);
      await refetchProducts();
      onClose();
    }
  };

  const onAddProductClick = () => {
    setItemsCount((prev) => prev + 1);
  };

  return (
    <div className={styles.modalInner}>
      {(loading || loadingProducts) && <Loader />}
      <h4
        className={cn({ [styles.invalidMessage]: !isValid })}>
        {isValid ? "Create product" : "Необходимо заполнить все поля"}
      </h4>
      <form ref={formRef} className={styles.form}>
        {items.map((_, index) => (
          <Fragment key={index}>
            <Item categories={categories} setItemsCount={setItemsCount} />
          </Fragment>
        ))}
      </form>
      <div className={styles.buttonsWrapper}>
        <Button handler={onSaveClick}>
          <span>Save</span>
        </Button>
        <Button className={styles.addButton} handler={onAddProductClick}>
          <span>Add product</span>
        </Button>
      </div>
    </div>
  );
};
