import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      // Save user data
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Success");

      // Redirect to Home page
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  const styles = {
    container: {
      width: "320px",
      margin: "80px auto",
      padding: "25px",
      background: "white",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      borderRadius: "8px",
    },
    heading: {
      marginBottom: "20px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#1f2937",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <form onSubmit={handleLogin} style={styles.container}>
      <h2 style={styles.heading}>Login</h2>

      <input
        style={styles.input}
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button style={styles.button} type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;