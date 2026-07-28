import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
          <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-10 text-center max-w-md">

            <h2 className="text-3xl font-bold text-red-600">
              Oops!
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Something went wrong while loading this page.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Reload Page
            </button>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;