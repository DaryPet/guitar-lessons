import React from "react";
import styles from "./Price.module.css";

interface PricingProps {}

const Pricing: React.FC<PricingProps> = () => {
  return (
    <div id="prices" className={styles.container}>
      <h1 className={styles.title}>Pricing</h1>

      <section className={styles.section}>
        <h2 className={styles.section_title}>
          Lessons{" "}
          <span className={styles.title_description}>
            (includes home visit and all necessary learning materials):
          </span>
        </h2>
        <ul className={styles.list}>
          <li className={styles.items}>
            <div className={styles.discountRibbon}>10-lesson card €665</div>
            <p className={styles.items_name}>
              <span>1 </span>lesson
            </p>
            <p className={styles.items_description}>
              one on one lesson 60 min:
            </p>
            <p className={styles.items_price}>€70</p>
          </li>

          <li className={styles.items}>
            <div className={styles.discountRibbon}>10-lesson card €530</div>
            <p className={styles.items_name}>
              <span>1 </span>lesson
            </p>
            <p className={styles.items_description}>
              one on one lesson 45 min:
            </p>
            <p className={styles.items_price}>€55</p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section_title}>Guitar Rental:</h2>
        <ul className={styles.list}>
          <li className={styles.items}>
            <p className={styles.items_name}>
              <span>Monthly </span>rental
            </p>
            <p className={styles.items_description}>
              Don't have a instrument to practice home?
            </p>
            <p className={styles.items_price}>€50</p>
            {/* <p className={styles.items_description}>
              one on one lesson 45 min:
            </p>
            Monthly rent: <strong>€50</strong> */}
          </li>
          <li className={styles.items}>
            <div className={styles.discountRibbon}> 3 months - €100</div>
            <p className={styles.items_name}>
              <span>10-lesson</span> card holders ONLY.
            </p>
            <p className={styles.items_description}>
              If lessons are not used within this period, additional months will
              be charged at the standard monthly rate.
            </p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>
          Terms & <span className={styles.title_acent}>Conditions:</span>
        </h2>
        <ul className={styles.list_term}>
          <li className={styles.items_term}>
            The 10-lesson card must be used within 6 months.
          </li>
          <li className={styles.items_term}>
            Lessons canceled on the same day by the student will be fully
            charged.
          </li>
          <li className={styles.items_term}>
            The 10-lesson card is non-refundable, but all remaining lessons can
            still be used.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Pricing;
