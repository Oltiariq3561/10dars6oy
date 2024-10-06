import { Link, useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col mx-auto bg-gray-50 min-h-screen">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <button  onClick={handleLogout} className="hover:text-red-400 transition">Log out</button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="p-4 flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MainLayout;