import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("/default-avatar.png");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setBio(res.data.bio || "");
      setGender(res.data.gender || "");
      setPreview(res.data.profileImage || "/default-avatar.png");
    } catch (err) {
      console.error("❌ Error fetching user:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      let imageUrl = user.profileImage;

      if (profileImage) {
        const formData = new FormData();
        formData.append("image", profileImage);
        const res = await axios.post("http://localhost:5000/api/upload", formData);
        imageUrl = res.data.imageUrl;
      }

      await axios.put(
        "http://localhost:5000/api/users/update",
        { bio, gender, profileImage: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Profile updated!");
      setPreview(imageUrl);
      fetchUser();
    } catch (err) {
      alert("❌ Failed to update profile");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Your Profile</h2>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={preview}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setProfileImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </div>

      <textarea
        className="w-full border border-gray-300 p-2 rounded mb-4"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded mb-4"
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <button
        onClick={handleUpdate}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Update Profile
      </button>
    </div>
  ) : (
    <p className="text-center mt-10 text-gray-600">Loading...</p>
  );
}

export default Profile;
