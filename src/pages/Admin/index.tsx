import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdminRequest } from "../../requests/useAdminRequest";
import { Layout } from "../../components/Layout";
import { AdminProductCategories } from "../../components/AdminProductCategories";
import { AdminProductsList } from "../../components/AdminProductsList";
import { DEFAULT_CATEGORY } from "./constants";
import styles from "./styles.module.scss";

const currentCategory = localStorage.getItem("currentProductCategory") || DEFAULT_CATEGORY;

export const Admin = () => {
  const [activeCategory, setActiveCategory] = useState<string>(currentCategory);

  const { loading, authenticated } = useAdminRequest();

  return (
    <Layout loading={loading} headerText="Admin" linkTo="#" isAdmin={true}>
      {!authenticated && !loading &&
        <Navigate to="/admin-login" replace />
      }
      {authenticated &&
        <div className={styles.content}>
          <AdminProductCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          <AdminProductsList category={activeCategory} />
        </div>
      }
    </Layout>
  );
};
