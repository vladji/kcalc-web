import cn from "classnames";
import { Layout } from "../../components/Layout";
import styles from "./styles.module.scss";

export const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="section-wrapper">
        <div className={cn("content-wrapper", styles.content)}>
          <h1 className={cn(styles.title, styles.h1)}>Currency Converter</h1>
          <h2 className={cn(styles.title, styles.h2)}>Privacy Policy</h2>
          <p className={styles.mt1}>Last Updated June 22, 2023</p>
          <p className={styles.mt1}>
            Elvira Ospanova operates the website and the "kCalc" mobile application
            (hereinafter referred to as the "Service"). This policy applies to all information that is collected or
            submitted through the "kCalc" mobile application.
          </p>
          <p>
            We use your data to provide and improve the Service. By using the Service, you agree to the collection and
            use of information in accordance with this policy.
          </p>
          <h3 className={styles.h3}>Types of Data Collected</h3>
          <h4>Personal Data</h4>
          <p>While using our Service, we may ask you to provide us with certain personally identifiable information that
            can be used to contact or identify you ("Personal Data"). Personally identifiable information may include,
            but is not limited to:
            - Cookies and Usage Data<br />
            - Android Advertising ID<br />
          </p>
          <h4>Usage Data</h4>
          <p>
            We may also collect information that your browser sends whenever you visit our Service or when you access
            the Service by or through a mobile device ("Usage Data").<br />
            This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address),
            browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the
            time spent on those pages, unique device identifiers and other diagnostic data.<br />
            When you access the Service with a mobile device, this Usage Data may include information such as the type
            of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile
            operating system, the type of mobile Internet browser you use, unique device identifiers and other
            diagnostic data.
          </p>
          <h4>Android Advertising ID</h4>
          <p>
            The advertising ID is a unique, user-resettable ID for advertising, provided by Google Play services.
            Further information about the Android Advertising ID can be viewed at&nbsp;
            <a className={styles.link}
               href="https://support.google.com/googleplay/android-developer/answer/6048248?hl=en"
               rel="noopener noreferrer"
               target="_blank">
              https://support.google.com/googleplay/android-developer/answer/6048248?hl=en
            </a>
          </p>
          <h3 className={styles.h3}>Use of Data</h3>
          <p className={styles.mt1}>
            kCalc uses the collected data for various purposes:<br />
            - to provide and maintain our Service<br />
            - to notify you about changes to our Service<br />
            - to provide customer support<br />
            - to gather analysis or valuable information so that we can improve our Service<br />
            - to monitor the usage of our Service
          </p>
          <h3 className={styles.h3}>Legal Basis for Processing Personal Data under the General Data Protection
            Regulation (GDPR)
          </h3>
          <p className={styles.mt1}>
            If you are from the European Economic Area (EEA), kCalc legal basis for collecting and using
            the personal information described in this Privacy Policy depends on the Personal Data we collect and the
            specific context in which we collect it.
          </p>
          <p className={styles.mt1}>
            kCalc may process your Personal Data because:<br />
            - you have given us permission to do so<br />
            - the processing is in our legitimate interests and it is not overridden by your rights<br />
            - for payment processing purposes<br />
            - to comply with the law<br />
          </p>
          <h3 className={styles.h3}>Retention of Data</h3>
          <p className={styles.mt1}>
            kCalc will retain your Personal Data only for as long as is necessary for the purposes set out
            in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our
            legal obligations (for example, if we are required to retain your data to comply with applicable laws),
            resolve disputes and enforce our legal agreements and policies.
          </p>
          <h3 className={styles.h3}>Transfer of Data</h3>
          <p className={styles.mt1}>
            Your information, including Personal Data, may be transferred to — and maintained on — computers located
            outside of your state, province, country or other governmental jurisdiction where the data protection laws
            may differ from those of your jurisdiction.<br />
            Your consent to this Privacy Policy followed by your submission of such information represents your
            agreement to that transfer.<br />
            kCalc will take all the steps reasonably necessary to ensure that your data is treated securely
            and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an
            organisation or a country unless there are adequate controls in place including the security of your data
            and other personal information.
          </p>
          <h3 className={styles.h3}>Disclosure of Data</h3>
          <h4>Business Transaction</h4>
          <p>
            If kCalc is involved in a merger, acquisition or asset sale, your Personal Data may be
            transferred. We will provide notice before your Personal Data is transferred and becomes subject to a
            different Privacy Policy.
          </p>
          <h3 className={styles.h3}>Disclosure for Law Enforcement</h3>
          <p className={styles.mt1}>
            Under certain circumstances, Universal Currency may be required to disclose your Personal Data if required
            to do so by law or in response to valid requests by public authorities (e.g. a court or a government
            agency).
          </p>
          <h3 className={styles.h3}>Legal Requirements</h3>
          <p className={styles.mt1}>kCalc may disclose your Personal Data in the good faith belief that
            such action is necessary to:<br />
            - to comply with a legal obligation<br />
            - to protect and defend the rights or property of kCalc<br />
            - to prevent or investigate possible wrongdoing in connection with the Service<br />
            - to protect the personal safety of users of the Service or the public<br />
            - to protect against legal liability
          </p>
          <h3>Security of Data</h3>
          <p className={styles.h3}>
            The security of your data is important to us but remember that no method of transmission over the Internet
            or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
            protect your Personal Data, we cannot guarantee its absolute security.
          </p>
          <h3>Advertising</h3>
          <p className={styles.mt1}>
            We may use third-party Service Providers to show advertisements to you to help support and maintain our
            Service.
          </p>
          <h4>AdMob by Google</h4>
          <p>
            AdMob by Google is provided by Google Inc.<br />
            You can opt-out from the AdMob by Google service by following the instructions described by Google:&nbsp;
            <a
              className={styles.link}
              href="https://support.google.com/ads/answer/2662922?hl=en"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://support.google.com/ads/answer/2662922?hl=en
            </a>
          </p>
          <p className={styles.mt1}>
            For more information on how Google uses the collected information, please visit the "How Google uses data
            when you use our partners' sites or app" page:&nbsp;
            <a
              className={styles.link}
              rel="noopener noreferrer"
              target="_blank"
              href="http://www.google.com/policies/privacy/partners/">http://www.google.com/policies/privacy/partners/
            </a>
          </p>
          <h3>Payments</h3>
          <p className={styles.mt1}>
            We may provide paid products and/or services within the Service. In that case, we use third-party services
            for payment processing (e.g. payment processors).
          </p>
          <p className={styles.mt1}>
            We will not store or collect your payment card details. That information is provided directly to our
            third-party payment processors whose use of your personal information is governed by their Privacy Policy.
            These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards
            Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover. PCI-DSS
            requirements help ensure the secure handling of payment information.
          </p>
          <p className={styles.mt1}>
            The payment processors we work with are:
          </p>
          <p className={styles.mt1}>
            <span className={styles.bold}>Google Play In-App Payments</span><br />
            Their Privacy Policy can be viewed at&nbsp;
            <a
              className={styles.link}
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.google.com/policies/privacy/">
              https://www.google.com/policies/privacy/
            </a>
          </p>
          <p className={styles.mt1}>
            <span className={styles.bold}>Apple App Store In-App Payments</span><br />
            Their Privacy Policy can be viewed at&nbsp;
            <a
              className={styles.link}
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.apple.com/legal/privacy/en-ww/">
              https://www.apple.com/legal/privacy/en-ww/
            </a>
          </p>
          <p className={styles.mt1}>
            Please note that the privacy practices of Google Play In-App Payments and Apple App Store In-App Payments
            are governed by their respective providers' Privacy Policies. By using the payment services provided by
            Google and Apple, you agree to their terms and conditions and acknowledge that your personal information
            will be processed in accordance with their Privacy Policies.
          </p>
          <h3>Links to Other Sites</h3>
          <p className={styles.mt1}>
            Our Service may contain links to other sites that are not operated by us. If you click a third party link,
            you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of
            every site you visit.
          </p>
          <p className={styles.mt1}>
            We have no control over and assume no responsibility for the content, privacy policies or practices of any
            third party sites or services.
          </p>
          <h3>Children's Privacy</h3>
          <p className={styles.mt1}>
            Our Service does not address anyone under the age of 12 ("Children").<br />
            We do not knowingly collect personally identifiable information from anyone under the age of 12. If you are
            a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact
            us. If we become aware that we have collected Personal Data from children without verification of parental
            consent, we take steps to remove that information from our servers.
          </p>
          <h3>Changes to This Privacy Policy</h3>
          <p className={styles.mt1}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page.<br />
            We will let you know via email and/or a prominent notice on our Service, prior to the change becoming
            effective and update the "effective date" at the top of this Privacy Policy.<br />
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
            are effective when they are posted on this page.
          </p>
          <h3>Contact Us</h3>
          <p className={styles.mt1}>
            If you have any questions about this Privacy Policy, please contact us:<br />
            <a className={styles.link} href="mailto:elyabaiduan@gmail.com">elyabaiduan@gmail.com</a>
          </p>
        </div>
      </section>
    </Layout>
  );
};
