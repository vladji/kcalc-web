import React, { FC, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Loader } from '../../../components/shared/Loader';
import { Button } from '../../../components/shared/Button';
import { CheckBox } from '../shared/CheckBox';
import { InputButton } from '../shared/InputButton';
import { UploadImage } from '../UploadImage';
import { ProductItem, ProductItemProps } from './ProductItem';
import { useFetchRecipesCategories } from '../../requests/recipes/useFetchRecipesCategories';
import { useFetchRecipeImage } from '../../requests/recipes/useFetchRecipeImage';
import { usePostRecipe } from '../../requests/recipes/usePostRecipe';
import { IMAGE_BASE64_PREFIX } from '../../constants/common';
import { RecipeCategoriesEnum, RecipePostProps, RecipeProductsProps } from '../../types/recipes';
import cn from 'classnames';
import styles from './styles.module.scss';

interface RecipeDescriptionProps {
  name: string;
  recipe: string;
}

interface ProductsListProps {
  id: string;
  Product: FC<ProductItemProps>;
}

export const CreateRecipe = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isValid, setIsValid] = useState(true);
  const [imageName, setImageName] = useState<string>('');
  const [recipeCategories, setRecipeCategories] = useState<RecipeCategoriesEnum[]>([]);

  const [productsList, setProductsList] = useState<ProductsListProps[]>([
    { id: uuidv4(), Product: ProductItem },
  ]);

  const { fetchImage, data } = useFetchRecipeImage();
  const { categories } = useFetchRecipesCategories();
  const { postRecipe, loading } = usePostRecipe();

  const handleFetchImage = async (filename: string) => {
    setImageName(filename);
    await fetchImage({ filename });
  };

  const onChangeCategory = (category: RecipeCategoriesEnum) => (checked: boolean) => {
    if (checked) {
      setRecipeCategories((prev) => [...prev, category]);
    } else {
      const newList = recipeCategories.filter((itemCategory) => itemCategory !== category);
      setRecipeCategories(newList);
    }
  };

  const onAddProduct = () => {
    setProductsList((prev) => [...prev, { id: uuidv4(), Product: ProductItem }]);
  };

  const onDeleteProduct = (id: string) => {
    const newList = productsList.filter((product) => product.id !== id);
    setProductsList(newList);
  };

  const onSave = async () => {
    let isValid = !!imageName && !!recipeCategories.length;

    if (formRef?.current) {
      const descriptionsArray = Array.from(formRef.current.querySelectorAll('.input'));
      const productsArray = Array.from(formRef.current.querySelectorAll('.product-item'));

      const description = descriptionsArray.reduce((acc, item) => {
        const { name, value } = item as HTMLInputElement;
        if (!value) isValid = false;

        return {
          ...acc,
          [name]: value,
        };
      }, {} as RecipeDescriptionProps);

      const products = productsArray.map((item) => {
        return Array.from(item.querySelectorAll('.product-input')).reduce((acc, input) => {
          const { name, value } = input as HTMLInputElement;
          if (!value) isValid = false;

          return {
            ...acc,
            [name]: value,
          };
        }, {} as RecipeProductsProps);
      });

      setIsValid(isValid);

      if (isValid) {
        const recipe: RecipePostProps = {
          id: uuidv4(),
          category: recipeCategories,
          name: description.name,
          image: imageName,
          products,
          recipe: description.recipe.split('.'),
        };

        await postRecipe({ recipe });
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {loading && <Loader />}
      <h4 className={cn({ [styles.invalidMessage]: !isValid })}>
        {isValid ? 'Create recipe' : 'Необходимо заполнить все поля'}
      </h4>
      <div className={styles.inner}>
        <div>
          <div className={styles.imageWrapper}>
            {!!data.length && <img src={`${IMAGE_BASE64_PREFIX}${data[0]}`} alt="image" />}
          </div>
          <UploadImage fetchImage={handleFetchImage} />
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.categoriesWrapper}>
            {!!categories?.length &&
              categories?.map((category, index) => (
                <CheckBox
                  key={index}
                  active={true}
                  initialChecked={false}
                  text={category}
                  clickHandler={onChangeCategory(category)}
                  isReset={false}
                />
              ))}
          </div>
          <form ref={formRef} className={styles.form}>
            <div className={styles.block}>
              <label>name</label>
              <input className="input" type="text" name="name" />
            </div>
            <div className={styles.block}>
              <label>recipe</label>
              <textarea className="input" name="recipe" cols={60} rows={5} />
            </div>
            <fieldset className={styles.block}>
              <legend>products</legend>
              {productsList.map((item) => (
                <item.Product
                  key={item.id}
                  id={item.id}
                  productsCount={productsList.length}
                  deleteHandler={onDeleteProduct}
                />
              ))}
              <InputButton
                className={styles.inputButton}
                text="Add product"
                handler={onAddProduct}
              />
            </fieldset>
          </form>
          <div className={styles.submitBlock}>
            <Button handler={onSave}>
              <span>Save</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};