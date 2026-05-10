import useModalDesvendando from "../../hooks/useModalDesvendando";

const Option = () => {
  const { showOption, setShowOption, titleModal, textModal, imgModal } = useModalDesvendando();

  return (
     <div className={
      showOption ? "conatiner-option conatiner-option-active" : "conatiner-option conatiner-option-disabled"
     } >
      <aside className="option">
        <a href="" className="btn-close-option" onClick={(e) => {
          e.preventDefault();
          setShowOption(false)
        }}>
          <i className="bx bx-x"></i>
        </a>
        <div className="option--primary">
          <h1 className="option--primary__title">{titleModal}</h1>
          <div className="option--primary__group-text">
            <i className="bx bx-check"></i>
            <p className="option--primary__text">{textModal}</p>
          </div>
        </div>
        <div className="option--secundary">
          <img src={imgModal} alt="" className="option--secundary__img" />
        </div>
      </aside>
    </div>
  )
}

export default Option;