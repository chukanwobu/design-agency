import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "navbarScrolled" : ""}`}>
        <a href="#home" className="logo" onClick={closeMenu}>
          STUDIO.
        </a>

        <nav className="navLinks">
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <a href="#contact" className="meetingButton">
          Schedule a Meeting
          <span>↗</span>
        </a>

        <button
          className={`menuButton ${menuOpen ? "menuOpen" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobileMenu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <nav>
              <a href="#about" onClick={closeMenu}>
                <span>01</span>
                About Us
              </a>

              <a href="#services" onClick={closeMenu}>
                <span>02</span>
                Services
              </a>

              <a href="#portfolio" onClick={closeMenu}>
                <span>03</span>
                Portfolio
              </a>

              <a href="#pricing" onClick={closeMenu}>
                <span>04</span>
                Pricing
              </a>

              <a href="#contact" onClick={closeMenu}>
                <span>05</span>
                Schedule a Meeting
              </a>
            </nav>

            <div className="mobileMenuBottom">
              <p>Web Design & Development</p>
              <p>Houston, TX</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;