import React from 'react';
import './Education.css';

const Education = () => {
  const educationItems = [
    {
      degree: 'Third Year English',
      school: 'University of Meiktila',
      year: '2023-2025',
    },
    {
      degree: 'Diploma in English',
      school: 'Yangon University of Foreign Languages',
    },
  ];

  return (
    <section id="education" className="section">
      <h2 className="section-title">My <span className="gradient-text">Education</span></h2>
      <div className="education-list">
        {educationItems.map((item) => (
          <article
            className="education-item"
            key={`${item.degree}-${item.school}`}
          >
            <span className="education-marker" aria-hidden="true"></span>
            <div className="education-card glass">
              <h3 className="education-degree">{item.degree}</h3>
              <p className="education-school">{item.school}</p>
              {item.year && <p className="education-year">{item.year}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Education;
