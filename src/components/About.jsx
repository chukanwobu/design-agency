import { motion } from "motion/react";

function About() {
  return (
    <motion.section
      className="about section"
      id="about"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="sectionLabel">
        <span>01</span>
        About Us
      </div>

      <div className="aboutContent">
        <p className="aboutEyebrow">Who we are</p>

        <h2>
          We combine strategy, design, and development to create digital
          experiences people remember.
        </h2>

        <div className="aboutBottom">
          <p>
            We help businesses build modern websites that look professional,
            communicate clearly, and create a strong first impression online.
          </p>

          <a href="#services">
            Explore our services
            <span>↓</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}

export default About;