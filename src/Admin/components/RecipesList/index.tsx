import { FC } from 'react';
import { useFetchRecipesByCategory } from '../../requests/recipes/useFetchRecipesByCategory';
import { Loader } from '../../../components/shared/Loader';
import { Item } from './Item';
import styles from './styles.module.scss';

interface RecipesListProps {
  category: string;
}

export const RecipesList: FC<RecipesListProps> = ({ category }) => {
  const { data, loading, refetch } = useFetchRecipesByCategory(category);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <ul className={styles.wrapper}>
          {data.map((recipe) => (
            <Item key={recipe._id} recipe={recipe} refetchRecipes={refetch} />
          ))}
        </ul>
      )}
    </>
  );
};
