import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-split">
        <div className="hero-text">
          <p className="role-line animate-fade-in" style={{ animationDelay: '0s' }}>
            Full-Stack Developer (PHP, Laravel, React)
          </p>
          <h1 className="title animate-fade-in" style={{ animationDelay: '0.15s' }}>
            Ar Kar Moe Myint
          </h1>
          <p className="description animate-fade-in" style={{ animationDelay: '0.3s' }}>
            I build reliable web applications with clean workflows and practical product experience. Based in Yangon, Myanmar.
          </p>
          <p className="hero-cred animate-fade-in" style={{ animationDelay: '0.45s' }}>
            My focus is backend-first Laravel systems with clear permissions, secure payment flows, and maintainable architecture.
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
            style={{ animationDelay: '0.75s' }}
            loading="eager"
          />
        </div>
      </div>
      <div className="proof-strip animate-fade-in" style={{ animationDelay: '0.9s' }}>
        <span>4 Real Projects</span>
        <span className="proof-divider" aria-hidden="true">|</span>
        <span>Yangon, Myanmar</span>
      </div>
    </section>
  );
};

export default Hero;
