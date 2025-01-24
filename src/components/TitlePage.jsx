import '../scss/TitlePage.scss';

export default function TitlePage() {
  return (
    <div id="title-page">
      <div className="name ">
        <span className="first-name">VEER</span>
        <span className="last-name">SHETH</span>
      </div>

      <ul className="socials">
        <li>Resume</li>
        <li>GitHub</li>
        <li>Blog</li>
        <li>LinkedIn</li>
      </ul>

      <div className="based-in">Based in <span className='location'>Sydney</span></div>
    </div>
  );
}
