import { useState } from "react";
import { motion } from "motion/react";

function ProjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  try {
    const response = await fetch(
      "/api/inquiries",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    console.log(data);

    alert("Your project inquiry was submitted!");
    setFormData({
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: "",
    });
  } catch (error) {
    console.error("Error submitting inquiry:", error);

    alert("Something went wrong. Please try again.");
  }
};

  return (
    <motion.form
      className="projectForm"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="formRow">
        <div className="formGroup">
          <label htmlFor="name">Your Name</label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Smith"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="formRow">
        <div className="formGroup">
          <label htmlFor="company">Company</label>

          <input
            id="company"
            name="company"
            type="text"
            placeholder="Company name"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="projectType">Project Type</label>

          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            <option value="web-design">Web Design</option>
            <option value="web-development">Web Development</option>
            <option value="ecommerce">E-Commerce</option>
            <option value="redesign">Website Redesign</option>
            <option value="other">Something Else</option>
          </select>
        </div>
      </div>

      <div className="formGroup">
        <label htmlFor="budget">Estimated Budget</label>

        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
        >
          <option value="">Select your budget</option>
          <option value="under-100">Under $100</option>
          <option value="100-250">$100 – $250</option>
          <option value="250-500">$250 – $500</option>
          <option value="500-plus">$500+</option>
        </select>
      </div>

      <div className="formGroup">
        <label htmlFor="message">Tell us about your project</label>

        <textarea
          id="message"
          name="message"
          rows="6"
          placeholder="Tell us what you're looking to build..."
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submitButton">
        Send Inquiry
        <span>↗</span>
      </button>
    </motion.form>
  );
}

export default ProjectForm;