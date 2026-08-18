import { motion } from "motion/react";
import project1 from "../assets/images/auto.png";
import project2 from "../assets/images/hair.png";
import project3 from "../assets/images/notes.png";

const projects = [
  {
    title: "A & D Auto Mechanic",
    category: "Web Design • Development",
    year: "2026",
    image: project1,
  },
  {
    title: "Stylistik Kreations",
    category: "Branding • Web Design",
    year: "2026",
    image: project2,
  },
  {
    title: "UNotes",
    category: "Web Design • Development",
    year: "2024",
    image: project3,
  },
];

function Portfolio() {
  return (
    <section className="portfolio section" id="portfolio">
      <motion.div
        className="sectionLabel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span>03</span>
        Portfolio
      </motion.div>

      <div className="portfolioIntro">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Selected work.
        </motion.h2>

        <p>
          A selection of digital experiences built to help businesses look
          better, communicate clearly, and convert more visitors.
        </p>
      </div>

      <div className="projectGrid">
        {projects.map((project, index) => (
          <motion.article
            className={`projectCard projectCard${index + 1}`}
            key={project.title}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -8,
            }}
          >
            <a href="#" className="projectImage">
              <img src={project.image} alt={project.title} />

              <div className="projectOverlay">
                <span>View Project</span>
                <span>↗</span>
              </div>
            </a>

            <div className="projectInfo">
              <div>
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>

              <span>{project.year}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;