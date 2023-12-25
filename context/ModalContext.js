// ModalContext.js
import { createContext, useContext, useState, useEffect } from "react";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [pokemonDetail, setPokemonDetail] = useState({
    name: "",
    stats: [],
    // Add other properties as needed
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [pokemonId, setPokemonId] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // console.log(pokemonDetail);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchData = async () => {
    if (pokemonId !== null) {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data = await res.json();
        setPokemonDetail(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [pokemonId]);

  return (
    <ModalContext.Provider
      value={{
        showModal,
        openModal,
        closeModal,
        setPokemonId,
        pokemonId,
        setImageUrl,
        imageUrl,
        fetchData,
        pokemonDetail,
        isLoading,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
