import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authData = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post(
        "/posts",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      alert("Post Created Successfully!");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create post"
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <button
          onClick={() => navigate(-1)}
          style={styles.backButton}
        >
          ← Back
        </button>

        <h1 style={styles.heading}>
          Create New Blog Post
        </h1>

        <form onSubmit={handleSubmit}>

          <label style={styles.label}>
            Title
          </label>

          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={styles.input}
            required
          />

          <label style={styles.label}>
            Content
          </label>

          <textarea
            placeholder="Write your blog content..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            style={styles.textarea}
            required
          />

          <button
            type="submit"
            style={styles.button}
          >
            Publish Post
          </button>

        </form>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "85vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: "30px",
    fontFamily: "Times New Roman",
  },
    card: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 5px 18px rgba(0,0,0,0.12)",
  },

  backButton: {
    backgroundColor: "#6b7280",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "25px",
    fontFamily: "Times New Roman",
  },

  heading: {
    textAlign: "center",
    color: "#1f2937",
    fontSize: "34px",
    marginBottom: "30px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "15px",
    fontWeight: "bold",
    fontSize: "17px",
    color: "#374151",
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "16px",
    marginBottom: "20px",
    boxSizing: "border-box",
    fontFamily: "Times New Roman",
  },

  textarea: {
    width: "100%",
    minHeight: "220px",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "16px",
    resize: "vertical",
    marginBottom: "25px",
    boxSizing: "border-box",
    fontFamily: "Times New Roman",
  },

  button: {
    width: "100%",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    border: "none",
    padding: "14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: "Times New Roman",
  },
};

export default CreatePost;