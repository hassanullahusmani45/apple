import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Page Not Found</p>
      <Link to="/" className="mt-6 inline-block px-4 py-2 dark:bg-orange-400 dark:hover:bg-orange-500 bg-sky-400 hover:bg-sky-500 text-white rounded " >
        Go to Home  
      </Link>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        If you think this is an error, please contact support.
      </p>
    </div>
  </div>
);

export default NotFoundPage;
