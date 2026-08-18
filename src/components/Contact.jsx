import { motion } from "motion/react";
import ProjectForm from "./ProjectForm";

function Contact() {
  return (
    <section className="contact section" id="contact">
      <motion.div
        className="sectionLabel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span>05</span>
        Start a Project
      </motion.div>

      <div className="contactContent">
        <motion.p
          className="contactEyebrow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Have a project in mind?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Let&apos;s build something
          <span> worth remembering.</span>
        </motion.h2>

        <div className="contactBottom">
          <div className="contactDetails">
            <p>
              Tell us about your business, your goals, and what you want to
              build. We&apos;ll help figure out the best direction for your
              project.
            </p>

            <a href="mailto:hello@studio.com">
              hello@studio.com
            </a>
          </div>

          <ProjectForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;