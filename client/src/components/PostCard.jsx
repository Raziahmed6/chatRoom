// src/components/PostCard.jsx
import React from "react";

const PostCard = ({ post }) => {
  const { userId, content, createdAt } = post;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4">
      <div className="flex items-center gap-3">
        <img
          src={userId.profilePic || "/default-avatar.png"} // fallback if no pic
          alt="profile"
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <h3 className="font-semibold text-lg">{userId.name}</h3>
          <p className="text-sm text-gray-500">{userId.bio}</p>
          <p className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-3 text-gray-800 text-sm">{content}</div>
    </div>
  );
};

export default PostCard;
