import { Navigate } from "react-router-dom";
import { useAdminRequest } from "../../requests/useAdminRequest";
import { Loader } from "../../components/UI/Loader";
import { Layout } from "../../components/Layout";

export const Admin = () => {
  const { loading, authenticated } = useAdminRequest();

  return (
    <Layout headerText="Admin panel">
      <section>
        {loading && <Loader />}
        {!authenticated && !loading &&
          <Navigate to="/admin-login" replace />
        }
        {authenticated &&
          <div>test</div>
        }
      </section>
    </Layout>
  );
};
