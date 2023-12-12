import { FC, useEffect, useState } from 'react';
import { useFetchRecipesByCategory } from '../../requests/recipes/useFetchRecipesByCategory';
import { Loader } from '../../../components/shared/Loader';
import { Item } from './Item';
import { Button } from '../../../components/shared/Button';
import { Modal } from '../../../components/shared/Modal';
import { CreateRecipe } from '../CreateRecipe';
import { useCleanImages } from '../../requests/recipes/useCleanImages';
import { useChangeOrder } from './useChangeOrder';
import { RecipeCategoriesEnum, RecipeProps } from '../../types/recipes';
import styles from './styles.module.scss';

interface RecipesListProps {
  category: RecipeCategoriesEnum;
}

export const RecipesList: FC<RecipesListProps> = ({ category }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notification, setNotification] = useState<string>('');

  const [dataSorted, setDataSorted] = useState<RecipeProps[]>([]);

  const { data, loading: fetchRecipeLoading, refetch } = useFetchRecipesByCategory(category);
  const { cleanImages, loading: cleanImagesLoading } = useCleanImages();

  useEffect(() => {
    if (data.length) {
      const sorted = data.sort((a, b) => (a.key || 0) - (b.key || 0));
      setDataSorted(sorted);
    }
  }, [data]);

  const { handleSortOrder, loading: patchRecipeKeyLoading } = useChangeOrder({
    dataSorted,
    refetch,
  });

  const onCleanImagesHandler = async () => {
    const response = await cleanImages();
    if (response?.data) {
      setNotification(response.data);
    }
  };

  return (
    <div className={styles.wrapper}>
      {(fetchRecipeLoading || patchRecipeKeyLoading || cleanImagesLoading) && <Loader />}
      <ul className={styles.listWrapper}>
        {dataSorted.map((recipe) => (
          <div key={recipe._id} className={styles.itemWrapper}>
            <select
              className={styles.selectInput}
              value={recipe.key || undefined}
              onChange={(e) => {
                handleSortOrder({ id: recipe._id, orderNumber: Number(e.target.value) });
              }}
            >
              {dataSorted.map((item, index) => (
                <option key={item._id}>{index + 1}</option>
              ))}
            </select>
            <Item recipe={recipe} refetchRecipes={refetch} />
          </div>
        ))}
      </ul>
      <div className={styles.controlPanelWrapper}>
        <div className={styles.leftSide}>
          <Button handler={() => setShowCreateModal(true)} blue>
            <span>Create recipe</span>
          </Button>
          <Button handler={() => null} blue>
            <span>Save sorting</span>
          </Button>
        </div>
        <Button handler={onCleanImagesHandler} outlined>
          <span>Clean images</span>
        </Button>
        {showCreateModal && (
          <Modal onClose={() => setShowCreateModal(false)}>
            <CreateRecipe
              closeHandler={() => setShowCreateModal(false)}
              refetchRecipes={refetch}
              recipeKey={data.length}
            />
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
