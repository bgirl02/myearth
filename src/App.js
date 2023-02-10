import { useState } from "react";
import "./App.css";

function App() {
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
    makeScript(formData);
  };

  const [script, setScript] = useState("");
  const [info, setInfo] = useState("");
  const makeScript = (formData) => {
    const latitude = formData["latitude"];
    const longitude = formData["longitude"];
    const satellite = formData["satellite"];
    const startDate = formData["startDate"];
    const endDate = formData["endDate"];
    const script = `
    var dataset = ee.ImageCollection('${satellite}');
    var median = dataset.filterDate('${startDate}', '${endDate}').median();
    Map.setCenter(${longitude}, ${latitude}, 8);
    Map.addLayer(median);
    `;

    if (satellite === "LANDSAT/LC08/C02/T1_TOA") {
      let info = `
      Landsat, a joint program of the USGS and NASA, 
       has been observing the Earth continuously
       from 1972 through the present day.
       Today the Landsat satellites image
       the entire Earth's surface at a 30-meter
       resolution about once every two weeks,
       including multispectral and thermal data.
      The USGS produces data in 3 categories
       for each satellite (Tier 1, Tier 2 and RT).
      This dataset is especially Landsat 8 OLI/TIRS
       Collection 2 atmospherically corrected surface reflectance.
      Dataset Availability: April 2013–Present
      `;
      setInfo(info);
    }
    setScript(script);
  };

  return (
    <div className="App">
      <header class="flex-container">
        <h1 class="flex-item2">
          <a
            href="https://earthengine.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="link to Google Earth Engine"
              src="../geelogo.png"
              width="40"
              height="38"
            ></img>
          </a>
        </h1>
        <h1 class="flex-title">My Earth</h1>
        <h1 class="flex-item1">sign in</h1>
      </header>
      <div class="script-input">
        <form onSubmit={handleNewFormSubmit} id="scriptform">
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
            <select
              name="satellite"
              id="satellite"
              form="scriptform"
              onChange={handleChange}
            >
              <option value="LANDSAT/LC08/C02/T1_TOA">Landsat</option>
              <option value="COPERNICUS/S2_SR_HARMONIZED">Sentinel</option>
              <option value="MODIS/061/MCD43A4">MODIS</option>
            </select>
          </p>
          <p align="left">
            <label htmlFor="dataDate">Date:</label>
            &nbsp;
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleChange}
            ></input>
            &nbsp; &nbsp;
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleChange}
            ></input>
          </p>
          <p align="left">
            <input type="submit" value="Make Script" />
          </p>
          <p align="left">{info}</p>
        </form>
      </div>
      <div class="script-result">
        <h3 align="left">Google Earth Engine snippet</h3>
        <pre align="left">{script}</pre>
      </div>
      <div class="map-result">
        <h3 align="left">
          <a
            href="https://code.earthengine.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Earth Look
          </a>
        </h3>
      </div>
    </div>
  );
}

export default App;
