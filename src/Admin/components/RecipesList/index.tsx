import { FC, useRef } from 'react';
import { useFetchRecipesByCategory } from '../../requests/recipes/useFetchRecipesByCategory';
import { Loader } from '../../../components/UI/Loader';
import { UploadImage } from '../UploadImage';
import { IMAGE_BASE64_PREFIX } from '../../constants/common';
import styles from './styles.module.scss';

interface RecipesListProps {
  category: string;
}

export const RecipesList: FC<RecipesListProps> = ({ category }) => {
  const itemsRef = useRef<Record<string, HTMLLIElement | null>>({}).current;

  const { data, loading, refetch } = useFetchRecipesByCategory(category);

  const onImageLoaded = (id: string) => {
    const item = itemsRef[id];

    const imageWidth = item?.querySelector('img')?.clientWidth;
    const imageHeight = item?.querySelector('img')?.clientHeight;

    const widthElement = item?.querySelector('#image-width');
    const heightElement = item?.querySelector('#image-height');
    if (widthElement && heightElement) {
      widthElement.innerHTML = `${imageWidth}`;
      heightElement.innerHTML = `${imageHeight}`;
    }
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <ul className={styles.wrapper}>
          {data.map((item) => (
            <li
              key={item.id}
              ref={(ref) => {
                itemsRef[item.id] = ref;
              }}
              className={styles.item}
            >
              <div className={styles.imageWrapper}>
                <img
                  onLoad={() => onImageLoaded(item.id)}
                  src={`${IMAGE_BASE64_PREFIX}${item.imageBase64}`}
                  alt={item.name}
                />
              </div>
              <div>
                <h3>{item.name}</h3>
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
                <UploadImage originName={item.image} recipeId={item._id} refetchRecipes={refetch} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
