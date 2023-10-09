import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const URL = "http://localhost:4000";
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [editId, setEditId] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = () => {
    axios.get(`${URL}/workouts`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (title) {
      setLoading(true);
      axios
        .post(`${URL}/workouts`, {
          title: title,
          load: load,
          reps: reps,
        })
        .then((res) => {
          console.log(res.data);
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTitle("");
          setLoad("");
          setReps("");
          setLoading(false);
        });
    }
  };

  const handleEdit = (id) => {
    const workout = data.find((workout) => workout._id === id);
    setIsEdit(true);
    setEditId(id);
    setTitle(workout.title);
    setLoad(workout.load);
    setReps(workout.reps);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (title && editId) {
      setLoading(true);
      axios
        .patch(`${URL}/workouts/${editId}`, {
          title: title,
          load: load,
          reps: reps,
        })
        .then((res) => {
          console.log(res.data);
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTitle("");
          setLoad("");
          setReps("");
          setLoading(false);
          setIsEdit(false);
          setEditId(null);
        });
    }
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`${URL}/workouts/${id}`)
      .then((res) => {
        fetchData();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow">
        {isEdit ? (
          <>
            <form onSubmit={handleSaveEdit}>
              <input
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                name=""
                placeholder="Load..."
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                name=""
                placeholder="Reps..."
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </form>
            <hr />
          </>
        ) : (
          <form onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name=""
              placeholder="Load..."
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name=""
              placeholder="Reps..."
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-2"
            />
            <button
              onClick={handleAdd}
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Add Workout
            </button>
          </form>
        )}

        <h1 className="text-2xl font-semibold my-4">WORKOUTS</h1>

        {loading && <p>Loading...</p>}

        <ul>
          {data &&
            data.map((each) => (
              <li
                key={each._id}
                className="bg-gray-200 p-2 my-2 rounded flex justify-between items-center"
              >
                <span className="text-lg">{each.title}</span>
                <span className="text-lg">
                  <strong>LOAD </strong>
                  {each.load}
                </span>
                <span className="text-lg">
                  <strong>REPS </strong>
                  {each.reps}
                </span>
                <div>
                  <button
                    onClick={() => handleEdit(each._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 mx-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(each._id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
