import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getWeatherDescription } from '../utils/weatherUtils';


interface WeatherCardProps {
    city: string;
}

interface WeatherData {
    temperature: number;
    weathercode: number;
    windspeed: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Fetch coordinates
                const resCoords = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
                const dataCoords = await resCoords.json();
                const { latitude, longitude } = dataCoords.results[0];
                setCoordinates({ latitude, longitude });

                // Fetch current weather
                const resWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=ms`);
                const dataWeather = await resWeather.json();
                setWeatherData(dataWeather.current_weather);
            } catch (error) {
                console.error("Failed to fetch weather data", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;

    if (!weatherData || !coordinates) return <div>Error loading weather data</div>;

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{city}</Card.Title>
                <Card.Text>Температура: {weatherData.temperature}°C</Card.Text>
                <Card.Text>Погода: {getWeatherDescription(weatherData.weathercode)}</Card.Text>
                <Card.Text>Скорость ветра: {weatherData.windspeed} м/с</Card.Text>
                <div className="d-flex justify-content-center">
                    <Link to={`/weather/${city}?lat=${coordinates.latitude}&lng=${coordinates.longitude}`}>
                        <Button>Смотреть Прогноз</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default WeatherCard;
