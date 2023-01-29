import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, doc, getDocs } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const [formData, setFormData] = useState([]);
  const handleChange = (event) => {
    console.log(
      `Target name: ${event.target.name} Target value: ${event.target.value}`
    );
    const newFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(newFormData);
  };

  const handleNewFormSubmit = (event) => {
    event.preventDefault();
    console.log("new forms");
    console.log(formData);
  };

  return (
    <div className="App">
      <form onSubmit={handleNewFormSubmit}>
        <input
          type="number"
          name="latitude"
          onChange={handleChange}
          placeholder="Latitude..."
        />
        <input
          type="number"
          name="longitude"
          onChange={handleChange}
          placeholder="Longitude..."
        />
        <input type="submit" value="Make Script" />
      </form>
    </div>
  );
}

export default App;
