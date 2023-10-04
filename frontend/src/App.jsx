import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
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
    <>
      {isEdit ? (
        <>
          <form onSubmit={handleSaveEdit}>
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input
              type="text"
              name=""
              placeholder="Load..."
              value={load}
              onChange={(e) => setLoad(e.target.value)}
            />
            <br />
            <input
              type="text"
              name=""
              placeholder="reps..."
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
            <br />
            <button onClick={handleSaveEdit}>Update</button>
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
          />
          <br />
          <input
            type="text"
            name=""
            placeholder="Load..."
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
          <br />
          <input
            type="text"
            name=""
            placeholder="reps..."
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <br />
          <button>Add New</button>
        </form>
      )}

      <h1>Hello world</h1>
      {loading && <p>Loading...</p>}
      <div>
        {data &&
          data.map((each) => (
            <li style={{ marginBottom: "10px" }}>
              {each.title}, {each.load}, {each.reps}
              <button onClick={() => handleEdit(each._id)}>Edit</button>
              <button onClick={() => handleDelete(each._id)}>Delete</button>
            </li>
          ))}
      </div>
    </>
  );
}

export default App;
