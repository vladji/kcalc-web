import { FC, useRef, useState } from 'react';
import { IMAGE_BASE64_PREFIX } from '../../constants/common';
import { UploadImage } from '../UploadImage';
import { Input } from '../shared/Input';
import { TextArea } from '../shared/TextArea';
import { Loader } from '../../../components/shared/Loader';
import { Button } from '../../../components/shared/Button';
import { CheckBox } from '../shared/CheckBox';
import { usePatchRecipe } from '../../requests/recipes/usePatchRecipe';
import { useFetchRecipesCategories } from '../../requests/recipes/useFetchRecipesCategories';
import { RecipeCategoriesEnum, RecipeProductsFields, RecipeProps } from '../../types/recipes';
import styles from './styles.module.scss';

interface ItemProps {
  recipe: RecipeProps;
  refetchRecipes: () => void;
}

export const Item: FC<ItemProps> = ({ recipe, refetchRecipes }) => {
  const [item, setItem] = useState<RecipeProps>(structuredClone(recipe));
  const [active, setActive] = useState<boolean>(false);
  const [recipeDescription, setRecipeDescription] = useState<string>(recipe.recipe.join('. '));
  const [loading, setLoading] = useState<boolean>(false);

  const itemRef = useRef<HTMLLIElement | null>(null);

  const { categories } = useFetchRecipesCategories();
  const { patchRecipe } = usePatchRecipe();

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
    setRecipeDescription(recipe.recipe.join('. '));
    setActive((prev) => !prev);
    setItem(structuredClone(recipe));
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

  const handleProductsChanges = (index: number, field: RecipeProductsFields, value: string) => {
    item.products[index][field] = value;
  };

  const onSaveRecipe = async () => {
    setLoading(true);
    item.recipe = recipeDescription.split('.').map((sentence) => sentence.trim());
    if (item.recipe[item.recipe.length - 1] === '') {
      item.recipe.pop();
    }
    const response = await patchRecipe({ recipe: item, recipeId: item._id });
    if (response?.data?.acknowledged) {
      await refetchRecipes();
    }
    setActive(false);
    setLoading(false);
    if (!response?.data?.acknowledged) {
      alert('Что-то пошло не так');
    }
  };

  return (
    <>
      {loading && <Loader />}
      <li key={item.id} ref={itemRef} className={styles.item}>
        <div className={styles.leftBlock}>
          <div className={styles.imageWrapper}>
            <img
              onLoad={onImageLoaded}
              src={`${IMAGE_BASE64_PREFIX}${item.imageBase64}`}
              alt={item.name}
            />
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
              originName={item.image}
              recipeId={item._id}
              refetchRecipes={refetchRecipes}
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
              {item.products.map((product, index) => (
                <div key={index} className={styles.inputsRow}>
                  <Input
                    className={styles.inputId}
                    initialValue={recipe.products[index].prodId || ''}
                    handler={(value) =>
                      handleProductsChanges(index, RecipeProductsFields.prodId, value)
                    }
                    isReset={!active}
                    active={active}
                  />
                  <Input
                    className={styles.inputProduct}
                    initialValue={recipe.products[index].prod}
                    handler={(value) =>
                      handleProductsChanges(index, RecipeProductsFields.prod, value)
                    }
                    isReset={!active}
                    active={active}
                  />
                  <Input
                    initialValue={recipe.products[index].amount}
                    handler={(value) =>
                      handleProductsChanges(index, RecipeProductsFields.amount, value)
                    }
                    isReset={!active}
                    active={active}
                    type="number"
                  />
                </div>
              ))}
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
            <Button handler={onSaveRecipe} disabled={!active}>
              <span>Save</span>
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};
