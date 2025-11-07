import { useContext } from "react"
import ModalDesvendandoContext from "../contexts/ModalDesvendandoContext"

const useModalDesvendando = () => {
  const context = useContext(ModalDesvendandoContext);
  return context;
}

export default useModalDesvendando