import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { GitHub as GitHubIcon, Telegram, Instagram,LinkedIn } from '@mui/icons-material';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
      <div className="contact-grid">
        <div className="contact-info glass">
          <h3>Get in Touch</h3>
          <p className="contact-description">
            Looking for a reliable Laravel developer? Let's discuss how we can work together.
          </p>
          <div className="contact-methods">
            <div className="method">
              <Mail className="method-icon" size={24} />
              <div>
                <h4>Email</h4>
                <p>arkarmoemyint3456@gmail.com</p>
              </div>
            </div>
            <div className="method">
              <MapPin className="method-icon" size={24} />
              <div>
                <h4>Location</h4>
                <p>Yangon, Myanmar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-ctas">
          <a href="mailto:arkarmoemyint3456@gmail.com" className="cta-link cta-link--primary">
            <Mail size={20} /> Email Me
          </a>
        
           <a href="https://www.linkedin.com/in/ar-kar-moe-myint" target="_blank" rel="noopener noreferrer" className="cta-link">
            <LinkedIn sx={{ fontSize: 20 }} /> LinkedIn
          </a>

          <a href="https://github.com/ArKar-PlayBoy" target="_blank" rel="noopener noreferrer" className="cta-link">
            <GitHubIcon sx={{ fontSize: 20 }} /> GitHub
          </a>

          <a href="https://t.me/champagnepapi223" target="_blank" rel="noopener noreferrer" className="cta-link">
            <Telegram sx={{ fontSize: 20 }} /> Telegram
          </a>
          
          <a href="https://instagram.com/call_me_moranttt" target="_blank" rel="noopener noreferrer" className="cta-link">
            <Instagram sx={{ fontSize: 20 }} /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
