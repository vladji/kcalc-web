import { FC, useState } from 'react';
import { useFetchRecipesByCategory } from '../../requests/recipes/useFetchRecipesByCategory';
import { Loader } from '../../../components/shared/Loader';
import { Item } from './Item';
import { Button } from '../../../components/shared/Button';
import { Modal } from '../../../components/shared/Modal';
import { CreateRecipe } from '../CreateRecipe';
import { RecipeCategoriesEnum } from '../../types/recipes';
import styles from './styles.module.scss';

interface RecipesListProps {
  category: RecipeCategoriesEnum;
}

export const RecipesList: FC<RecipesListProps> = ({ category }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data, loading, refetch } = useFetchRecipesByCategory(category);

  return (
    <>
      {loading && <Loader />}
      <ul className={styles.wrapper}>
        {data.map((recipe) => (
          <Item key={recipe._id} recipe={recipe} refetchRecipes={refetch} />
        ))}
      </ul>
      <Button className={styles.createButton} handler={() => setShowCreateModal(true)} blue>
        <span>Create recipe</span>
      </Button>
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)}>
          <CreateRecipe closeHandler={() => setShowCreateModal(false)} refetchRecipes={refetch} />
        </Modal>
      )}
    </>
  );
};
