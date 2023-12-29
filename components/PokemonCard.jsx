import { useModal } from "@/context/ModalContext";
import CardDetailModel from "./CardDetailModel";
import { useState, useEffect, memo } from "react";

const PokemonCard = memo(({ pokemon, index }) => {
  const { openModal, showModal } = useModal();

 const getBackgroundColor = (index) => {
   const colors = ["blue", "green", "yellow", "red", "cyan"];
   return colors[index % colors.length];
 };
 const handleCardClick = () => {
   openModal(pokemon.id, pokemon); // Passing the Pokemon data to openModal
 };


  return (
    <>
      {showModal && <CardDetailModel />}
      <div
        onClick={handleCardClick}
        className="w-64 flex flex-col bg-gray-200 rounded-lg p-4 m-2 cursor-pointer transform transition duration-300 hover:scale-110"
      >
        <div
          className={`bg-${getBackgroundColor(index)}-500 rounded-lg h-40`}
          style={{
            backgroundImage: `url(https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg)`,
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
            <div className="flex items-center gap-2">
              type:
              {pokemon.types.length > 1 ? (
                <span>
                  {` ${pokemon?.types[0]?.type?.name} -
                    ${pokemon?.types[1]?.type?.name}`}
                </span>
              ) : (
                <span>{pokemon?.types[0]?.type?.name}</span>
              )}
            </div>
            <h4 className="text-gray-800 font-semibold mr-3">
              id: {pokemon.id}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
);

export default PokemonCard;

PokemonCard.displayName = "PokemonCard";