import React from "react";
import styles from "./AboutUs.module.css";
import aboutImage from "../../assets/images/IMG_4756.jpeg";
import { useNavigate } from "react-router-dom";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.title}>About</h2>
      <img src={aboutImage} alt="about" className={styles.image} />
      <p className={styles.description}>
        An experienced expert teaches guitar: classical music; popular music;
        musical notation; song accompaniment; chords; tablature; the basics of
        playing electric instruments (solo, bass). Individual approach to each
        student; developing an individual curriculum for each student. All ages
        are welcome. Giving lessons at your home or at your office at times
        which are convenient for you. Lessons can be taught in English, German,
        Ukrainian or Russian.
      </p>
      <p className={styles.description}>
        From a very young age, I was deeply sensitive to music. Every melody I
        heard on the radio influenced my mood, stirring emotions in ways I
        didn’t fully understand at the time. At the age of five, I had a
        life-changing moment: I heard my slightly older neighbor playing the
        piano.It felt like magic. Under her fingertips, the piano—a seemingly
        lifeless object—created profoundly beautiful sounds that could reach the
        most intimate corners of the soul, uplifting the spirit or moving one to
        tears. From that moment on, I knew I wanted to make music. I begged my
        parents to enroll me in music school, and after two years, they realized
        I wasn’t joking.
      </p>
      <p className={styles.description}>
        We couldn’t afford a piano, but my father’s guitar—hanging unused on the
        wall—became my first instrument. This marked the beginning of my
        journey.
      </p>
      <p className={styles.description}>
        I graduated with honors from music school and went on to study at a
        music college before earning my Master’s degree in Musical Arts at Kyiv
        National University of Culture and Arts. There, I studied under the
        accomplished guitarist and symphony orchestra conductor Viktoriya
        Zhadyko. Even as a student, I began teaching, blending the techniques of
        my own teachers with my personal experiences as a learner. By the time I
        completed my studies, I had already gained significant experience
        teaching in public and private music schools, as well as offering
        private lessons to individuals and groups of all ages.
      </p>
      <p className={styles.description}>
        With over 20 years of teaching experience, I can confidently say that
        motivation is the key to success. My priority is to inspire and maintain
        my students’ motivation. Once that is achieved, other factors—such as
        age, natural talent, or time constraints—become less significant. I
        believe that playing the guitar is more than just a hobby. It’s a
        transformative activity that nurtures the mind, enriches emotional
        intelligence, builds character, expands perspectives, and fosters
        creativity. For children, it lays a foundation for greater potential,
        improving fine motor skills and cognitive development. For adults, it’s
        a source of relaxation and joy, while for older learners, it helps
        preserve mental sharpness and overall well-being.
      </p>
      <p className={styles.descriptionLast}>
        I would be delighted to help you achieve your personal goals in guitar
        playing and to design a customized plan for your musical growth. Wishing
        you success and inspiration on this wonderful journey!
      </p>
      <button
        className={styles.bookButton}
        onClick={() => navigate("/booking")}
      >
        Book a Lesson
      </button>
    </div>
  );
};

export default AboutUs;
