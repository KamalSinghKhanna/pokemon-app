import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import { memo } from "react";
const CardDetailModel = memo(() => {
  const { closeModal, isLoading, setIsLoading, pokemonId, pokemonDetail } =
    useModal();

  const getBackgroundColor = (index) => {
     const colors = [
       "rgb(59, 130, 246)",
       "rgb(95, 245, 90)",
       "rgb(250, 247, 60)",
       "rgb(250, 78, 78)",
       "rgb(76, 185, 231)",
     ];
    return colors[index % colors.length];
  };

  const calculateWidth = (baseStat) => {
    const maxStatValue = 255; // Assuming a maximum stat value
    const maxWidthPercentage = 100; // Maximum width percentage
    const scalingFactor = 2; // can adjust this factor to increase/decrease the width

    const widthPercentage =
      (baseStat / maxStatValue) * maxWidthPercentage * scalingFactor;
    return `${widthPercentage}%`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-transparent"
        onClick={closeModal}
      ></div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div className="flex flex-col items-center z-10 w-[90%] h-[90%] sm:w-3/4 sm:h-auto sm:px-5 pt-3 bg-gray-50 rounded-lg border border-gray-300">
          <div className="flex w-full justify-end text-gray-600 font-bold text-sm sm:hidden px-3 sm:px-0">
            <button
              onClick={closeModal}
              className="bg-gray-300 px-2 py-0.5 text-center rounded-full "
            >
              X
            </button>
          </div>
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col w-full justify-around">
              <div className="sm:flex-row flex flex-col sm:items-start sm:gap-[10%] md:gap-[25%] sm:mb-0 mb-5 px-5 sm:px-0">
                <div className="flex flex-col justify-center items-start gap-0 bg-gray-300 px-3 py-2 rounded-xl my-2 sm:my-0">
                  <span className="text-gray-500 font-semibold">
                    <span className="text-gray-800 font-semibold">id:</span>
                    {pokemonDetail?.id}
                  </span>
                  <h2 className="text-center text-xl sm:text-3xl font-semibold text-gray-600">
                    {pokemonDetail?.name}
                  </h2>
                  <div className="flex items-center">
                    <span className="text-gray-800 font-semibold mr-3">
                      type:
                    </span>
                    {pokemonDetail?.types.map((item, i) =>
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
                </div>
                <Image
                  src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                  alt={pokemonDetail?.name}
                  width={200}
                  height={200}
                  className="w-40 h-40 sm:w-60 sm:h-60 cursor-pointer"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-between w-full gap-6">
                <div className="w-full pl-3 sm:px-4 lg:w-4/12">
                  <p className="text-xl font-bold text-gray-900 mb-3">stats:</p>
                  {pokemonDetail?.stats.map((stat, index) => (
                    <div key={index} className="mb-3 flex items-center gap-4">
                      <span className="text-sm font-bold text-gray-800 uppercase">
                        {stat.stat.name}:{stat.base_stat}{" "}
                      </span>
                      <div className="bg-gray-300 dark:bg-dark-3 relative h-2.5 w-full rounded-2xl">
                        <div
                          className=" absolute top-0 left-0 h-full rounded-2xl"
                          style={{
                            width: calculateWidth(stat.base_stat),
                            backgroundColor: `${getBackgroundColor(index)}`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-auto  pr-2 sm:px-4 lg:w-4/12 ">
                  <p className="text-xl font-bold text-gray-900 mb-3">moves:</p>
                  {pokemonDetail?.moves.map(
                    (move, index) =>
                      index <= 6 && (
                        <div
                          key={index}
                          className="mb-3 flex justify-center items-start gap-4 rounded-full w-32 sm:w-full"
                          style={{
                            backgroundColor: `${getBackgroundColor(index)}`,
                          }}
                        >
                          <span className="text-sm font-bold text-gray-100 uppercase">
                            {move.move.name}
                          </span>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default CardDetailModel;

CardDetailModel.displayName = "CardDetailModel";
