import React, { useEffect } from "react";
import styles from "./HomePage.module.css";
import AboutUs from "../../components/About/AboutUs";
import InfoCardsList from "../../components/InfoCards/InfoCardsList";
import Testimonials from "../../components/Testimonials/Testimonials";
import { useLocation } from "react-router-dom";
import Booking from "../../components/Booking/Booking";
import VideoSection from "../../components/Video/VideoSection";
import Price from "../../components/Price/Price";

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).targetId) {
      const targetId = (location.state as any).targetId;
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className={styles.homePage}>
      <section id="about" className={styles.section}>
        <AboutUs />
      </section>
      <section id="about" className={styles.section}>
        <InfoCardsList />
      </section>
      <section id="team" className={styles.section}>
        <VideoSection />
      </section>
      <section id="price" className={styles.section}>
        <Price />
      </section>
      <section id="testimonials" className={styles.section}>
        <Testimonials />
      </section>
      <section id="booking" className={styles.section}>
        <Booking />
      </section>
    </div>
  );
};

export default HomePage;
