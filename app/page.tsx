import Link from "next/link";

const Home = () => {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-r from-blue-500 to-purple-500 text-white overflow-hidden">
      <h1 className="text-4xl font-bold mb-4 animate-bounce">
        Welcome to Curd App
      </h1>
      <p className="text-lg mb-8 text-center px-4">
        Your one-stop solution for managing CRUD operations with ease.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/inputFrom"
          className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          Input Form
        </Link>

        <Link
          href="/showData"
          className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          Show Data
        </Link>
      </div>
    </div>
  );
};

export default Home;
