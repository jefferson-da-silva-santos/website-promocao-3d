import logo from '../../assets/image/logo.png';

const NavBar = () => {
  return (
    <div className="navbar">
      <nav className="navbar__container">
        <div className="navbar__logo-group">
          <img
            className="navbar__logo-img"
            src={logo}
            alt=""
          />
          <span className="navbar__logo-text">Promoção 3D</span>
        </div>
        <ul className="navbar__list">
          <li className="navbar__list-item">
            <a href="#hero">Início</a>
          </li>
          <li className="navbar__list-item">
            <a href="#desvendando">Desvendando</a>
          </li>
          <li className="navbar__list-item">
            <a href="#sobre">Informações</a>
          </li>
          <li className="navbar__list-item">
            <a href="#material">Material</a>
          </li>
          <li className="navbar__list-item">
            <a href="#jogo-da-vida">Jogo da Vida</a>
          </li>
          <li className="navbar__list-item">
            <a href="#resultados">Resultados</a>
          </li>
          <li className="navbar__list-item">
            <a href="#contato">Contato</a>
          </li>
        </ul>
       <button className="menu-btn">
        <i className='bx bx-menu-alt-right' ></i>
       </button>
      </nav>
    </div>
  );
};

export default NavBar;
