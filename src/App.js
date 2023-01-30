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
    makeScript(formData);
  };

  const [script, setScript] = useState("");
  const makeScript = (formData) => {
    const latitude = formData["latitude"];
    const longitude = formData["longitude"];
    const script = `
    var point = ee.Geometry.Point(${latitude}, ${longitude});
    var pointCoordinates = point.coordinates();
    print('point.coordinates(...) =', pointCoordinates);
    Map.setCenter(${latitude}, ${longitude});
    Map.addLayer(point,
                 {'color': 'black'},
                 'Geometry [black]: point');`;
    console.log(script);
    setScript(script);
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
      <pre align="left">{script}</pre>
    </div>
  );
}

export default App;
