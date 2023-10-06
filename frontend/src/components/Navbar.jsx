import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };
  
  const isTokenAvailable = !!localStorage.getItem("jwtToken");

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-semibold">Tic-Tac-Toe</div>
      {isTokenAvailable && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
