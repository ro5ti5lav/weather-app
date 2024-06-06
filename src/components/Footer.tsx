import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-white py-3">
            <Container className="text-center">
                <p className="mb-0">&copy; {new Date().getFullYear()} Weather App. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;
