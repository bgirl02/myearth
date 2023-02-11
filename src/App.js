import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState([]);
  const handleChange = (event) => {
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

    if (satellite === "LANDSAT/LC08/C02/T1_L2") {
      const info = `
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
    } else if (satellite === "COPERNICUS/S2_SR_HARMONIZED") {
      const info = `
      The Copernicus Program is an ambitious initiative
       headed by the European Commission in partnership
       with the European Space Agency (ESA). 
      The Sentinels are a constellation of satellites
       developed by ESA to operationalize the
       Copernicus program, which include all-weather
       radar images from Sentinel-1A and 1B, high-resolution
       optical images from Sentinel-2A and 2B, ocean and
       land data suitable for environmental and climate
       monitoring from Sentinel-3, as well as air quality
       data from Sentinel-5P.
      This dataset is especitally Sentinel-2 Level-2A orthorectified
       atmospherically corrected surface reflectance.
      Dataset availability: 2017-03-28 – Present
      `;
      setInfo(info);
    } else if (satellite === "MODIS/061/MCD43A4") {
      const info = `
      MODIS (or Moderate Resolution Imaging Spectroradiometer) is a key instrument aboard the Terra (originally known as EOS AM-1) and Aqua (originally known as EOS PM-1) satellites.
      This data provides 500 meter reflectance data of the MODIS "land" bands 1-7. These are adjusted using a bidirectional reflectance distribution function to model the values as if they were collected from a nadir view. The data are produced daily based on a 16-day retrieval period, with the image's date occurring on the 9th day. This product combines data from both the Terra and Aqua spacecrafts, choosing the best representative pixel from the 16-day period.
      https://lpdaac.usgs.gov/products/mcd43a4v061/
      https://developers.google.com/earth-engine/datasets/catalog/MODIS_061_MCD43A4
      Dataset availability: 2000-02-24 – Present
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
            <br></br>
            <br></br>
            <input
              type="number"
              name="latitude"
              onChange={handleChange}
              placeholder="Latitude..."
            />
            <br></br>
            <br></br>
            <input
              type="number"
              name="longitude"
              onChange={handleChange}
              placeholder="Longitude..."
            />
          </p>
          <p align="left">
            <label htmlFor="satellite">Satellite:</label>
            <br></br>
            <br></br>
            <select
              name="satellite"
              id="satellite"
              form="scriptform"
              onChange={handleChange}
            >
              <option value="LANDSAT/LC08/C02/T1_L2">Landsat</option>
              <option value="COPERNICUS/S2_SR_HARMONIZED">Sentinel</option>
              <option value="MODIS/061/MCD43A4">MODIS</option>
            </select>
          </p>
          <p align="left">
            <label htmlFor="dataDate">Date:</label>
            <br></br>
            <br></br>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleChange}
            ></input>
            <br></br>
            <br></br>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleChange}
            ></input>
          </p>
          <br></br>
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
