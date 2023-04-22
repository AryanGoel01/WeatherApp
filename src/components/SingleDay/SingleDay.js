import React from "react";
import "./SingleDay.css";

const SingleDay = ({ singleData }) => {
  // console.log("Data", singleData);
  return (
    <div>
      {singleData && (
        <div>
          <div id="top">
            <h1> City: {singleData.name}</h1>
            <h1> Country: {singleData.sys.country}</h1>
          </div>

          <div id="singleDayInfo">
            <div>
              <h2> Minimum Temperature : </h2>
              <p> {(singleData.main.temp_min - 273.15).toFixed(2)} °C </p>
            </div>

            <div>
              <h2> Maximum Temperature : </h2>
              <p> {(singleData.main.temp_max - 273.15).toFixed(2)} °C </p>
            </div>

            <div>
              <h2> Humidity : </h2>
              <p> {singleData.main.humidity} %</p>
            </div>

            <div>
              <h2> Pressure : </h2>
              <p> {singleData.main.pressure} mb</p>
            </div>

            <div>
              <h2> Wind Speed : </h2>
              <p> {singleData.wind.speed} mph</p>
            </div>

            <div>
              <h2> Visibility : </h2>
              <p> {singleData.visibility / 1000} km</p>
            </div>

            <div>
              <h2> Description : </h2>
              <p> {singleData.weather[0].description} </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleDay;