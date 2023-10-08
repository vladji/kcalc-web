import { Link } from "react-router-dom";
import cn from "classnames";
import { Layout } from "../../components/Layout";
import styles from "./styles.module.scss";

export const Home = () => {
  return (
    <Layout>
      <section className="section-wrapper layout-padding-inline">
        <div className={cn("content-wrapper", styles.content)}>
          <Link className="link" to="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="link" to="/contacts">
            Contact Us
          </Link>
        </div>
      </section>
    </Layout>
  );
};
