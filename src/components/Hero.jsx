// components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const Hero = ({ scrollY }) => {
  const textRef = useRef(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    // Add jitter effect to text
    const jitterText = () => {
      if (textRef.current) {
        const jitterAmount = Math.min(5, scrollY / 200);
        textRef.current.style.transform = `translate(${(Math.random() - 0.5) * jitterAmount}px, ${(Math.random() - 0.5) * jitterAmount}px)`;
      }
    };
    
    const interval = setInterval(jitterText, 50);
    return () => clearInterval(interval);
  }, [scrollY]);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 ref={textRef}>
            <span className="highlight">Hello, I'm</span><br />
            <span className="name">Your Name</span>
          </h1>
          <h2>Software Developer</h2>
          <p>Specializing in React, Android Studio, Flutter, and more.</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
        
        <div className="hero-animation">
          <Player
            autoplay
            loop
            src="https://assets7.lottiefiles.com/packages/lf20_w51pcehl.json"
            style={{ height: '400px', width: '400px' }}
          />
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll Down</p>
      </div>
    </section>
  );
};

export default Hero;