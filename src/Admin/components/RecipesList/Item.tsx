import React, { FC, useRef, useState } from 'react';
import { IMAGE_ENDPOINT, RECIPES_IMG_PATH } from '../../constants/common';
import { UploadImage } from '../UploadImage';
import { Input } from '../shared/Input';
import { TextArea } from '../shared/TextArea';
import { Loader } from '../../../components/shared/Loader';
import { Button } from '../../../components/shared/Button';
import { CheckBox } from '../shared/CheckBox';
import { Modal } from '../../../components/shared/Modal';
import { ConfirmModal } from '../ConfirmModal';
import { usePutRecipe } from '../../requests/recipes/usePutRecipe';
import { useFetchRecipesCategories } from '../../requests/recipes/useFetchRecipesCategories';
import { useDeleteRecipe } from '../../requests/recipes/useDeleteRecipe';
import { RecipeCategoriesEnum, RecipeProductsFields, RecipeProps } from '../../types/recipes';
import { ResponseCustom } from '../../requests/types';
import { InputButton } from '../shared/InputButton';
import { DeleteButton } from '../shared/DeleteButton';
import { cloneRecipe, createNewProduct } from './utils';
import { ClonedRecipeProps } from './types';
import styles from './styles.module.scss';

interface ItemProps {
  recipe: RecipeProps;
  refetchRecipes: () => Promise<ResponseCustom<RecipeProps[]> | unknown>;
}

