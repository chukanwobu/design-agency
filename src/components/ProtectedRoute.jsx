import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { API_URL } from "../api";

function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] =
    useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/admin/session`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        setAuthenticated(data.authenticated);
      } catch (error) {
        console.error(error);

        setAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  if (authenticated === null) {
    return (
      <div className="adminMessage">
        Checking authentication...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;