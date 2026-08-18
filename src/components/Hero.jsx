import { motion } from "motion/react";

function Hero() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 50,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.section
      className="hero"
      id="home"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="heroLabel" variants={item}>
        Chuka Nwobu - Independent Web Design Studio
      </motion.div>

      <motion.h1 variants={item}>
        Websites that make
        <span> businesses stand out.</span>
      </motion.h1>

      <motion.p className="heroDescription" variants={item}>
        We design and develop modern digital experiences for businesses that
        want to look better, communicate clearly, and grow online.
      </motion.p>

      <motion.div className="heroButtons" variants={item}>
        <motion.a
          href="#contact"
          className="primaryButton"
          whileHover={{
            y: -4,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          Start a Project
          <span>↗</span>
        </motion.a>

        <motion.a
          href="#portfolio"
          className="secondaryButton"
          whileHover={{
            y: -4,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          View Our Work
        </motion.a>
      </motion.div>

        <motion.div
      className="heroLine"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{
        duration: 1.3,
        delay: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    />
      
    </motion.section>
  );
}

export default Hero;