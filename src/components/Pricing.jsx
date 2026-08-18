import { motion } from "motion/react";

const plans = [
  {
    name: "Starter",
    price: "$75+",
    description: "For small businesses that need a clean, professional website.",
    features: [
      "Up to 5 pages",
      "Responsive design",
      "Contact form",
      "Basic SEO setup",
      "1 revision round",
    ],
  },
  {
    name: "Business",
    price: "$150+",
    description:
      "For growing businesses that need a stronger digital presence.",
    features: [
      "Up to 10 pages",
      "Custom responsive design",
      "Advanced animations",
      "SEO optimization",
      "CMS integration",
      "3 revision rounds",
    ],
    featured: true,
  },
  {
    name: "Custom",
    price: "Let's Talk",
    description:
      "For businesses that need something more advanced or completely custom.",
    features: [
      "Custom page count",
      "Advanced functionality",
      "E-commerce options",
      "Custom integrations",
      "Ongoing support options",
    ],
  },
];

function Pricing() {
  return (
    <section className="pricing section" id="pricing">
      <motion.div
        className="sectionLabel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span>04</span>
        Pricing
      </motion.div>

      <div className="pricingIntro">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Simple pricing.
        </motion.h2>

        <p>
          Every project is different, but these packages give you a starting
          point for planning your website.
        </p>
      </div>

      <div className="pricingGrid">
        {plans.map((plan, index) => (
          <motion.div
            className={`pricingCard ${plan.featured ? "featuredPlan" : ""}`}
            key={plan.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
            }}
          >
            <div className="pricingTop">
              <div>
                <p className="planName">{plan.name}</p>

                {plan.featured && (
                  <span className="popularLabel">Most Popular</span>
                )}
              </div>

              <span className="planNumber">0{index + 1}</span>
            </div>

            <h3>{plan.price}</h3>

            <p className="planDescription">{plan.description}</p>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <a href="#contact" className="pricingButton">
              Get Started
              <span>↗</span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;