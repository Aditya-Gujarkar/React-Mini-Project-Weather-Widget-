import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelsLike: 24.64,
        temp: 23.53,
        tempMin: 26.34,
        tempMax: 24.23,
        humidity: 47,
        weather: ""
    });
    let updateInfo = (result) => {
        setWeatherInfo(result);
    }
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Weather App</h1>

            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    );
}