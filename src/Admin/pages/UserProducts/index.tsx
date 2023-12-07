import React from 'react';
import { Layout } from '../../../components/Layout';
import { Loader } from '../../../components/shared/Loader';
import { InputButton } from '../../components/shared/InputButton';
import { useFetchUserProducts } from '../../requests/products/useFetchUserProducts';
import { useDeleteUserProduct } from '../../requests/products/useDeleteUserProduct';
import { tableHeaders } from './content';
import cn from 'classnames';
import styles from './styles.module.scss';

export const UserProducts = () => {
  const { data, isLoading, refetch } = useFetchUserProducts();
  const { deleteUserProduct, loading: deleteProductLoading } = useDeleteUserProduct(refetch);

  return (
    <Layout headerText="Admin" linkTo="/admin" isAdmin>
      <div className={styles.wrapper}>
        {(isLoading || deleteProductLoading) && <Loader />}
        {!!data?.length && (
          <>
            <ul className={styles.row}>
              {tableHeaders.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul className={styles.productsList}>
              {data.map((item) => (
                <li key={item._id} className={cn(styles.row, styles.item)}>
                  <span>{item.name}</span>
                  <span>{item.proteins}</span>
                  <span>{item.fat}</span>
                  <span>{item.carbohydrates}</span>
                  <span>{item.kcal}</span>
                  <InputButton
                    className={styles.buttonCell}
                    text="Delete"
                    handler={() => deleteUserProduct(item._id)}
                    alert
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Layout>
  );
};
