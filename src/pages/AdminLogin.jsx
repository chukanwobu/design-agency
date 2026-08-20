import { useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Login failed."
        );

        return;
      }

      navigate("/admin");

    } catch (error) {
      console.error(
        "Admin login error:",
        error
      );

      setError(
        "Could not connect to the server."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminLoginPage">
      <div className="adminLoginCard">

        <p className="adminEyebrow">
          STUDIO.
        </p>

        <h1>Admin Login</h1>

        <p className="adminLoginDescription">
          Sign in to view client inquiries.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="adminLoginGroup">
            <label htmlFor="adminEmail">
              Email
            </label>

            <input
              id="adminEmail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@studio.com"
              required
            />
          </div>

          <div className="adminLoginGroup">
            <label htmlFor="adminPassword">
              Password
            </label>

            <input
              id="adminPassword"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              required
            />
          </div>

          {error && (
            <p className="adminLoginError">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="adminLoginButton"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Sign In"}

            <span>↗</span>
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;