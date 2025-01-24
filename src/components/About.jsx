import "../scss/About.scss";

export default function About() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Python",
    "Dart",
    "C",
    "Java",
    "Flutter",
    "Firebase",
    "ReactJS",
    "ViteJS",
    "Git(Hub)",
    "Figma",
    "Bash",
    "MIPS",
    "GNU/Linux",
    "Tailwind CSS",
    "MaterialUI",
    "Bootstrap",
    "Express",
    "GIMP",
    "Lua",
    "(Neo)vim"
  ];

  return (
    <div id="about-page">
      <div className="about-me">
        I am a second year <span className="bold">Computer Science</span>{" "}
        student studying at the{" "}
        <span className="bold">University of New South Wales</span>. At the age
        of 5, I learnt what a .txt file was. At the age of 15, I started{" "}
        <span className="bold">developing websites</span> as a hobby. As far as
        further education goes, my vague plans are to pursue research in{" "}
        <span className="bold">artificial intelligence</span>. Here is a list of
        tools and technologies that I am currently familiar with...
      </div>

      <div className="skills">
        <ul className="skill-list">
          {skills.map((skill, index) => (
            <li key={index} className="skill-pill">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
