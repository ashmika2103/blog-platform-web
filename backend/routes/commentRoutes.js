const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  addComment,
  getComments,
  deleteComment,
} = require(
  "../controllers/commentController"
);

// Add Comment
router.post(
  "/",
  authMiddleware,
  addComment
);

// Get Comments By Post
router.get(
  "/:postId",
  getComments
);

// Delete Comment
router.delete(
  "/:id",
  authMiddleware,
  deleteComment
);

module.exports = router;