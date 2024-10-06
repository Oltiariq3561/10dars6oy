import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Board() {
  const [boards, setBoards] = useState([]);
  const boardNameRef = useRef();
  const boardColorRef = useRef();
  const boardDescRef = useRef();

  const handleCreateBoard = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token mavjud emas!');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/boards/create`, {
        name: boardNameRef.current.value,
        color: boardColorRef.current.value,
        description: boardDescRef.current.value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      console.log(response.data.board);
      fetchBoards();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBoards = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('Token mavjud emas!');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/boards/my-boards`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBoards(response.data.boards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleCreateBoard} className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-center">Yangi Board Yarating</h2>
        <input
          type="text"
          ref={boardNameRef}
          placeholder="Board nomi"
          className="input border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select ref={boardColorRef} className="input border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="" disabled selected>Rangni tanlang</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
          <option value="blue">Blue</option>
        </select>
        <textarea
          ref={boardDescRef}
          placeholder="Tavsif"
          className="textarea resize-none border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="btn bg-blue-600 text-white rounded-md p-3 hover:bg-blue-700 transition">Yasash</button>
      </form>

      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-lg font-bold mb-4 text-center">Boardlar ro'yxati:</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.length > 0 ? (
            boards.map((board) => (
              <li key={board.id} className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition">
                <h3 className="font-semibold text-lg">{board.name}</h3>
                <h4 className="text-sm text-gray-600">{board.color}</h4>
                <p className="text-gray-700">{board.description}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">Hozircha boardlar mavjud emas.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Board;
