import React, { useState } from "react";
import "../styles/career.css";

const Career = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: "",
    dob: "",
  });
  const [error, setError] = useState("");

  // Mock employee database with documents
  const employeeDatabase = {
    "25000004": {
      id: "25000004",
      name: "Gokulakrishnan M",
      dob: "2002-09-03",
      role: "Software Tester",
      joiningDate: "2025-08-08",
      exitDate: null,
      experience: "-",
      certificates: [],
      department: "Engineering",
      email: "krishnangokul027@gmail.com",
      image: "./career/gokul.webp",
      documents: [
        // {
        //   name: "Internship Certificate",
        //   url: "/career/no.pdf",
        //   type: "pdf"
        // },
        // { name: "Experience Letter", url: "#", type: "pdf" }
      ]
    },
    "25000005": {
      id: "25000005",
      name: "Krishna Suthers Raj T G B",
      dob: "2003-10-06",
      role: "Junior Software Developer",
      joiningDate: "2025-08-18",
      exitDate: "-",
      experience: "-",
      certificates: [],
      department: "Engineering",
      email: "krishnasuthers06@gmail.com",
      image: "/career/krishna.webp",
      documents: [
        //  {
        //   name: "Internship Certificate",
        //   url: "/pdf/deepan.pdf",
        //   type: "pdf"
        // },
        // {
        //   name: "Experience Letter",
        //   url: "/career/experience-letter.pdf",
        //   type: "pdf"
        // }
      ]
    },
    "25000006": {
      id: "25000006",
      name: "Deepan R",
      dob: "2003-10-06",
      role: "Junior Software Developer",
      joiningDate: "2025-08-18",
      exitDate: "-",
      experience: "-",
      certificates: [],
      department: "Engineering",
      email: "rdeepan326@gmail.com",
      image: "/career/deepan.webp",
      documents: [
        {
          name: "Internship Certificate",
          url: "/pdf/deepan.pdf",
          type: "pdf"
        },
        // {
        //   name: "Experience Letter",
        //   url: "/career/experience-letter.pdf",
        //   type: "pdf"
        // }
      ]
    },

    "25000007": {
      id: "25000007",
      name: "Deepak S",
      dob: "2004-03-11",
      role: "Junior Software Developer",
      joiningDate: "2025-08-11",
      exitDate: "2025-11-11",
      experience: "-",
      certificates: [],
      department: "Engineering",
      email: "deepaksivakumar126@gmail.com",
      image: "./career/deepak.webp",
      documents: [
        // {
        //   name: "Internship Certificate",
        //   url: "/pdf/deepak.pdf",
        //   type: "pdf"
        // },
      ]
    },
    "25000008": {
      id: "25000008",
      name: "Dheeraj C",
      dob: "2003-11-05",
      role: "Junior Software Developer (Intern)",
      joiningDate: "2025-08-18",
      exitDate: "2025-11-25",
      experience: "-",
      certificates: [],
      department: "Arts & Science",
      email: "dheerdj05@gmail.com",
      image: "./career/dheeraj.webp",
      documents: [
        {
          name: "Internship Certificate",
          url: "/pdf/dheeraj.pdf",
          type: "pdf"
        },]
    },
    "25000009": {
      id: "25000009",
      name: "Vijayakumar M",
      dob: "2003-01-23",
      role: "Junior Software Developer (Intern)",
      joiningDate: "2025-09-02",
      exitDate: "2025-12-04",
      experience: "-",
      certificates: [],
      department: "Engineering",
      email: "vijayakumar2003ms@gmail.com",
      image: "./career/vijay.webp",
      documents: [
        {
          name: "Internship Certificate",
          url: "/pdf/vijay.pdf",
          type: "pdf"
        },]
    },
    "25000011": {
      id: "25000011",
      name: "Jatheeswaran S",
      dob: "2002-10-06",
      role: "Junior Software Developer(Intern) ",
      joiningDate: "2025-08-18",
      exitDate: "2025-11-25",
      experience: "-",
      certificates: [],
      department: "Arts & Science",
      email: "jathees2018gasc@gmail.com",
      image: "./career/jagadish.webp",
      documents: [
        {
          name: "Internship Certificate",
          url: "/pdf/jagathish.pdf",
          type: "pdf"
        },]
    },
    "25000012": {
      id: "25000012",
      name: "Kiruthickrosan K",
      dob: "2003-04-08",
      role: "Junior Software Developer (Intern)",
      joiningDate: "2025-09-08",
      exitDate: "2025-12-18",
      experience: "-",
      certificates: [],
      department: "Arts & Science",
      email: "kiruthickrosan13@gmail.com",
      image: "./career/rosan.webp",
      documents: [
        {
          name: "Internship Certificate",
          url: "/pdf/kirthick.pdf",
          type: "pdf"
        },]
    },
    "25000013": {
      id: "25000013",
      name: "Sridharan B",
      dob: "2002-02-15",
      role: "Video Editor / Content Creator",
      joiningDate: "2025-09-01",
      exitDate: "-",
      experience: "-",
      certificates: [],
      department: "Engineering",
      email: "sridhar002321@gmail.com",
      image: "./career/sri.webp",
      documents: [
        {
          name: "Internship Certificate",
          url: "/career/no.pdf",
          type: "pdf"
        },]
    },
    "25000014": {
      id: "25000014",
      name: "Tarun S",
      dob: "2002-06-21",
      role: "Digital Marketing Executive",
      joiningDate: "2025-10-06",
      exitDate: "-",
      experience: "-",
      certificates: [],
      department: "Arts & Science",
      email: "tarunsathyamoorthi@gmail.com",
      image: "./career/tarun.webp",
      documents: [{
        name: "Internship Certificate",
        url: "/career/no.pdf",
        type: "pdf"
      },]
    },
    "25000015": {
      id: "25000015",
      name: "Anusri C",
      dob: "2005-07-02",
      role: "Digital Marketing (Intern)",
      joiningDate: "2025-10-06",
      exitDate: "-",
      experience: "-",
      certificates: [],
      department: "Arts & Science",
      email: "anu330989@gmail.com",
      image: "./career/anu.webp",
      documents: [{
        name: "Internship Certificate",
        url: "/pdf/anu.pdf",
        type: "pdf"
      },]
    },
    "25000016": {
      id: "25000016",
      name: "Sanjitha S",
      dob: "2003-12-30",
      role: "Digital Marketing (Intern)",
      joiningDate: "2025-10-13",
      exitDate: "-",
      experience: "-",
      certificates: [],
      department: "Engineering",
      email: "sanjithaseerangan@gmail.com",
      image: "./career/sanjitha.webp",
      documents: [{
        name: "Internship Certificate",
        url: "/pdf/sanjitha.pdf",
        type: "pdf"
      },]
    },
    "25000017": {
      id: "25000017",
      name: "Dhavamani S",
      dob: "1998-09-24",
      role: "Digital Marketing Executive",
      joiningDate: "2025-11-05",
      exitDate: "-",
      experience: "-",
      certificates: [],
      department: "Engineering",
      email: "dhavashanmugam@gmail.com",
      image: "./career/dhavamani.webp",
      documents: [{
        name: "Internship Certificate",
        url: "/career/no.pdf",
        type: "pdf"
      },]
    },
    "25000018": {
      id: "25000018",
      name: "Abinayaa Sree K S",
      dob: "2003-12-25",
      role: "Full stack developer intern",
      joiningDate: "2025-12-17",
      exitDate: "-",
      experience: "-",
      certificates: [],
      department: "Engineering",
      email: "abisaran286@gmail.com",
      image: "./career/abi.webp",
      documents: [{
        name: "Internship Certificate",
        url: "/career/no.pdf",
        type: "pdf"
      },]
    },
    "25000019": {
      id: "25000019",
      name: "Gobinath C",
      dob: "2003-03-30",
      role: "MERN STACK Internship",
      joiningDate: "2026-01-02",
      exitDate: "-",
      experience: "-",
      certificates: [{
        name: "Internship Certificate",
        url: "/career/no.pdf",
        type: "pdf"
      },],
      department: "M.SC(Computer Science)",
      email: "gobinathaz01@gmail.com",
      image: "./career/gobinath.webp",
      documents: [
        { name: "Internship Offer Letter", url: "#", type: "pdf" }
      ]
    },
    "25000020": {
      id: "25000020",
      name: "Ramanaa M",
      dob: "2005-01-31",
      role: "MERN STACK Internship",
      joiningDate: "2026-01-05",
      exitDate: "-",
      experience: "-",
      certificates: [],
      department: "Engineering",
      email: "ramanaa1010@gmail.com",
      image: "./career/ramanaa.webp",
      documents: [
{
        name: "Internship Certificate",
        url: "/career/no.pdf",
        type: "pdf"
      },      ]
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const employee = employeeDatabase[formData.employeeId];

    if (!employee) {
      setError("Employee ID not found");
      return;
    }

    if (employee.dob !== formData.dob) {
      setError("Invalid Date of Birth");
      return;
    }

    setEmployeeData(employee);
    setIsSignedIn(true);
    setShowSignIn(false);
    setError("");
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setEmployeeData(null);
    setFormData({ employeeId: "", dob: "" });
  };

  const handleDownload = async (docUrl, docName) => {
    try {
      // Check if URL is a placeholder
      if (docUrl === "#") {
        alert(`PDF file for "${docName}" is not configured yet. Please add the actual PDF URL.`);
        return;
      }

      // Fetch the PDF file
      const response = await fetch(docUrl);

      if (!response.ok) {
        throw new Error('PDF file not found');
      }

      // Convert response to blob
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${docName}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      console.log(`Successfully downloaded: ${docName}`);
    } catch (error) {
      console.error(`Error downloading ${docName}:`, error);
      alert(`Failed to download "${docName}". Please check if the file exists at the specified URL.`);
    }
  };

  return (
    <div className="employment-portal-wrapper">
      {/* Hero Banner Section with Content */}
      {!isSignedIn && (
        <section className="main-banner-area">
          <div className="banner-text-content">
            <h1 className="primary-heading">
              Careers at LetNext Technologies - Build the Future with Us
            </h1>
            <button
              className="primary-action-btn"
              onClick={() => setShowSignIn(!showSignIn)}
            >
              {showSignIn ? "Close Sign In" : "Employee Sign In"}
            </button>
          </div>
        </section>
      )}

      {/* Authentication Form Section */}
      {showSignIn && !isSignedIn && (
        <section className="auth-form-container">
          <div className="login-panel">
            <h2 className="panel-heading">Employee Sign In</h2>
            <p className="panel-subtext">
              Access your employment details and certificates
            </p>
            <form onSubmit={handleSignIn} className="authentication-form">
              <div className="input-wrapper">
                <label htmlFor="employeeId" className="input-label">
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  className="text-input-field"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="Enter your Employee ID"
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="dob" className="input-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="text-input-field"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {error && <div className="validation-error">{error}</div>}
              <button type="submit" className="submit-form-btn">
                Sign In
              </button>
              <p className="helper-text">
                Note: Use Employee ID for demo
              </p>
            </form>
          </div>
        </section>
      )}

      {/* Employee Dashboard Section */}
      {isSignedIn && employeeData && (
        <section className="dashboard-area">
          <div className="info-cards-container">
            {/* Profile Image Card */}
            <div className="info-display-card profile-image-card">
              <h3 className="card-heading-text">Profile</h3>
              <div className="profile-image-wrapper">
                <img
                  src={employeeData.image}
                  alt={`${employeeData.name} profile`}
                  className="employee-profile-image"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />

                <div className="profile-placeholder">
                  <span className="placeholder-initials">
                    {employeeData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </span>
                </div>
              </div>
              <div className="profile-name-tag">{employeeData.name}</div>
              <div className="profile-role-tag">{employeeData.role}</div>
              <button className="logout-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>

            {/* Personal Info Card */}
            <div className="info-display-card">
              <h3 className="card-heading-text">Personal Information</h3>
              <div className="data-row">
                <span className="row-label">Employee ID:</span>
                <span className="row-value">{employeeData.id}</span>
              </div>
              <div className="data-row">
                <span className="row-label">Name:</span>
                <span className="row-value">{employeeData.name}</span>
              </div>
              <div className="data-row">
                <span className="row-label">Email:</span>
                <span className="row-value">{employeeData.email}</span>
              </div>
              <div className="data-row">
                <span className="row-label">Department:</span>
                <span className="row-value">{employeeData.department}</span>
              </div>
            </div>

            {/* Employment Info Card */}
            <div className="info-display-card">
              <h3 className="card-heading-text">Employment Details</h3>
              <div className="data-row">
                <span className="row-label">Role:</span>
                <span className="row-value">{employeeData.role}</span>
              </div>
              <div className="data-row">
                <span className="row-label">Joining Date:</span>
                <span className="row-value">
                  {new Date(employeeData.joiningDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="data-row">
                <span className="row-label">Exit Date:</span>
                <span className="row-value">
                  {employeeData.exitDate && employeeData.exitDate !== "-"
                    ? new Date(employeeData.exitDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                    : "Currently Employed"}
                </span>
              </div>
              <div className="data-row">
                <span className="row-label">Total Experience:</span>
                <span className="row-value">{employeeData.experience}</span>
              </div>
            </div>

            {/* Documents Card */}
            {employeeData.documents && employeeData.documents.length > 0 && (
              <div className="info-display-card full-width-card">
                <h3 className="card-heading-text">
                  Documents & Certificates
                </h3>
                <div className="documents-grid">
                  {employeeData.documents.map((doc, index) => (
                    <div key={index} className="document-item">
                      <div className="document-info">
                        <svg
                          className="document-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        <div className="document-details">
                          <span className="document-name">{doc.name}</span>
                          <span className="document-type">{doc.type.toUpperCase()}</span>
                        </div>
                      </div>
                      <button
                        className="download-btn"
                        onClick={() => handleDownload(doc.url, doc.name)}
                      >
                        <svg
                          className="download-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Card */}
            {employeeData.certificates &&
              employeeData.certificates.length > 0 && (
                <div className="info-display-card full-width-card">
                  <h3 className="card-heading-text">
                    Certificates & Qualifications
                  </h3>
                  <div className="credentials-grid">
                    {employeeData.certificates.map((cert, index) => (
                      <div key={index} className="credential-badge">
                        <svg
                          className="badge-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        <span className="credential-name">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </section>
      )}

      {/* Welcome Section and About Section */}
      {!isSignedIn && (
        <>
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-content">
              <h2 className="section-heading">
                Welcome to LetNext Technologies Careers
              </h2>
              <p className="section-text">
                Interested in more than a job? You're at the right place. LetNext
                Technologies is more than just a company looking to hire talent.
                We hire employees but also create careers, innovate thinkers,
                and encourage dreamers. Whether technology fascinates you,
                motivates you, or is very important to you as a place to grow
                your career, our careers site is the gateway to something more.
              </p>
            </div>
          </section>

          {/* Who We Are Section */}
          <section className="about-section">
            <div className="about-content">
              <div className="about-card">
                <h3 className="subsection-heading">Who We Are</h3>
                <p className="subsection-text">
                  LetNext Technologies stands among the most innovative
                  technology solution providers in web development, app
                  development, digital marketing, and IoT solutions. We serve
                  global clients from various industries and leverage various
                  technologies to uncover innovative solutions for real-world
                  problems. Think of us as Architects of the Digital
                  Future—designing, developing, and delivering smart solutions
                  that make an impact.
                </p>
              </div>

              <div className="about-card">
                <h3 className="subsection-heading">Our Vision & Mission</h3>
                <p className="subsection-text">
                  "Our vision is very simple yet very ambitious—to bring
                  technology that has the potential to change businesses and
                  make a difference in people's lives," says our leader and
                  chairman, Scott Kelly. "Through innovation, integrity, and
                  continuous improvement, our vision and mission embrace the
                  trends and the adoption of new and innovative technologies
                  that make a difference," he concludes.
                </p>
              </div>
            </div>
          </section>

          
        </>
      )}
    </div>
  );
};

export default Career;