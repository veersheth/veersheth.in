import "../scss/About.scss";

export default function About() {
  const skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "ReactJS",
    "Svelte",
    "NextJS",
    "HTMX",
    "Python",
    "OpenCV",
    "PyTorch",
    "TensorFlow",
    "C",
    "C++",
    "ROS2",
    "Rust",
    "Java",
    "Bash",
    "Dart",
    "Lua",
    "VimScript",
    "Git(Hub)(Lab)",
    "Figma",
    "MIPS",
    "GNU/Linux",
    "Big Time Prompt Engineer this is a joke",
  ];

  return (
    <section id="about-page">
      <div className="about-me glass">
        I am a final year <span className="bold">Computer Science</span>{" "}
        student studying at the <span className="bold">University of New South Wales</span>. 
        I love working with technology, websites, robots, Linux, open-source software, the works. I also help teach COMP1531 at UNSW. The following are some "skills" I've picked up. 
      </div>

      <div className="skills">
        <ul className="skill-list">
          {skills.map((skill, index) => (
            <li key={index} data-aos="zoom-in-up" className="skill-pill">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