export const Item: FC<ItemProps> = ({ recipe, refetchRecipes }) => {
  const [item, setItem] = useState<ClonedRecipeProps>(cloneRecipe(recipe));
  const [imageName, setImageName] = useState<string>(recipe.image);

  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeDescription, setRecipeDescription] = useState<string>(recipe.recipe.join('. '));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const itemRef = useRef<HTMLLIElement | null>(null);

  const { categories } = useFetchRecipesCategories();
  const { putRecipe } = usePutRecipe();
  const { deleteRecipe, deleteRecipeLoading } = useDeleteRecipe();

  const onImageLoaded = () => {
    const item = itemRef.current;

    const imageWidth = item?.querySelector('img')?.clientWidth;
    const imageHeight = item?.querySelector('img')?.clientHeight;

    const widthElement = item?.querySelector('#image-width');
    const heightElement = item?.querySelector('#image-height');
    if (widthElement && heightElement) {
      widthElement.innerHTML = `${imageWidth}`;
      heightElement.innerHTML = `${imageHeight}`;
    }
  };

  const toggleActive = () => {
    setActive((prev) => !prev);
    setRecipeDescription(recipe.recipe.join('. '));
    setItem(cloneRecipe(recipe));
  };

  const onCategoryChange = (category: RecipeCategoriesEnum) => (checked: boolean) => {
    if (checked) {
      item.category.push(category);
    } else {
      item.category = item.category.filter((itemCategory) => itemCategory !== category);
    }
  };

  const handlerNameChanges = (value: string) => {
    item.name = value;
  };

  const handleDescriptionChanges = (value: string) => {
    setRecipeDescription(value);
  };

  const handleProductsChanges = (field: RecipeProductsFields, value: string, tempId: string) => {
    const product = item.products.find((product) => product.tempId === tempId);
    if (product) {
      product[field] = value;
    }
  };

  const onSaveRecipe = async () => {
    setLoading(true);
    delete item.imageBase64;
    item.image = recipe.image;

    item.recipe = recipeDescription.split('.').map((sentence) => sentence.trim());
    if (item.recipe[item.recipe.length - 1] === '') {
      item.recipe.pop();
    }

    const response = await putRecipe({ recipe: item, recipeId: item._id });

    if (response?.data?.acknowledged) {
      await refetchRecipes();
    }

    setActive(false);
    setLoading(false);
    if (!response?.data?.acknowledged) {
      alert('Что-то пошло не так');
    }
  };

  const onDeleteRecipe = async () => {
    await deleteRecipe({ recipeId: recipe._id });
    await refetchRecipes();
    setShowDeleteConfirm(false);
  };

  const onAddProduct = () => {
    const newItem = structuredClone(item);
    const newProduct = createNewProduct();
    newItem.products.push(newProduct);
    setItem(newItem);
  };

  const onDeleteProduct = (tempId: string) => () => {
    const newProducts = item.products.filter((product) => product.tempId !== tempId);
    const newItem: ClonedRecipeProps = {
      ...item,
      products: newProducts,
    };
    setItem(newItem);
  };

  const imageSrc = `${IMAGE_ENDPOINT}/${RECIPES_IMG_PATH}/${imageName}`;

  return (
    <>
      {loading && <Loader />}
      <li key={item.id} ref={itemRef} className={styles.item}>
        <div className={styles.leftBlock}>
          <div className={styles.imageWrapper}>
            <img onLoad={onImageLoaded} src={imageSrc} alt={item.name} />
          </div>
          <div>
            <div className={styles.imageInfo}>
              <dl>
                <dt>width:</dt>
                <dd id="image-width" />
              </dl>
              <dl>
                <dt>height:</dt>
                <dd id="image-height" />
              </dl>
            </div>
            <UploadImage
              recipeId={item._id}
              refetchRecipes={refetchRecipes}
              setImageName={setImageName}
            />
          </div>
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.textBlock}>
            <div className={styles.categoriesWrapper}>
              {!!categories &&
                categories.map((category) => (
                  <CheckBox
                    key={category}
                    active={active}
                    initialChecked={item.category.some((itemCategory) => itemCategory === category)}
                    text={category}
                    clickHandler={onCategoryChange(category)}
                    isReset={!active}
                  />
                ))}
            </div>
            <Input
              className={styles.inputName}
              initialValue={recipe.name}
              handler={handlerNameChanges}
              isReset={!active}
              active={active}
            />
            <TextArea
              handler={handleDescriptionChanges}
              initialValue={recipeDescription}
              isReset={!active}
              active={active}
            />
            <div className={styles.inputsBlock}>
              {item.products.map((product) => (
                <div key={product.tempId} className={styles.inputsRow}>
                  <DeleteButton handler={onDeleteProduct(product.tempId)} disabled={!active} />
                  <Input
                    className={styles.inputId}
                    initialValue={product.prodId || ''}
                    handler={(value) =>
                      handleProductsChanges(RecipeProductsFields.prodId, value, product.tempId)
                    }
                    isReset={!active}
                    active={active}
                  />
                  <Input
                    className={styles.inputProduct}
                    initialValue={product.prod}
                    handler={(value) =>
                      handleProductsChanges(RecipeProductsFields.prod, value, product.tempId)
                    }
                    isReset={!active}
                    active={active}
                  />
                  <Input
                    initialValue={product.amount}
                    handler={(value) =>
                      handleProductsChanges(RecipeProductsFields.amount, value, product.tempId)
                    }
                    isReset={!active}
                    active={active}
                    type="number"
                  />
                </div>
              ))}
              <div className={styles.buttonWrapper}>
                <InputButton text="Add product" handler={onAddProduct} disabled={!active} brand />
              </div>
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <div className={styles.leftSide}>
              <Button handler={toggleActive} disabled={active} blue>
                <span>Change</span>
              </Button>
              <Button handler={toggleActive} disabled={!active} outlined>
                <span>Cancel</span>
              </Button>
            </div>
            <div className={styles.rightSide}>
              <Button handler={onSaveRecipe} disabled={!active}>
                <span>Save</span>
              </Button>
              <Button handler={() => setShowDeleteConfirm(true)} disabled={!active} outlined>
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </div>
        {showDeleteConfirm && (
          <Modal onClose={() => setShowDeleteConfirm(false)}>
            <ConfirmModal
              confirmHandler={onDeleteRecipe}
              cancelHandler={() => setShowDeleteConfirm(false)}
              loading={deleteRecipeLoading}
            />
          </Modal>
        )}
      </li>
    </>
  );
};
