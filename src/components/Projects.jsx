import ProjectList from "./ProjectList.json";
import Project from "./Project";
import "../scss/Projects.scss";

export default function Projects() {
 let count = 0;

  return (
    <div id="projects-page">
      <ul className="projects-list">
        {ProjectList.slice()
          .reverse()
          .map((p) => (
            <Project
              key={p.id}
              id={p.id}
              count={count++}
              title={p.title}
              description={p.description}
              image={`/images/${p.img}.png`}
            />
          ))}
      </ul>
      <div className="projects-title">{"Projects"}</div>
    </div>
  );
}
