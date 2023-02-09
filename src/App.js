import { useState, useEffect } from "react";
import "./App.css";
// import { db } from "./firebase-config";
// import { collection, doc, getDocs } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  //const usersCollectionRef = collection(db, "users");

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getUsers();
  // }, []);

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
    const satellite = formData["satellite"];
    const startDate = formData["startDate"];
    const endDate = formData["endDate"];
    const collection = "LANDSAT/LC08/C02/T1_TOA";
    const script = `
    var l8 = ee.ImageCollection(${collection});
    ${satellite}
    ${startDate}
    ${endDate}
    var median = l8.filterDate('2016-01-01', '2016-12-31').median();
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
      <header>
        <h1>My Earth</h1>
      </header>
      <div>
        <form onSubmit={handleNewFormSubmit}>
          <p align="left">
            <label htmlFor="latitude">Location:</label>
            &nbsp;
            <input
              type="number"
              name="latitude"
              onChange={handleChange}
              placeholder="Latitude..."
            />
            &nbsp; &nbsp;
            <input
              type="number"
              name="longitude"
              onChange={handleChange}
              placeholder="Longitude..."
            />
          </p>
          <p align="left">
            <label htmlFor="satellite">Satellite:</label>
            &nbsp;
            <input
              type="text"
              name="satellite"
              onChange={handleChange}
              placeholder="Satellite..."
            />
          </p>
          <p align="left">
            <label htmlFor="dataDate">Date:</label>
            &nbsp;
            <input type="date" id="startDate" name="startDate"></input>
            &nbsp; &nbsp;
            <input type="date" id="endDate" name="endDate"></input>
          </p>
          <input type="submit" value="Make Script" />
        </form>
      </div>
      <div>
        <h3 align="left">Google Earth Engine snippet</h3>
        <pre align="left">{script}</pre>
      </div>
    </div>
  );
}

export default App;
