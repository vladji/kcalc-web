import { Link, useRouteError } from "react-router-dom";
import { Layout } from "../../components/Layout";

export const ErrorPage = () => {
  const { statusText, message } = useRouteError() as { statusText: string; message: string } || {
    statusText: "",
    message: ""
  };

  return (
    <Layout>
      <section className="section-wrapper">
        <div className="content-wrapper">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{statusText || message}</i>
          </p>
          <Link to="/">
            Home page
          </Link>
        </div>
      </section>
    </Layout>
  );
};
