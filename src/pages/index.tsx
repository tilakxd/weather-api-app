import { useEffect, useState } from "react";
import axios from "axios";


export default function Home() {
  const apiKey = "private"
  const [data, setData] = useState(null); // Declare data using useState
  const [city, setCity] = useState(""); // State for city
  const [fahrenheit, setFahrenheit] = useState<string | null>(null); // State for Fahrenheit temperature

  const url = "https://api.openweathermap.org/data/2.5/weather?q=";

  const weatherSubmit = () => {
    const cityLOL: any = document.getElementById("cityName");
    const cityName = cityLOL.value;
    cityLOL.value = "";
    setCity(cityName); // Update city state when submitting
  };

  useEffect(() => {
    // Fetch data when city changes
    async function fetchData() {
      try {
        const response = await axios.get(`${url}${city}&appid=${apiKey}`);

        const jsonData = response.data;
        setData(jsonData); // Set the fetched data to the state
        console.log(jsonData["name"]); // Log the data after setting state
        if (jsonData.main && jsonData.main.temp) {
          const kelvinTemp = jsonData.main.temp;
          const fahrenheitTemp = ((kelvinTemp - 273.15) * 9) / 5 + 32;
          setFahrenheit(fahrenheitTemp.toFixed(2)); // Round to two decimal places
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Call fetchData when city changes
    fetchData();
  }, [city]); // Include city in the dependency array

  return (
    <>
      <div className="h-screen flex justify-center flex-col items-center">
        <h1 className="text-6xl my-6 text-white">Weather App</h1>
        <div className="flex flex-row">
          <input
            id="cityName"
            placeholder="Type City Here"
            className="my-5 mx-2 bg-opacity-0 rounded-lg text-center"
          ></input>
          <button
            onClick={weatherSubmit}
            className="text-white border-2 p-2 my-5 rounded-lg"
          >
            Submit
          </button>
        </div>
        <div className="border-2 rounded-lg h-1/4 w-1/4 flex flex-col items-center">
          {/* Access data only when it's not null */}
          {data && <h1 className="text-4xl text-white my-3">{data["name"]}</h1>}
          {data && (
            <h1 className="text-4xl text-white my-3">
              {data["weather"]["main"]}
            </h1>
          )}
          <div className="my-16 flex flex-row w-full h-full">
            <div className="w-1/2 flex flex-col items-center gap-2">
              {data && (
                <h1 className="text-xl text-white">Temp: {fahrenheit}°F</h1>
              )}
              {data && (
                <h1 className="text-xl text-white">
                  Wind Speed {data["wind"]["speed"]}
                </h1>
              )}
            </div>

            <div className="w-1/2 flex flex-col items-center">
              {data && (
                <h1 className="text-xl text-white">
                  Longitude: {data["coord"]["lon"]}
                </h1>
              )}
              {data && (
                <h1 className="text-xl text-white">
                  Latitude: {data["coord"]["lat"]}
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
