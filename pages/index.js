import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";
import { useModal } from "@/context/ModalContext";
import Loader from "@/components/Loader";

const Home = () => {
  const { setIsLoading } = useModal();
  const [pokemonData, setPokemonData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`
      );

      const detailsPromises = response.data.results.map((item) =>
        axios.get(item.url)
      );

      const detailsResponses = await Promise.all(detailsPromises);
      const detailsData = detailsResponses.map((response) => response.data);
      setPokemonData(detailsData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SearchBar
        searchData={searchData}
        setSearchData={setSearchData}
        pokemonData={pokemonData}
        setPokemonData={setPokemonData}
      />
      <InfiniteScroll
        dataLength={
          searchData.length > 0 ? searchData.length : pokemonData.length
        }
        next={fetchData}
        hasMore={true}
        loader={<Loader />}
        endMessage={
          <p className="text-center text-black">
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="flex flex-col items-center sm:flex-wrap gap-6 sm:flex-row justify-center py-10"
      >
        {searchData.length > 0
          ? searchData.map((pokemon, i) => (
              <div key={i} className="w-4/5 sm:w-64">
                <PokemonCard pokemon={pokemon} index={i} />
              </div>
            ))
          : pokemonData.map((pokemon, i) => (
              <div key={i} className="w-4/5 sm:w-64">
                <PokemonCard pokemon={pokemon} index={i} />
              </div>
            ))}
      </InfiniteScroll>
    </>
  );
};

export default Home;
