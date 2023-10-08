import { Layout } from "../../components/Layout";
import styles from "./styles.module.scss";
import cn from "classnames";

export const Contacts = () => {
  return (
    <Layout>
      <section className="section-wrapper layout-padding-inline">
        <div className={cn('content-wrapper', styles.content)}>
          <h1>Contact Us</h1>
          <a className='link' href="mailto:elyabaiduan@gmail.com">elyabaiduan@gmail.com</a>
        </div>
      </section>
    </Layout>
  );
};
