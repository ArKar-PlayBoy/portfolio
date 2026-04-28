import React from 'react';
import { ScrollReveal } from '../hooks/useScrollReveal';
import './Education.css';

const Education = () => {
  const educationItems = [
    {
      degree: 'Third Year English',
      school: 'University of Meikhtila',
      year: '2023-2025',
    },
    {
      degree: 'Diploma in English',
      school: 'Yangon University of Foreign Languages',
    },
  ];

  return (
    <section id="education" className="section">
      <h2 className="section-title">
        <ScrollReveal>My <span className="gradient-text">Education</span></ScrollReveal>
      </h2>
      <div className="education-list">
        {educationItems.map((item, index) => (
          <article
            className="education-item"
            key={`${item.degree}-${item.school}`}
          >
            <ScrollReveal delay={100 + index * 150}>
              <span className="education-marker" aria-hidden="true"></span>
              <div className="education-card glass">
                <h3 className="education-degree">{item.degree}</h3>
                <p className="education-school">{item.school}</p>
                {item.year && <p className="education-year">{item.year}</p>}
              </div>
            </ScrollReveal>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Education;
