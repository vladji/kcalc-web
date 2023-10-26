import { FC } from 'react';
import { useFetchRecipesByCategory } from '../../requests/recipes/useFetchRecipesByCategory';
import { Loader } from '../../../components/shared/Loader';
import { Item } from './Item';
import { RecipeCategoriesEnum } from '../../types/recipes';
import styles from './styles.module.scss';

interface RecipesListProps {
  category: RecipeCategoriesEnum;
}

export const RecipesList: FC<RecipesListProps> = ({ category }) => {
  const { data, loading, refetch } = useFetchRecipesByCategory(category);

  return (
    <>
      {loading && <Loader />}
      <ul className={styles.wrapper}>
        {data.map((recipe) => (
          <Item key={recipe._id} recipe={recipe} refetchRecipes={refetch} />
        ))}
      </ul>
    </>
  );
};
