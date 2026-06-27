import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import API from "../api/axios";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const authData = JSON.parse(
    localStorage.getItem("user")
  );

  const currentUserId =
    authData?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await API.get(`/posts/${id}`);
        setPost(postRes.data);

        const commentRes = await API.get(`/comments/${id}`);
        setComments(commentRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/comments",
        {
          text,
          postId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      const commentRes = await API.get(
        `/comments/${id}`
      );

      setComments(commentRes.data);
      setText("");

      alert("Comment Added Successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to add comment"
      );
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });

      alert("Post Deleted Successfully");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete post"
      );
    }
  };

  // Delete Comment
  const handleDeleteComment = async (
    commentId
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      setComments(
        comments.filter(
          (comment) =>
            comment._id !== commentId
        )
      );

      alert("Comment Deleted Successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete comment"
      );
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  if (!post) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Post Not Found
      </h2>
    );
  }

  const isAuthor =
    currentUserId === post.author?._id;

  return (
    <div style={styles.container}>
            <button
        style={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div style={styles.articleCard}>
        <h1 style={styles.title}>
          {post.title}
        </h1>

        <p style={styles.meta}>
          By {post.author?.name}
          {" • "}
          {new Date(
            post.createdAt
          ).toLocaleDateString()}
        </p>

        <hr style={styles.hr} />

        <p style={styles.content}>
          {post.content}
        </p>

        {isAuthor && (
          <div style={styles.actionButtons}>
            <button
              style={styles.editButton}
              onClick={() =>
                navigate(`/edit/${id}`)
              }
            >
              Edit Post
            </button>

            <button
              style={styles.deleteButton}
              onClick={handleDelete}
            >
              Delete Post
            </button>
          </div>
        )}
      </div>

      <div style={styles.commentCard}>
        <h2 style={styles.commentHeading}>
          Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              style={styles.comment}
            >
              <div
                style={styles.commentHeader}
              >
                <strong>
                  {comment.user?.name}
                </strong>

                {currentUserId ===
                  comment.user?._id && (
                  <button
                    style={
                      styles.commentDeleteButton
                    }
                    onClick={() =>
                      handleDeleteComment(
                        comment._id
                      )
                    }
                  >
                    Delete
                  </button>
                )}
              </div>

              <p
                style={{
                  marginTop: "8px",
                }}
              >
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>

      <div style={styles.commentForm}>
        <h2>Add Comment</h2>

        <form onSubmit={handleComment}>
          <textarea
            placeholder="Write your comment here..."
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            style={styles.textarea}
            required
          />

          <button
            type="submit"
            style={styles.button}
          >
            Submit Comment
          </button>
        </form>
      </div>

    </div>
  );
}
    const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Times New Roman",
  },

  backButton: {
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
  },

  articleCard: {
    backgroundColor: "#ffffff",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },

  title: {
    fontSize: "38px",
    color: "#1f2937",
    marginBottom: "10px",
  },

  meta: {
    color: "#6b7280",
    fontSize: "16px",
    marginBottom: "20px",
  },

  hr: {
    marginBottom: "25px",
  },

  content: {
    fontSize: "20px",
    lineHeight: "1.9",
    color: "#374151",
    whiteSpace: "pre-wrap",
    marginBottom: "25px",
  },

  actionButtons: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },

  editButton: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },

  commentCard: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    marginBottom: "25px",
  },

  commentHeading: {
    marginBottom: "20px",
    color: "#1f2937",
    fontSize: "28px",
  },

  comment: {
    borderBottom: "1px solid #e5e7eb",
    padding: "15px 0",
  },

  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  commentDeleteButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Times New Roman",
  },

  commentForm: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    marginBottom: "15px",
    resize: "vertical",
    boxSizing: "border-box",
    fontFamily: "Times New Roman",
  },

  button: {
    backgroundColor: "#1f2937",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontFamily: "Times New Roman",
  },
};

export default PostDetails;