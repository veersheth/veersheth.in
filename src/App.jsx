import "./App.scss";
import About from "./components/About";
import Projects from "./components/Projects";
import TitlePage from "./components/TitlePage";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

function App() {
  const lenis = useLenis(({ scroll }) => {});

  return (
    <ReactLenis root>
    <div id="app">
      <TitlePage />
      <About />
      <Projects />
    </div>
    </ReactLenis>
  );
}

export default App;
