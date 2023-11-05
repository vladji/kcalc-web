import { FC, useState } from 'react';
import { useFetchRecipesByCategory } from '../../requests/recipes/useFetchRecipesByCategory';
import { Loader } from '../../../components/shared/Loader';
import { Item } from './Item';
import { Button } from '../../../components/shared/Button';
import { Modal } from '../../../components/shared/Modal';
import { CreateRecipe } from '../CreateRecipe';
import { useCleanImages } from '../../requests/recipes/useCleanImages';
import { RecipeCategoriesEnum } from '../../types/recipes';
import styles from './styles.module.scss';

interface RecipesListProps {
  category: RecipeCategoriesEnum;
}

export const RecipesList: FC<RecipesListProps> = ({ category }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notification, setNotification] = useState<string>('');

  const { data, loading, refetch } = useFetchRecipesByCategory(category);
  const { cleanImages, loading: cleanImagesLoading } = useCleanImages();

  const onCleanImagesHandler = async () => {
    const response = await cleanImages();
    if (response?.data) {
      setNotification(response.data);
    }
  };

  return (
    <div className={styles.wrapper}>
      {(loading || cleanImagesLoading) && <Loader />}
      <ul className={styles.listWrapper}>
        {data.map((recipe) => (
          <Item key={recipe._id} recipe={recipe} refetchRecipes={refetch} />
        ))}
      </ul>
      <div className={styles.controlPanelWrapper}>
        <Button handler={() => setShowCreateModal(true)} blue>
          <span>Create recipe</span>
        </Button>
        <Button handler={onCleanImagesHandler} outlined>
          <span>Clean images</span>
        </Button>
        {showCreateModal && (
          <Modal onClose={() => setShowCreateModal(false)}>
            <CreateRecipe closeHandler={() => setShowCreateModal(false)} refetchRecipes={refetch} />
          </Modal>
        )}
        {notification && (
          <Modal onClose={() => setNotification('')}>
            <p>{notification}</p>
          </Modal>
        )}
      </div>
    </div>
  );
};
