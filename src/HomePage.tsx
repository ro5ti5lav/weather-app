import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import WeatherCard from './components/WeatherCard';
import AutocompleteInput from './components/AutocompleteInput';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage: React.FC = () => {
    const cities = ['Moscow', 'St Petersburg', 'Rostov-on-Don', 'Vladivostok', 'Krasnodar', 'Yekaterinburg'];

    return (
        <>
            <Header />
            <Container>
                <h3>Введите Город</h3>
                <AutocompleteInput /><br></br>
                <h3>Погода в избранных городах</h3>
                <Row>
                    {cities.map((city, index) => (
                        <Col key={index} xs={12} sm={6} md={4}>
                            <WeatherCard city={city} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default HomePage;
