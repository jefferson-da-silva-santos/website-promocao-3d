const Option = () => {
  return (
     <div className="conatiner-option">
      <aside className="option">
        <a href="" className="btn-close-option">
          <i className="bx bx-x"></i>
        </a>
        <div className="option--primary">
          <h1 className="option--primary__title"></h1>
          <div className="option--primary__group-text">
            <i className="bx bx-check"></i>
            <p className="option--primary__text"></p>
          </div>
        </div>
        <div className="option--secundary">
          <img src="" alt="" className="option--secundary__img" />
        </div>
      </aside>
    </div>
  )
}

export default Option;