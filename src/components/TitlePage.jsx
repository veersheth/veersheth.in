import '../scss/TitlePage.scss';

export default function TitlePage() {
  return (
    <div id="title-page">
      <div className="name ">
        <span className="first-name" data-aos-delay="500" data-aos="fade-right">Veer</span>
        <span className="last-name" data-aos-delay="600" data-aos="fade-left">Sheth</span>
      </div>

      <ul className="socials">
        <li><a href="/" about="_blank">Resume</a></li>
        <li><a href="https://github.com/veersheth/" about="_blank">GitHub</a></li>
        <li><a href="https://veersheth.medium.com/" about="_blank">Blog</a></li>
        <li><a href="https://au.linkedin.com/in/veersheth" about="_blank">LinkedIn</a></li>
      </ul>

      <div className='email'><a href="mailto:veerksheth@gmail.com">Let's talk</a></div>

      <div className="based-in">Based in <span className='location'>Sydney</span></div>
    </div>
  );
}
