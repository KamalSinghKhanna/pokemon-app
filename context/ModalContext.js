// ModalContext.js
import { createContext, useContext, useState, useEffect } from "react";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {


  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
   const [pokemonId, setPokemonId] = useState(null); 

  // console.log(pokemonDetail);

  const openModal = (id) => {
    setPokemonId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setPokemonId(null);
    setShowModal(false);
  };

 

  return (
    <ModalContext.Provider
      value={{
        showModal,
        openModal,
        closeModal,
        isLoading,
        setIsLoading,
        pokemonId,
        setPokemonId
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
