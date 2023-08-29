import React, { useState, useRef } from "react";
import "./App.css";

function App() {
    const apiKey = "d1de9f11189235f5d134bf38d7019370";
    const cityRef = useRef();
    const [data, setData] = useState(null);
    const url = `https://api.openweathermap.org/data/2.5/weather`;

    const submitHandler = (event) => {
        event.preventDefault();
        const city = cityRef.current.value;

        fetch(`${url}?q=${city}&appid=${apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                const details = {
                    city: data.name,
                    temperature: Math.floor(
                        (data.main.temp - 273.15) * (9 / 5) + 32
                    ),
                    description: data.weather[0].main,
                    feelsLike: Math.floor(
                        (data.main["feels_like"] - 273.15) * (9 / 5) + 32
                    ),
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                };

                setData(details);
            });

        cityRef.current.value = "";
    };

    return (
        <div className="container">
            <div className="containerHeader">
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        ref={cityRef}
                    />
                </form>
            </div>
            {data && (
                <div className="containerBody">
                    <div className="weather">
                        <h1>{data.city}</h1>
                        <p className="temp">{data.temperature}°F</p>
                        <p className="description">{data.description}</p>
                    </div>
                    <div className="details">
                        <div>
                            <p className="bold">{data.feelsLike}°F</p>
                            <p>Feels Like</p>
                        </div>
                        <div>
                            <p className="bold">{data.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                        <div>
                            <p className="bold">{data.windSpeed} MPH</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            )}
            {!data && (
                <div className="info">
                    <p>Please Enter a City to check weather.</p>
                </div>
            )}
        </div>
    );
}

export default App;
