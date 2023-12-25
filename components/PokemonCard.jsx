// PokemonCard.js
import { useModal } from "@/context/ModalContext";
import CardDetailModel from "./CardDetailModel";
import { useState, useEffect } from "react";

const PokemonCard = ({ pokemon, imageUrl, pokemonId, url }) => {
  const { openModal, setPokemonId, showModal, setImageUrl } = useModal();
  const [pokemonData, setPokemonData] = useState({
    name: "",
    id:null,
    types: [],
  });
  // console.log(pokemonData)
  const handleModel = () => {
    setPokemonId(pokemonId);
    setImageUrl(imageUrl);
    openModal();
  };

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPokemonData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pokemonData]);

  return (
    <>
      {showModal && <CardDetailModel />}
      <div
        onClick={handleModel}
        className="w-64 flex flex-col bg-gray-200 rounded-lg p-4 m-2 transform transition duration-500 hover:scale-110"
      >
        <div
          className="h-40 bg-gray-400 rounded-lg"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col items-start mt-4">
          <div className="flex items-center gap-2 ">
            <h4 className="text-xl font-semibold">{pokemon.name}</h4>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-800 font-semibold mr-3">type:</span>
              {pokemonData.types.map((item, i) =>
                i === 0 ? (
                  <span className="font-semibold text-gray-500" key={i}>
                    {item.type.name}-
                  </span>
                ) : (
                  <span className="font-semibold text-gray-500" key={i}>
                    {item.type.name}
                  </span>
                )
              )}
            </div>
            <h4 className="text-gray-800 font-semibold mr-3">
              {pokemonData.id}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
