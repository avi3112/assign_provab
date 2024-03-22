import React from "react";

function Post({ post, onLike, onComment }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={() => onLike(post.id)}>
        {post.liked ? "Unlike" : "Like"}
      </button>
      <button onClick={() => onComment(post.id, "A new comment")}>
        Add Comment
      </button>
      <ul>
        {post.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
