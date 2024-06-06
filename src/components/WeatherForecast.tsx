import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { formatDate } from '../utils/dateUtils';
import { getWeatherDescription } from '../utils/weatherUtils';
import Header from './Header';
import Footer from './Footer';

interface DailyForecast {
    date: string;
    temperature_2m_min: number;
    temperature_2m_max: number;
    weathercode: number;
}

const WeatherForecast: React.FC = () => {
    const { city } = useParams<{ city: string }>();
    const location = useLocation();
    const [forecastData, setForecastData] = useState<DailyForecast[]>([]);

    const query = new URLSearchParams(location.search);
    const latitude = query.get('lat');
    const longitude = query.get('lng');

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                if (latitude && longitude) {
                    const resWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT`);
                    const dataWeather = await resWeather.json();
                    setForecastData(dataWeather.daily.time.map((date: string, index: number) => ({
                        date: formatDate(date), // Используем функцию для форматирования даты
                        temperature_2m_min: dataWeather.daily.temperature_2m_min[index],
                        temperature_2m_max: dataWeather.daily.temperature_2m_max[index],
                        weathercode: dataWeather.daily.weathercode[index],
                    })));
                }
            } catch (error) {
                console.error("Failed to fetch forecast data", error);
            }
        };

        fetchForecast();
    }, [latitude, longitude]);

    if (!forecastData.length) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <div>

                <h2>Прогноз погоды в городе {city}</h2>

                <Table striped bordered hover className="table-centered">
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Мин. Темп. (°C)</th>
                            <th>Макс. Темп. (°C)</th>
                            <th>Погода</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecastData.map((day, index) => (
                            <tr key={index}>
                                <td>{day.date}</td>
                                <td>{day.temperature_2m_min}°C</td>
                                <td>{day.temperature_2m_max}°C</td>
                                <td>{getWeatherDescription(day.weathercode)}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>

                <div className="d-flex justify-content-center">
                    <Button href="/">Назад</Button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default WeatherForecast;
