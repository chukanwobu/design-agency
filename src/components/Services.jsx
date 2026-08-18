import { motion } from "motion/react";

const services = [
  {
    number: "01",
    title: "Web Design",
    description:
      "Modern, responsive websites designed around your brand and business goals.",
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "Fast, responsive websites built with modern technologies and clean code.",
  },
  {
    number: "03",
    title: "E-Commerce",
    description:
      "Online stores designed to make products easy to discover and purchase.",
  },
  {
    number: "04",
    title: "Website Redesign",
    description:
      "Transform an outdated website into a modern and professional digital experience.",
  },
];

function Services() {
  return (
    <section className="services section" id="services">
      <motion.div
        className="sectionLabel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span>02</span>
        Services
      </motion.div>

      <div className="servicesIntro">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          From idea to launch.
        </motion.h2>

        <p>
          We handle the design and development needed to turn your idea into a
          polished digital experience.
        </p>
      </div>

      <div className="serviceList">
        {services.map((service, index) => (
          <motion.div
            className="serviceItem"
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
          >
            <span className="serviceNumber">{service.number}</span>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <span className="serviceArrow">↗</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Services;