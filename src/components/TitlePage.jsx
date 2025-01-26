import React, { useState, useEffect } from 'react';
import '../scss/TitlePage.scss';

export default function TitlePage() {
  const [screenResolution, setScreenResolution] = useState(`${window.innerWidth}x${window.innerHeight}`);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleResize = () => {
      setScreenResolution(`${window.innerWidth}x${window.innerHeight}`);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLastNameClick = () => {
    const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16); // Random color
    window.dispatchEvent(new CustomEvent("changeBlobColor", { detail: { color: newColor } }));
  };

  return (
    <section id="title-page">
      <div className="name"  data-aos="fade-right">
        <span className="first-name" >Veer</span>
        <span className="last-name glass" onClick={handleLastNameClick}
        >Sheth</span>
      </div>

      <ul className="socials">
        <li><a href="/" target="_blank">Resume</a></li>
        <li><a href="https://github.com/veersheth/" target="_blank">GitHub</a></li>
        <li><a href="https://veersheth.medium.com/" target="_blank">Blog</a></li>
        <li><a href="https://au.linkedin.com/in/veersheth" target="_blank">LinkedIn</a></li>
      </ul>

      <div className='email'><a href="mailto:veerksheth@gmail.com">Let's talk</a></div>

      <div className="based-in">Based in <span className='location'>Sydney</span></div>

      <div className="year"> {currentYear} </div>
      
      <div className='scroll-hint'>Scroll ￬</div>

      <div className="screen-resolution"> {screenResolution} </div>
    </section>
  );
}

