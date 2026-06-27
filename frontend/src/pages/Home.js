import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Welcome to Blog Platform</h1>
        <p>
          Share your ideas, read articles, and connect with
          other writers.
        </p>
      </div>

      <h2 style={styles.sectionTitle}>Latest Blog Posts</h2>

      {loading ? (
        <p style={styles.message}>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p style={styles.message}>
          No blog posts available. Be the first to create one!
        </p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={styles.card}>
            <h2 style={styles.title}>{post.title}</h2>

            <p style={styles.meta}>
              By {post.author?.name || "Unknown"} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <p style={styles.content}>
              {post.content.length > 180
                ? post.content.substring(0, 180) + "..."
                : post.content}
            </p>

            <Link
              to={`/post/${post._id}`}
              style={styles.button}
            >
              Read More
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "30px",
  },

  hero: {
    textAlign: "center",
    marginBottom: "40px",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  sectionTitle: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  title: {
    marginBottom: "10px",
    color: "#1f2937",
  },

  meta: {
    color: "#6b7280",
    marginBottom: "15px",
  },

  content: {
    fontSize: "18px",
    lineHeight: "1.7",
    marginBottom: "20px",
  },

  button: {
    display: "inline-block",
    backgroundColor: "#1f2937",
    color: "white",
    padding: "10px 18px",
    textDecoration: "none",
    borderRadius: "5px",
  },

  message: {
    textAlign: "center",
    fontSize: "18px",
  },
};

export default Home;