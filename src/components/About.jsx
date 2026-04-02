import React from 'react';
import { Layers, Terminal, Database, Code2 } from 'lucide-react';
import './About.css';

const About = () => {
  const skills = [
    { name: 'Frontend Excellence', icon: <Code2 size={40}/>, description: 'React(Vite), Vue, and modern CSS frameworks building responsive, accessible UIs.' },
    { name: 'Backend Architecture', icon: <Database size={40}/>, description: 'Laravel, RESTful API, and MySQL Database Design optimized for scalability.' },
    { name: 'Modern Tooling', icon: <Terminal size={40}/>, description: 'Git, GitHub, Docker, CI/CD, and mastering the modern web ecosystem.' },
    { name: 'Product UI Implementation', icon: <Layers size={40}/>, description: 'Translating design intent into stable, component-based frontend interfaces in React.' },
  ];

  const techGroups = [
    { group: "Frontend", items: ["React(Vite)", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"] },
    { group: "Backend", items: ["Laravel", "PHP", "MySQL"] },
    { group: "Tools", items: ["Git", "GitHub", "Docker", "VSCode"] },
  ];

  return (
    <section id="about" className="section">
      <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
      <div className="about-grid">
        <div className="about-text glass">
          <p>
            I focus on backend-first full-stack development, especially Laravel systems that need clear workflows, role permissions, and maintainable code.
          </p>
          <br/>
          <p>
            My work covers API design, database modeling, admin tooling, and practical frontend implementation in React. I aim for software that is stable, readable, and ready for real users.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card glass" key={index}>
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="tech-stack-section">
        <h3 className="tech-stack-title">My <span className="gradient-text">Tech Stack</span></h3>
        <div className="tech-groups">
          {techGroups.map((group, i) => (
            <div className="tech-group" key={i}>
              <h4 className="tech-group-label">{group.group}</h4>
              <div className="tech-group-items">
                {group.items.map((item, j) => (
                  <span className="tech-chip" key={j}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
