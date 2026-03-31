import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-split">
        <div className="hero-text">
          <h1 className="title animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Building Production <span className="gradient-text">Web Systems</span>
          </h1>
          <p className="description animate-fade-in" style={{ animationDelay: '0.4s' }}>
            I build reliable Laravel + React applications with clean architecture, role-based workflows, and real business logic. Based in Yangon, Myanmar.
          </p>
          <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary glass">Contact</a>
          </div>
        </div>
        <div className="hero-portrait">
          <img
            src="/profile.jpg"
            alt="Ar Kar Moe Myint"
            className="hero-portrait-img animate-fade-in"
            style={{ animationDelay: '0.8s' }}
            loading="eager"
          />
        </div>
      </div>
      <div className="proof-strip animate-fade-in" style={{ animationDelay: '1s' }}>
        <span>4 Production Projects</span>
        <span className="proof-dot">-</span>
        <span>Laravel + React</span>
        <span className="proof-dot">-</span>
        <span>Yangon, Myanmar</span>
      </div>
    </section>
  );
};

export default Hero;
