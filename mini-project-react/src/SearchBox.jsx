import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './SearchBox.css'

export default function SearchBox({ updateInfo }) {

    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    let API_URL = "https://api.openweathermap.org/data/2.5/weather";
    let API_KEY = "6ed53ae21353177fbc33146a3f35d48a";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponses = await response.json();
            console.log(jsonResponses);

            let result = {
                city: city,
                temp: jsonResponses.main.temp,
                tempMax: jsonResponses.main.temp_max,
                tempMin: jsonResponses.main.temp_min,
                humidity: jsonResponses.main.humidity,
                feelsLike: jsonResponses.main.feels_like,
                weather: jsonResponses.weather[0].description,
            }
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    }

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            console.log(city);
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
            setError(false);
        } catch (err) {
            setError(true);
        }
    }


    return (
        <div className="SearchBox">
            {/* <h3>Enter Your City Name</h3> */}
            <form onSubmit={handleSubmit} >
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" size="medium" type="submit">
                    Search
                </Button>
                {error && <p style={{ color: "red" }}>No such place exists!</p>}
            </form>
        </div>
    );
}