import React from 'react';
import { Chip } from '@mui/material';
import { 
  SiHtml5, SiCss, SiJavascript, SiTypescript, 
  SiReact, SiTailwindcss, SiBootstrap, 
  SiPhp, SiLaravel, SiMysql,
  SiGit, SiGithub, SiDocker 
} from 'react-icons/si';
import { Code2, Layers, Terminal, Database } from 'lucide-react';
import './About.css';

const About = () => {
  const skills = [
    { name: 'Frontend Delivery', icon: <Code2 size={40} />, description: 'Building responsive, accessible interfaces in React with practical component structure.' },
    { name: 'Backend Architecture', icon: <Database size={40} />, description: 'Designing Laravel systems, REST APIs, and MySQL schemas focused on clarity and scale.' },
    { name: 'Engineering Workflow', icon: <Terminal size={40} />, description: 'Using Git, GitHub, Docker, and CI/CD practices to ship maintainable software.' },
    { name: 'Product UI Implementation', icon: <Layers size={40} />, description: 'Translating product requirements into stable, reusable frontend implementations.' },
  ];

  const techGroups = [
    {
      group: 'Frontend',
      items: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap'],
    },
    {
      group: 'Backend',
      items: ['PHP', 'Laravel', 'MySQL'],
    },
    {
      group: 'Tools',
      items: ['Git', 'GitHub', 'Docker', 'VSCode'],
    },
  ];

  const techItemIcons = {
    'React': SiReact,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    HTML: SiHtml5,
    CSS: SiCss,
    'Tailwind CSS': SiTailwindcss,
    Bootstrap: SiBootstrap,
    PHP: SiPhp,
    Laravel: SiLaravel,
    MySQL: SiMysql,
    Git: SiGit,
    GitHub: SiGithub,
    Docker: SiDocker,
    VSCode: Code2,
  };

  const techChipSx = {
    color: 'var(--text-primary)',
    backgroundColor: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-full)',
    height: 'auto',
    maxWidth: '100%',
    '&:hover': {
      borderColor: 'var(--accent-primary)',
    },
    '& .MuiChip-icon': {
      color: 'var(--accent-primary)',
      marginLeft: 'var(--space-3)',
      marginRight: '-4px',
      transition: 'color 0.2s ease',
    },
    '&:hover .MuiChip-icon': {
      color: 'var(--accent-primary)',
    },
    '& .MuiChip-label': {
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      whiteSpace: 'normal',
      overflow: 'visible',
      textOverflow: 'clip',
      padding: 'var(--space-2) var(--space-4)',
    },
  };

  return (
    <section id="about" className="section">
      <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
      <div className="about-grid">
        <div className="about-text glass">
          <p>
            I focus on backend-first full-stack development, especially Laravel applications that need clear workflows, role permissions, and maintainable code.
          </p>
          <p>
            My work covers API design, database modeling, admin tooling, and practical React implementation. I prioritize software that teams can ship and maintain with confidence.
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
                {group.items.map((item, j) => {
                  const IconComponent = techItemIcons[item] || Code2;
                  return (
                    <Chip
                      key={j}
                      label={item}
                      icon={<IconComponent size={16} />}
                      size="small"
                      sx={techChipSx}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
