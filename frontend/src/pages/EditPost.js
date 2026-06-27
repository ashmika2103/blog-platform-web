import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);

        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.log(error);
        alert("Unable to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authData = JSON.parse(
        localStorage.getItem("user")
      );

      await API.put(
        `/posts/${id}`,
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

      alert("Post Updated Successfully");

      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update post"
      );
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "60px",
        }}
      >
        Loading...
      </h2>
    );
  }

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
          Edit Blog Post
        </h1>
                <form onSubmit={handleSubmit}>
          <label style={styles.label}>
            Title
          </label>

          <input
            type="text"
            placeholder="Enter post title"
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
            Update Post
          </button>
        </form>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    backgroundColor: "#f3f4f6",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 5px 18px rgba(0,0,0,0.12)",
  },

  backButton: {
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: "25px",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1f2937",
    fontSize: "42px",
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "bold",
    fontSize: "18px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "25px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "220px",
    padding: "14px",
    marginBottom: "25px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    resize: "vertical",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default EditPost;