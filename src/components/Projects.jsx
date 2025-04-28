// components/Projects.jsx
import React, { useState } from 'react';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce App',
      category: 'react',
      image: '/api/placeholder/400/320',
      description: 'A modern e-commerce platform built with React and Firebase.',
      technologies: ['React', 'Firebase', 'Redux', 'Styled Components'],
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: 'Fitness Tracker',
      category: 'android',
      image: '/api/placeholder/400/320',
      description: 'Android app for tracking workouts and nutrition goals.',
      technologies: ['Android Studio', 'Kotlin', 'Room Database', 'ViewModel'],
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'Travel Companion',
      category: 'flutter',
      image: '/api/placeholder/400/320',
      description: 'Cross-platform travel app with map integration.',
      technologies: ['Flutter', 'Dart', 'Google Maps API', 'Firebase'],
      link: '#',
      github: '#'
    },
    {
      id: 4,
      title: '3D Portfolio',
      category: 'react',
      image: '/api/placeholder/400/320',
      description: 'Interactive 3D portfolio using Three.js and React.',
      technologies: ['React', 'Three.js', 'Framer Motion', 'GSAP'],
      link: '#',
      github: '#'
    },
    {
      id: 5,
      title: 'Chat Application',
      category: 'flutter',
      image: '/api/placeholder/400/320',
      description: 'Real-time messaging app with user authentication.',
      technologies: ['Flutter', 'Firebase', 'WebSockets', 'GetX'],
      link: '#',
      github: '#'
    },
    {
      id: 6,
      title: 'Recipe Finder',
      category: 'android',
      image: '/api/placeholder/400/320',
      description: 'Recipe recommendation app based on available ingredients.',
      technologies: ['Android Studio', 'Java', 'Retrofit', 'Room'],
      link: '#',
      github: '#'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <h2>My Projects</h2>
        <div className="section-divider"></div>
      </div>
      
      <div className="project-filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'react' ? 'active' : ''} 
          onClick={() => setFilter('react')}
        >
          React
        </button>
        <button 
          className={filter === 'android' ? 'active' : ''} 
          onClick={() => setFilter('android')}
        >
          Android
        </button>
        <button 
          className={filter === 'flutter' ? 'active' : ''} 
          onClick={() => setFilter('flutter')}
        >
          Flutter
        </button>
      </div>
      
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div className="project-card" key={project.id}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <a href={project.github} className="project-link">
                  <i className="fab fa-github"></i>
                </a>
                <a href={project.link} className="project-link">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects