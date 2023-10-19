import { Navigate } from 'react-router-dom';
import { useAdminRequest } from '../../requests/useAdminRequest';
import { Layout } from '../../../components/Layout';
import { Dashboard } from '../../components/Dashboard';

export const AdminHome = () => {
  const { loading, authenticated } = useAdminRequest();

  return (
    <Layout loading={loading} headerText="Admin" linkTo="#" isAdmin={authenticated}>
      {!authenticated && !loading && <Navigate to="/admin-login" replace />}
      {authenticated && <Dashboard />}
    </Layout>
  );
};
