import React from "react";
import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaInstagram,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.navLinks}>
          <h3>
            Quick <span>Links</span>
          </h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/#about">About Us</a>
            </li>
            <li>
              <a href="/#video">Video</a>
            </li>
            <li>
              <a href="/#testimonials">Testimonials</a>
            </li>
            <li>
              <a href="/booking">Book a Lesson</a>
            </li>
          </ul>
        </div>

        <div className={styles.contactInfo}>
          <h3>Contact Us</h3>
          <p>
            <FaEnvelope className={styles.icon} />
            <a href="mailto:guitarlessons.munich@gmail.com">
              guitarlessons.munich@gmail.com
            </a>
          </p>
          <p>
            <FaPhone className={styles.icon} />{" "}
            <a href="tel:+4917643213372">+4917643213372</a>
          </p>
        </div>
        <div className={styles.socialLinks}>
          <h3>Follow Us</h3>
          <div className={styles.icons}>
            <a
              href="https://www.facebook.com/share/olexii.ivanenko"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://t.me/lesitar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://wa.me/+4917643213372"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/lesson.guitars"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className={styles.newsletter}>
          <h3>
            Subscribe to <span>Our Newsletter</span>
          </h3>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} GuitarLessons. All rights reserved.
        </p>
        <ul className={styles.footerLinks}>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-service">Terms of Service</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
