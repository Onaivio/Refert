import { Home } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-9xl md:text-[12rem] font-extrabold mb-1">404</h1>
      <p className="text-2xl mb-8">Oops! Page not found.</p>
      <button
        onClick={() => navigate("/")}
        className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 dark:hover:bg-primary/90 transition-colors"
      >
        <Home className="mr-2 h-4 w-4" />
        Go Home
      </button>
    </div>
  );
}
