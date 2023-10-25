import { FC, useRef, useState } from 'react';
import { IMAGE_BASE64_PREFIX } from '../../constants/common';
import { UploadImage } from '../UploadImage';
import { Input } from '../shared/Input';
import { TextArea } from '../shared/TextArea';
import { Button } from '../../../components/shared/Button';
import { RecipeProductsFields, RecipeProps } from '../../types/recipes';
import styles from './styles.module.scss';

interface ItemProps {
  recipe: RecipeProps;
  refetchRecipes: () => void;
}

export const Item: FC<ItemProps> = ({ recipe, refetchRecipes }) => {
  const [item, setItem] = useState<RecipeProps>(structuredClone(recipe));

  const itemRef = useRef<HTMLLIElement | null>(null);

  const [active, setActive] = useState<boolean>(false);
  const [recipeDescription, setRecipeDescription] = useState<string>(recipe.recipe.join('. '));

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

  const handlerNameChanges = (value: string) => {
    item.name = value;
  };

  const handleDescriptionChanges = (value: string) => {
    setRecipeDescription(value);
  };

  const handleProductsChanges = (index: number, field: RecipeProductsFields, value: string) => {
    item.products[index][field] = value;
  };

  const onSaveRecipe = () => {
    item.recipe = recipeDescription.split('.').map((sentence) => sentence.trim());
  };

  return (
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
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <div className={styles.leftSide}>
            <Button handler={toggleActive} disabled={false} blue>
              <span>Change</span>
            </Button>
            <Button handler={toggleActive} disabled={false} outlined>
              <span>Cancel</span>
            </Button>
          </div>
          <Button handler={onSaveRecipe}>
            <span>Save</span>
          </Button>
        </div>
      </div>
    </li>
  );
};
