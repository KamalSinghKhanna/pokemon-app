import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
const CardDetailModel = () => {
  // console.log(pokemonId)
  const { closeModal, isLoading, setIsLoading, pokemonId } = useModal();
   const [pokemonDetail, setPokemonDetail] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
        );
        setPokemonDetail(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (pokemonId) {
      fetchData();
    }
  }, [pokemonId, setIsLoading]);


 
const getBackgroundColor = (index) => {
  const colors = ["blue", "green", "yellow", "red", "cyan"];
  return colors[index % colors.length];
};

const calculateWidth = (baseStat) => {
  const maxStatValue = 255; // Assuming a maximum stat value
  const maxWidthPercentage = 100; // Maximum width percentage
  const scalingFactor = 2; // Adjust this factor to increase/decrease the width

  const widthPercentage =
    (baseStat / maxStatValue) * maxWidthPercentage * scalingFactor;
  return `${widthPercentage}%`;
};

 if (!pokemonDetail) {
   return null; // Do not render anything if no Pokemon details are available yet
 }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-transparent"
        onClick={closeModal}
      ></div>
      <div className="flex flex-col items-center z-10 w-full h-full sm:w-3/4 sm:h-3/4 px-5 pt-3 bg-gray-50 rounded-lg shadow">
        <div className="flex w-full justify-end text-gray-600 font-bold text-sm">
          <button onClick={closeModal} className="bg-gray-300 px-2 text-center rounded-full">
            X
          </button>
        </div>
          <div className="flex flex-col justify-between w-full">
            <h2 className="text-center text-3xl font-semibold text-gray-600">
              {pokemonDetail.name}
            </h2>
            <div className="flex items-center w-full justify-around">
              <div className="flex flex-col items-start justify-center">
                <Image
                  src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                  alt={pokemonDetail.name}
                  width={200}
                  height={200}
                  className="w-60 h-60 cursor-pointer"
                />

                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-800 font-semibold mr-3">
                      type:
                    </span>
                    {pokemonDetail.types.map((item, i) =>
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
                    {pokemonDetail.id}
                  </h4>
                </div>
              </div>
              <div className="w-full px-4 lg:w-4/12">
                {pokemonDetail?.stats.map((stat, index) => (
                  <div key={index} className="mb-4 flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-800 uppercase">
                      {stat.stat.name}:{stat.base_stat}{" "}
                    </span>
                    <div className="bg-gray-300 dark:bg-dark-3 relative h-2.5 w-full rounded-2xl">
                      <div
                        className={`bg-${getBackgroundColor(
                          index
                        )}-500 absolute top-0 left-0 h-full rounded-2xl`}
                        style={{ width: calculateWidth(stat.base_stat) }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

      </div>
    </div>
  );
};

export default CardDetailModel;
