export default function Project(props) {
  return (
    <li
      data-aos="fade-up"
      data-aos-delay={`${props.count * 150}`}
      className="project"
    >
      <img src={props.image} />
      <div className="project-title">{props.title}</div>
      <div className="project-description">{props.description}</div>
    </li>
  );
}
