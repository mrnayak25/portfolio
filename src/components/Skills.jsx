// components/Skills.jsx
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const Skills = () => {
  const skills = [
    { name: 'React', level: 90, icon: 'fab fa-react' },
    { name: 'Android Studio', level: 85, icon: 'fab fa-android' },
    { name: 'Flutter', level: 80, icon: 'fab fa-flutter' },
    { name: 'JavaScript', level: 90, icon: 'fab fa-js' },
    { name: 'HTML/CSS', level: 85, icon: 'fab fa-html5' },
    { name: 'Three.js', level: 75, icon: 'fas fa-cube' },
    { name: 'Node.js', level: 80, icon: 'fab fa-node-js' },
    { name: 'Firebase', level: 85, icon: 'fas fa-fire' },
  ];

  return (
    <section id="skills" className="skills">
      <div className="section-header">
        <h2>My Skills</h2>
        <div className="section-divider"></div>
      </div>
      
      <div className="skills-container">
        <div className="skills-animation">
          <Player
            autoplay
            loop
            src="https://assets4.lottiefiles.com/packages/lf20_bhebjzpu.json"
            style={{ height: '300px', width: '300px' }}
          />
        </div>
        
        <div className="skills-list">
          {skills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <div className="skill-info">
                <i className={skill.icon}></i>
                <span>{skill.name}</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: `${skill.level}%` }}
                  data-level={`${skill.level}%`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
