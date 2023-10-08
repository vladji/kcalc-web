import { Navigate } from "react-router-dom";
import { useAdminRequest } from "../../requests/useAdminRequest";
import { Layout } from "../../components/Layout";
import { ProductCategories } from "../../components/ProductCategories";
import styles from "./styles.module.scss";

export const Admin = () => {
  const { loading, authenticated } = useAdminRequest();

  return (
    <Layout loading={loading} headerText="Admin" linkTo="#" isAdmin={true}>
      {!authenticated && !loading &&
        <Navigate to="/admin-login" replace />
      }
      {authenticated &&
        <div className={styles.content}>
          <ProductCategories />
        </div>
      }
    </Layout>
  );
};
