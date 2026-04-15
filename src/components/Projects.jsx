import React from 'react';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import './Projects.css';

const Projects = () => {
  const portfolioItems = [
    {
      id: 'cafe-web',
      title: 'AI Barista Cafe-Web Management System',
      category: 'Full-Stack',
      problem: 'Cafe operations were fragmented across ordering, reservations, inventory, and payment verification, creating delays and weak cost visibility.',
      built: 'Built a Laravel 12 platform with multi-guard RBAC, Google OAuth, AI drink recommendations, Stripe/KBZ/COD payments, FIFO inventory, and menu cost-profit analysis with security hardening.',
      outcome: 'Unified daily operations into one system with faster order handling, stronger payment controls, and clearer cost tracking for decision-making.',
      repoUrl: 'https://github.com/ArKar-PlayBoy/cafe-web-application',
      tags: ['Laravel 12', 'Tailwind CSS', 'MySQL', 'RBAC', 'Stripe'],
    },
    {
      id: 'service-management',
      title: 'Service Management',
      category: 'Full-Stack',
      problem: 'Service requests lacked a clear lifecycle, role ownership, and escalation workflow, causing inconsistent resolution.',
      built: 'Built a Laravel service system with four role workflows, structured ticket states, specialist escalation, warranty-based reopen, and full audit logging.',
      outcome: 'Established a reliable assign -> track -> resolve process with better accountability for staff and clearer visibility for customers.',
      repoUrl: 'https://github.com/ArKar-PlayBoy/service-management',
      tags: ['Laravel', 'Tailwind CSS', 'MySQL', 'RBAC'],
    },
    {
      id: 'ai-blog',
      title: 'AI Blog System',
      category: 'Full-Stack',
      problem: 'Publishing workflows needed moderation, governance, and auditability while still improving content speed.',
      built: 'Built a Laravel blog platform with OpenAI and Claude-assisted drafting, role-based approval, moderation controls, and audit trails.',
      outcome: 'Enabled faster publishing while maintaining review quality, role accountability, and safer content operations.',
      repoUrl: 'https://github.com/ArKar-PlayBoy/laravel-ai-blog',
      tags: ['Laravel', 'AI', 'RBAC', 'MySQL'],
    },
    {
      id: 'news-monitor',
      title: 'USA-IRAN News Monitor',
      category: 'Back-End',
      problem: 'Critical news updates required repeated manual checks and delayed response.',
      built: 'Built an automated monitoring service that collects relevant signals and pushes Telegram alerts in near real time.',
      outcome: 'Reduced manual tracking work and improved response speed with consistent automated notifications.',
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