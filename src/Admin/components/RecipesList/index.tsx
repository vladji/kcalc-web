import { FC, useState } from 'react';
import { useFetchRecipesByCategory } from '../../requests/recipes/useFetchRecipesByCategory';
import { Loader } from '../../../components/shared/Loader';
import { Item } from './Item';
import { Button } from '../../../components/shared/Button';
import { Modal } from '../../../components/shared/Modal';
import { CreateRecipe } from '../CreateRecipe';
import { useCleanImages } from '../../requests/recipes/useCleanImages';
import { useChangeOrder, useSort } from './useChangeOrder';
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

  const { handleSortOrder, loading: patchRecipeKeyLoading } = useChangeOrder({
    dataSorted,
    category,
    refetch,
  });

  const onCleanImagesHandler = async () => {
    const response = await cleanImages();
    if (response?.data) {
      setNotification(response.data);
    }
  };

  const { loading: sortLoading } = useSort({ data, category, setDataSorted, refetch });

  return (
    <div className={styles.wrapper}>
      {(sortLoading || fetchRecipeLoading || patchRecipeKeyLoading || cleanImagesLoading) && (
        <Loader />
      )}
      <ul className={styles.listWrapper}>
        {dataSorted.map((recipe) => (
          <div key={recipe._id} className={styles.itemWrapper}>
            <select
              className={styles.selectInput}
              value={recipe.sortOrder[category] || undefined}
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
