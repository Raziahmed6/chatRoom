import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Left: Logo + Home Icon + Profile */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MiniLinkedIn
        </Link>

        {token && (
          <>
            <Link to="/">
              <img
                src="/home-button.png"
                alt="Home"
                className="w-8 h-8 "
                title="Home"
              />
            </Link>

            <Link
              to="/profile"
              className="bg-gray-100 font-bold hover:bg-gray-200 text-gray-800 px-4 py-2 rounded transition"
            >
              Profile
            </Link>
          </>
        )}
      </div>

      {/* Right: Auth Buttons */}
      <div className="space-x-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 font-bold hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
