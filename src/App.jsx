import React from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <div className="background-glow"></div>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Education />
          <Projects />
          <Contact />
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Ar Kar Moe Myint. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
