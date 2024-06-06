import React from 'react';
import { Container } from 'react-bootstrap';

const Header: React.FC = () => {
    return (
        <header className="bg-primary text-white py-3">
            <Container className="text-center">
                <h1 className="display-4">Добро пожаловать в приложение Погода</h1>
                <p className="lead">
                    Получайте последние новости о погоде в ваших любимых городах.
                </p>
            </Container>
        </header>
    );
};

export default Header;
