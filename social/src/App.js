import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post.js";
import PostForm from "./components/PostForm.js";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Simulate fetching posts from a mock API
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setHasMore(data.length > 0);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const handleComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  return (
    <div className="App">
      <h1>Social Media Feed</h1>
      <PostForm onPost={(newPost) => setPosts([newPost, ...posts])} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
        />
      ))}
      {hasMore && !loading && (
        <button onClick={handleLoadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
