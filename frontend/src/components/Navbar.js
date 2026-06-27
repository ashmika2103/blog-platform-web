import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const authData = JSON.parse(localStorage.getItem("user"));

  const username = authData?.user?.name;

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        Blog Platform
      </Link>

      <div style={styles.menu}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        {authData ? (
          <>
            <Link to="/create" style={styles.link}>
              Create Post
            </Link>

            <span style={styles.userName}>
              {username}
            </span>

            <button
              onClick={handleLogout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>

            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#1f2937",
    color: "white",
    padding: "18px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "24px",
    fontWeight: "bold",
  },

  menu: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },

  userName: {
    color: "#facc15",
    fontSize: "18px",
    fontWeight: "bold",
  },

  logoutBtn: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Navbar;