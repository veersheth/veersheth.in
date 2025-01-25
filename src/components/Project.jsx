export default function Project(props) {
  return (
    <li className="project">
      <img src={props.image} />
      <div className=" project-title">{props.title}</div>
      <div className="project-description">{props.description}</div>
    </li>
  );
}
