import React, { useState, ChangeEvent } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface City {
    name: string;
    latitude: number;
    longitude: number;
}

const AutocompleteInput: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.length > 2) {
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${value}`);
            const data = await res.json();
            if (data.results) {
                setSuggestions(data.results);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (city: City) => {
        setInputValue(city.name);
        setShowSuggestions(false);
        navigate(`/weather/${encodeURIComponent(city.name)}?lat=${city.latitude}&lng=${city.longitude}`);
    };

    return (
        <div>
            <Form.Control
                type="text"
                placeholder="Введите название города"
                value={inputValue}
                onChange={handleInputChange}
                autoComplete="off"
            />
            {showSuggestions && (
                <ListGroup>
                    {suggestions.map((city, index) => (
                        <ListGroup.Item key={index} onClick={() => handleSuggestionClick(city)}>
                            {city.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default AutocompleteInput;
