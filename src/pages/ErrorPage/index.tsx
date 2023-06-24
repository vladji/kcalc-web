import { Link, useRouteError } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Section } from '../../components/UI/Section';

export const ErrorPage = () => {
  const { statusText, message } = useRouteError() as { statusText: string; message: string } || {
    statusText: '',
    message: ''
  };

  return (
    <Layout>
      <Section>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{statusText || message}</i>
        </p>
        <Link to="/">
          Home page
        </Link>
      </Section>
    </Layout>
  );
};
