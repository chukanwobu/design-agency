import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Admin() {
  const navigate = useNavigate();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getInquiries = async () => {
      try {
        const response = await fetch("/api/inquiries");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Could not load inquiries."
          );
        }

        setInquiries(data.inquiries);
      } catch (error) {
        console.error(error);

        setError("Could not load inquiries.");
      } finally {
        setLoading(false);
      }
    };

    getInquiries();
  }, []);


  // ------------------------------------
  // UPDATE STATUS
  // ------------------------------------

  const handleStatusChange = async (
    inquiryId,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `/api/inquiries/${inquiryId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not update status."
        );
      }

      setInquiries((previousInquiries) =>
        previousInquiries.map((inquiry) =>
          inquiry.id === inquiryId
            ? {
                ...inquiry,
                status: newStatus,
              }
            : inquiry
        )
      );
    } catch (error) {
      console.error(error);

      alert("Could not update inquiry status.");
    }
  };


  // ------------------------------------
  // LOGOUT
  // ------------------------------------

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "/api/admin/logout",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);

      alert("Could not log out.");
    }
  };


  // ------------------------------------
  // LOADING
  // ------------------------------------

  if (loading) {
    return (
      <div className="adminMessage">
        Loading inquiries...
      </div>
    );
  }


  // ------------------------------------
  // ERROR
  // ------------------------------------

  if (error) {
    return (
      <div className="adminMessage">
        {error}
      </div>
    );
  }


  // ------------------------------------
  // PAGE
  // ------------------------------------

  return (
    <div className="adminPage">

      <header className="adminHeader">

        <div>
          <p className="adminEyebrow">
            STUDIO.
          </p>

          <h1>Client Inquiries</h1>
        </div>


        <div className="adminHeaderRight">

          <div className="inquiryCount">
            {inquiries.length}

            <span>
              Total Inquiries
            </span>
          </div>


          <button
            className="logoutButton"
            onClick={handleLogout}
          >
            Log Out
          </button>

        </div>

      </header>


      <main className="adminContent">

        {inquiries.length === 0 ? (

          <div className="emptyInquiries">

            <h2>No inquiries yet.</h2>

            <p>
              New project inquiries will appear here.
            </p>

          </div>

        ) : (

          <div className="inquiryList">

            {inquiries.map((inquiry) => (

              <article
                className="inquiryCard"
                key={inquiry.id}
              >

                <div className="inquiryTop">

                  <div>

                    <span className="inquiryId">
                      #{inquiry.id}
                    </span>

                    <h2>
                      {inquiry.name}
                    </h2>

                    <a
                      href={`mailto:${inquiry.email}`}
                    >
                      {inquiry.email}
                    </a>

                  </div>


                  <select
                    className={`statusSelect status-${inquiry.status}`}
                    value={inquiry.status}
                    onChange={(event) =>
                      handleStatusChange(
                        inquiry.id,
                        event.target.value
                      )
                    }
                  >

                    <option value="new">
                      New
                    </option>

                    <option value="contacted">
                      Contacted
                    </option>

                    <option value="meeting-scheduled">
                      Meeting Scheduled
                    </option>

                    <option value="proposal-sent">
                      Proposal Sent
                    </option>

                    <option value="client">
                      Client
                    </option>

                  </select>

                </div>


                <div className="inquiryDetails">

                  <div>

                    <span>
                      Company
                    </span>

                    <p>
                      {inquiry.company || "Not provided"}
                    </p>

                  </div>


                  <div>

                    <span>
                      Project
                    </span>

                    <p>
                      {inquiry.project_type}
                    </p>

                  </div>


                  <div>

                    <span>
                      Budget
                    </span>

                    <p>
                      {inquiry.budget}
                    </p>

                  </div>


                  <div>

                    <span>
                      Submitted
                    </span>

                    <p>
                      {inquiry.created_at}
                    </p>

                  </div>

                </div>


                <div className="inquiryMessage">

                  <span>
                    Project Details
                  </span>

                  <p>
                    {inquiry.message}
                  </p>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default Admin;