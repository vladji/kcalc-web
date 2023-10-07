import { Navigate } from "react-router-dom";
import { useAdminRequest } from "../../requests/useAdminRequest";
import { Section } from "../../components/UI/Section";
import { Loader } from "../../components/UI/Loader";

export const Admin = () => {
  const { loading, authenticated } = useAdminRequest();

  return (
    <Section>
      {loading && <Loader />}
      {!authenticated && !loading &&
        <Navigate to="/admin-login" replace />
      }
      {authenticated &&
        <h3 className="h3">Admin panel</h3>
      }
    </Section>
  );
};
