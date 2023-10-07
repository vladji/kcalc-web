import { Navigate } from "react-router-dom";
import { useAdminRequest } from "../../requests/useAdminRequest";
import { Layout } from "../../components/Layout";

export const Admin = () => {
  const { loading, authenticated } = useAdminRequest();

  return (
    <Layout loading={loading} headerText="Admin panel" linkTo="#" isAdmin={true}>
      {!authenticated && !loading &&
        <Navigate to="/admin-login" replace />
      }
      {authenticated &&
        <section className="section-wrapper">

        </section>
      }
    </Layout>
  );
};
