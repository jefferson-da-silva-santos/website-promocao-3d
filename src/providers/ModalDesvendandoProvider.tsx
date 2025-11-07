import React, { useState } from 'react'
import ModalDesvendandoContext from '../contexts/ModalDesvendandoContext';

const ModalDesvendandoProvider = ({ children }: { children: React.ReactNode }) => {
  const [showOption, setShowOption] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [imgModal, setImgModal] = useState('');

  return (
    <ModalDesvendandoContext.Provider value={{ 
      titleModal, setTitleModal, textModal, setTextModal, imgModal, setImgModal, showOption, setShowOption }}>
      {children}
    </ModalDesvendandoContext.Provider>
  )
}

export default ModalDesvendandoProvider