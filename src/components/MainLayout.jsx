import { Link, useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col mx-auto bg-gray-100 min-h-screen">
      <header className="bg-gray-900 text-white p-6 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold">LOGO</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-green-500 transition duration-300">
                HOME
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:text-red-500 transition duration-300">
                LOG OUT
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="p-6 flex-grow">{children}</main>
    </div>
  );
}

export default MainLayout;
