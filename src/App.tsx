import Inicio from "./pages/Inicio";
import Sobre from "./pages/Sobre";
import AOS from "aos";
import "boxicons/css/boxicons.min.css";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Option from "./components/Option";
import NavBar from "./components/NavBar";
import Desvendando from "./pages/Desvendando";
import Material from "./pages/Material";
import Audiencia from "./pages/Audiencia";
import JogoDaVida from "./pages/JogoDaVida";
import Informacoes from "./pages/Informacoes";
import Resultados from "./pages/Resultados";
import Contato from "./pages/Contato";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Option />
      <NavBar />
      <Inicio />
      <main>
        <Sobre />
        <Desvendando />
        <Material />
        <Audiencia />
        <JogoDaVida />
        <Informacoes />
        <Resultados />
        <Contato />
      </main>
      <Footer />
    </>
  );
}

export default App;
