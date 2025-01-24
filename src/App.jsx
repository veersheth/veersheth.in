import './App.scss'
import About from './components/About';
import Projects from './components/Projects';
import TitlePage from './components/TitlePage';

function App() {

  return (
    <div id='app'>
      <TitlePage />
      <About />
      <Projects />
    </div>
  )
}

export default App
