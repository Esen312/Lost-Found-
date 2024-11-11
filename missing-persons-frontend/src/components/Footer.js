// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Lost&Found. Все права защищены.</p>
        <div className="footer-links">
          <a href="/about">О нас</a>
          <a href="/contact">Контакты</a>
          <a href="/privacy">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
