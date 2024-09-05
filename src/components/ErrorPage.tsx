import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorPageProps {
  title?: string;
  message?: string;
  error?: Error;
}

export default function ErrorPage({
  title = "Oops! Something went wrong",
  message = "We're sorry, but an unexpected error occurred.",
  error,
}: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-600 dark:text-red-200 px-4 py-3 rounded mb-6">
            <p className="font-bold">Error details:</p>
            <p className="text-sm">{error.message}</p>
          </div>
        )}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center px-6 py-3 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 dark:hover:bg-primary/90 transition-colors"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
