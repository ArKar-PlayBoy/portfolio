import React from 'react';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import './Projects.css';

const Projects = () => {
  const portfolioItems = [
    {
      id: 'cafe-web',
      title: 'AI Barista Cafe-Web Management System',
      category: 'Full-Stack',
      problem: 'Cafe operations were fragmented across manual ordering, reservations, inventory, and payment verification, causing delays and weak cost visibility.',
      built: 'Built a Laravel 12 platform with multi-guard RBAC (admin/staff/customer), Google OAuth login, AI drink recommendations (weather, mood, time), Stripe/KBZ/COD payments, FIFO inventory, menu cost-profit analysis, and comprehensive security (CSRF, rate limiting, IDOR protection, security headers, audit logging, ban system).',
      outcome: 'Unified ordering, payment, and stock workflows and inventory in one system with real-time cost insights.',
      repoUrl: 'https://github.com/ArKar-PlayBoy/cafe-web-application',
      tags: ['Laravel', 'Tailwind CSS', 'Alpine.js', 'Stripe', 'Google OAuth', 'Security'],
    },
    {
      id: 'service-management',
      title: 'Service Management',
      category: 'Full-Stack',
      problem: 'Service requests lacked a clear multi-role workflow and had no structured lifecycle or escalation path.',
      built: 'A Laravel ticket system with 5 service classes, 4 role workflows, external specialist escalation, and warranty-based reopen. Tested with 61 unit tests.',
      outcome: 'Created a clear assignment -> tracking -> resolution pipeline with audit trail and escalation handling.',
      repoUrl: 'https://github.com/ArKar-PlayBoy/service-management',
      tags: ['Laravel', 'RBAC', 'MySQL'],
    },
    {
      id: 'ai-blog',
      title: 'AI Blog System',
      category: 'Full-Stack',
      problem: 'Content publishing needed control, moderation, auditability and lacked governance, moderation, and AI assistance.',
      built: 'A Laravel blog with OpenAI + Claude API integration for content generation and automated moderation, plus RBAC and audit logging.',
      outcome: 'Enabled AI-assisted publishing with role-based approval and content quality controls.',
      repoUrl: 'https://github.com/ArKar-PlayBoy/laravel-ai-blog',
      tags: ['Laravel', 'AI', 'RBAC'],
    },
    {
      id: 'news-monitor',
      title: 'USA-IRAN News Monitor',
      category: 'Back-End',
      problem: 'Important updates required constant manual checking.',
      built: 'An automated monitor that collects news signals and sends Telegram alerts.',
      outcome: 'Delivered faster situational updates through automated notifications.',
      repoUrl: 'https://github.com/ArKar-PlayBoy/usa-news-monitor',
      tags: ['Laravel', 'Telegram API', 'Web Scraping'],
    },
  ];

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Case <span className="gradient-text">Studies</span></h2>
      <div className="projects-grid">
        {portfolioItems.map((item) => (
          <div className="project-card glass" key={item.id}>
            <div className="project-info">
              <span className="project-category">{item.category}</span>
              <h3>{item.title}</h3>
              <span className="project-label">Problem</span>
              <p>{item.problem}</p>
              <span className="project-label">What I built</span>
              <p>{item.built}</p>
              <span className="project-label">Outcome</span>
              <p>{item.outcome}</p>
              {item.tags && item.tags.length > 0 && (
                <div className="project-tags">
                  {item.tags.map((tag, i) => (
                    <span className="tag" key={i}>{tag}</span>
                  ))}
                </div>
              )}
              <div className="project-cta">
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn cta-btn--primary"
                >
                  <GitHubIcon sx={{ fontSize: 16 }} /> Repo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;