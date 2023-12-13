import { usePatchRecipeKey } from '../../requests/recipes/usePatchRecipeKey';
import { RecipeCategoriesEnum, RecipeProps } from '../../types/recipes';
import { ResponseCustom } from '../../requests/types';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { RecipeKeyDataProps } from '../../requests/recipes/types';

type HandleSortOrder = ({ id, orderNumber }: { id: string; orderNumber: number }) => void;

type UseChangeOrder = ({
  dataSorted,
  refetch,
}: {
  dataSorted: RecipeProps[];
  category: RecipeCategoriesEnum;
  refetch: () => Promise<ResponseCustom<RecipeProps[]> | unknown>;
}) => {
  handleSortOrder: HandleSortOrder;
  loading: boolean;
};

export const useChangeOrder: UseChangeOrder = ({ dataSorted, category, refetch }) => {
  const { patchRecipeKey, loading } = usePatchRecipeKey();

  const handleSortOrder: HandleSortOrder = async ({ id, orderNumber }) => {
    const clonedOrder: RecipeProps[] = structuredClone(dataSorted);

    const targetItem = clonedOrder.find((item) => item._id === id) as RecipeProps;
    const oldKey = targetItem.sortOrder[category];
    targetItem.sortOrder[category] = orderNumber;

    clonedOrder.sort((a, b) => a.sortOrder[category] - b.sortOrder[category]);

    const newOrder = clonedOrder.map((item) => {
      if (oldKey < orderNumber) {
        if (item.sortOrder[category] < oldKey) {
          return item;
        }

        if (item.sortOrder[category] < orderNumber && item.sortOrder[category] > oldKey) {
          return {
            ...item,
            sortOrder: {
              ...item.sortOrder,
              [category]: item.sortOrder[category] - 1,
            },
          };
        }

        if (item.sortOrder[category] === orderNumber && item._id !== id) {
          return {
            ...item,
            sortOrder: {
              ...item.sortOrder,
              [category]: item.sortOrder[category] - 1,
            },
          };
        }

        if (item.sortOrder[category] === orderNumber && item._id === id) {
          return item;
        }

        if (item.sortOrder[category] > orderNumber) {
          return item;
        }
      }

      if (oldKey > orderNumber) {
        if (item.sortOrder[category] < orderNumber) {
          return item;
        }

        if (item.sortOrder[category] === orderNumber && item._id !== id) {
          return {
            ...item,
            sortOrder: {
              ...item.sortOrder,
              [category]: item.sortOrder[category] + 1,
            },
          };
        }

        if (item.sortOrder[category] === orderNumber && item._id === id) {
          return item;
        }

        if (item.sortOrder[category] > orderNumber && item.sortOrder[category] < oldKey) {
          return {
            ...item,
            sortOrder: {
              ...item.sortOrder,
              [category]: item.sortOrder[category] + 1,
            },
          };
        }

        if (item.sortOrder[category] > orderNumber && item.sortOrder[category] > oldKey) {
          return item;
        }
      }
      return item;
    });

    await patchRecipeKey({
      category,
      data: newOrder.map((item) => ({ id: item._id, key: item.sortOrder[category] })),
    });
    await refetch();
  };

  return {
    handleSortOrder,
    loading,
  };
};

type UseSort = ({
  data,
  category,
  setDataSorted,
  refetch,
}: {
  data: RecipeProps[];
  category: RecipeCategoriesEnum;
  setDataSorted: Dispatch<SetStateAction<RecipeProps[]>>;
  refetch: () => Promise<ResponseCustom<RecipeProps[]> | unknown>;
}) => { loading: boolean };

export const useSort: UseSort = ({ data, category, setDataSorted, refetch }) => {
  const { patchRecipeKey, loading } = usePatchRecipeKey();

  const reorder = async (sorted: RecipeProps[]) => {
    const newOrderData: RecipeKeyDataProps[] = sorted.map((item, index) => {
      return {
        id: item._id,
        key: index + 1,
      };
    });

    await patchRecipeKey({ data: newOrderData, category });
    await refetch();
  };

  useEffect(() => {
    if (data.length) {
      const sorted = data.sort((a, b) => a.sortOrder[category] - b.sortOrder[category]);

      for (let i = 0; i < sorted.length - 1; i++) {
        if (
          sorted[i].sortOrder[category] === sorted[i + 1].sortOrder[category] ||
          sorted[i].sortOrder[category] + 1 !== sorted[i + 1].sortOrder[category]
        ) {
          reorder(sorted);
          break;
        }
      }
      setDataSorted(sorted);
    }
  }, [data]);

  return {
    loading,
  };
};
