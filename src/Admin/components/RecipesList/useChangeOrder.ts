import { usePatchRecipeKey } from '../../requests/recipes/usePatchRecipeKey';
import { RecipeProps } from '../../types/recipes';
import { ResponseCustom } from '../../requests/types';

type HandleSortOrder = ({ id, orderNumber }: { id: string; orderNumber: number }) => void;

type UseChangeOrder = ({
  dataSorted,
  refetch,
}: {
  dataSorted: RecipeProps[];
  refetch: () => Promise<ResponseCustom<RecipeProps[]> | unknown>;
}) => {
  handleSortOrder: HandleSortOrder;
  loading: boolean;
};

export const useChangeOrder: UseChangeOrder = ({ dataSorted, refetch }) => {
  const { patchRecipeKey, loading } = usePatchRecipeKey();

  const handleSortOrder: HandleSortOrder = async ({ id, orderNumber }) => {
    const clonedOrder: RecipeProps[] = structuredClone(dataSorted);

    const targetItem = clonedOrder.find((item) => item._id === id) as RecipeProps;
    const oldKey = targetItem.key;
    targetItem.key = orderNumber;

    clonedOrder.sort((a, b) => a.key - b.key);

    const newOrder = clonedOrder.map((item) => {
      if (oldKey < orderNumber) {
        if (item.key < orderNumber) {
          return {
            ...item,
            key: item.key - 1,
          };
        }

        if (item.key === orderNumber && item._id !== id) {
          return {
            ...item,
            key: item.key - 1,
          };
        }

        if (item.key === orderNumber && item._id === id) {
          return item;
        }

        if (item.key > orderNumber) {
          return item;
        }
      }

      if (oldKey > orderNumber) {
        if (item.key < orderNumber) {
          return item;
        }

        if (item.key === orderNumber && item._id !== id) {
          return {
            ...item,
            key: item.key + 1,
          };
        }

        if (item.key === orderNumber && item._id === id) {
          return item;
        }

        if (item.key > orderNumber && item.key < oldKey) {
          return {
            ...item,
            key: item.key + 1,
          };
        }

        if (item.key > orderNumber && item.key > oldKey) {
          return item;
        }
      }
      return item;
    });

    await patchRecipeKey({ data: newOrder.map((item) => ({ id: item?._id, key: item?.key })) });
    await refetch();
  };

  return {
    handleSortOrder,
    loading,
  };
};
