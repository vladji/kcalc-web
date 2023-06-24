import { Layout } from '../../components/Layout';
import { Section } from '../../components/UI/Section';
import { Content } from '../../components/UI/Content';
import styles from './styles.module.scss';

export const PrivacyPolicy = () => {
  return (
    <Layout>
      <Section>
        <Content className={styles.content}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p>
            This policy applies to all information that is collected or submitted through the eRates mobile application
            (hereinafter referred to as the &quot;Service&quot;).
          </p>
          <p>
            The Service does not collect any personal information such as your name, email address or phone number. All
            of
            your app settings are stored on your device — not on our servers. If you are using an iOS device, this
            information may also be stored in iCloud so that it is synchronized with your other iOS devices.
          </p>
          <h2>Ads and Analytics</h2>
          <p>
            The Service uses third-party services that may collect information that can be used to identify you.
          </p>
          <p>
            The Service is integrated with Google’s AdMob and Analytics, which allows to serve advertisements within
            the app.
            Google may collect and use personal data, including your device’s advertising ID, in order to serve
            advertisements.
          </p>
          <p>
            You may wish to review&nbsp;<a href="https://policies.google.com/privacy" rel="noopener noreferrer">Google’s
            Privacy Policy</a>.
          </p>
          <h2>
            Your Consent
          </h2>
          <p>
            By using the eRates application, you agree to this Privacy Policy.
          </p>
          <h2>
            Contact
          </h2>
          <p>
            If you have any questions about this privacy policy, you can email us at&nbsp;
            <a href="mailto:vladjidev@gmail.com">vladjidev@gmail.com</a>
          </p>
        </Content>
      </Section>
    </Layout>
  );
};
