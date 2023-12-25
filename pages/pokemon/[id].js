import { React } from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";
const SinglePokemon = ({ pokemon }) => {
  const { showModal, closeModal } = useModal();
  console.log(pokemon);
  return (
    <>
      {/* The modal */}
      {pokemon && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-gray-300"
            style={{
              background: "url(https://images7.alphacoders.com/592/592678.jpg)",
              backgroundSize: "cover",
              opacity: "0.7",
            }}
          ></div>
          <div className="z-10 w-full h-full sm:w-3/4 sm:h-3/5 px-5 py-0 bg-gray-50 border border-gray-200 rounded-lg shadow">
            <div className="flex justify-end text-gray-600 font-bold text-xl">
              <button onClick={closeModal}>x</button>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                alt={pokemon.name}
                width={200}
                height={200}
                className="w-32 h-32 cursor-pointer"
              />
              <h2 className="text-2xl font-semibold mb-3 text-gray-600">
                {pokemon.name}
              </h2>
            </div>
            <div className="w-full px-4 lg:w-5/12">
              <div className="mb-8">
                <div className="bg-gray-300 relative h-2.5 w-full rounded-2xl">
                  <div className="bg-blue-500 absolute top-0 left-0 h-full w-1/2 rounded-2xl"></div>
                </div>
              </div>
              <div className="mb-8">
                <div className="bg-gray-300 dark:bg-dark-3 relative h-2.5 w-full rounded-2xl">
                  <div className="bg-green-500 absolute top-0 left-0 h-full w-[75%] rounded-2xl"></div>
                </div>
              </div>
              <div className="mb-8">
                <div className="bg-gray-300 dark:bg-dark-3 relative h-2.5 w-full rounded-2xl">
                  <div className="bg-yellow-500 absolute top-0 left-0 h-full w-[90%] rounded-2xl"></div>
                </div>
              </div>
              <div className="mb-8">
                <div className="bg-gray-300 dark:bg-dark-3 relative h-2.5 w-full rounded-2xl">
                  <div className="bg-red-500 absolute top-0 left-0 h-full w-[63%] rounded-2xl"></div>
                </div>
              </div>
              <div className="mb-8">
                <div className="bg-gray-300 dark:bg-dark-3 relative h-2.5 w-full rounded-2xl">
                  <div className="bg-cyan-500 absolute top-0 left-0 h-full w-[45%] rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ctx.query.id}`);
  const data = await res.json();

  return {
    props: {
      pokemon: data ? data : null,
    },
  };
}

export default SinglePokemon;
