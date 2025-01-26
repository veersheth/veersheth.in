
export default function Project(props) {

  function handleClick() {
    window.location.href=props.website;
  }

  return (
    <li className="project" onClick={handleClick}>
      <div data-aos="fade-up" data-aos-delay={`${props.count * 150}`}>
        <img src={props.image} alt={props.title} />
        <div className="project-title">{props.title}</div>
        <div className="project-description">{props.description}</div>
      </div>
    </li>
  );
}
