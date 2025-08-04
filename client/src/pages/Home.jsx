// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handlePost = async () => {
    if (!content) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/posts`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContent('');
      fetchPosts();
    } catch (err) {
      alert('Post failed ❌');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      {/* Create Post Box */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 p-2 rounded resize-none"
          rows="3"
        ></textarea>
        <button
          onClick={handlePost}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded float-right"
        >
          Post
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <div className="flex items-start gap-3 mb-2">
              <img
                src={post.userId?.profileImage || '/default-avatar.png'}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold">{post.userId?.name}</p>
                <p className="text-sm text-gray-500">{post.userId?.bio}</p>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-800 text-sm">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
