import Aos from "aos";
import "./App.scss";
import About from "./components/About";
import Projects from "./components/Projects";
import TitlePage from "./components/TitlePage";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Background from "./components/Background";

function App() {
  const lenis = useLenis(({ }) => { });
  Aos.init({
    delay: 50,
    duration: 1000,
    anchorPlacement: "top-bottom",
    ease: "ease-in-out",
  });
  return (
    <ReactLenis root>
      <div id="app">
        <TitlePage />
        <About />
        <Projects />
      </div>
    <Background />
    </ReactLenis>
  );
}

export default App;
