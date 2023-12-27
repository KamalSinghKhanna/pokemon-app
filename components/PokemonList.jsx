import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import axios from "axios";
const PokemonList = () => {
  const [data, setData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`
      );
      setData(response.data.results);
      const detailsPromises = response.data.results.map((item) =>
        axios.get(item.url)
      );
      const detailsResponses = await Promise.all(detailsPromises);
      const detailsData = detailsResponses.map((response) => response.data);
      setPokemonData(detailsData);
    } catch (error) {
      console.error(error);
      // setLoading(false);
    }
    // setLoading(false);
  };


  useEffect(() => {
    fetchData();
  }, []);

   const [filterList, setFilterList] = useState(pokemonData);
// console.log(filterList)

 const handleSearch = (event) => {
   event.preventDefault();
   const searchValue = event.target.value.toLowerCase();

   if (searchValue === "") {
     setFilterList(pokemonData);
     return;
   }

   const filteredValues = pokemonData.filter(
     (item) => item.name.toLowerCase().indexOf(searchValue) !== -1
   );

   

   setFilterList(filteredValues);
 };


// useEffect(() => {
//   setFilterList(pokemonData);
// }, [pokemonData]);


  const extractPokemonIdFromUrl = (url) => {
    const regex = /\/(\d+)\/$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <InfiniteScroll
        dataLength={pokemonData.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="flex flex-wrap gap-6 pokemonData-center justify-center py-10"
      >
        {pokemonData?.map((pokemon, index) => {
          const pokemonId = extractPokemonIdFromUrl(pokemon.url);
          const imageUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

          return (
            <div key={index}>
              <PokemonCard
                pokemon={pokemon}
                imageUrl={imageUrl}
                pokemonId={pokemonId}
                url={pokemon.url}
              />
            </div>
          );
        })}
      </InfiniteScroll>
    </>
  );
};

export default PokemonList;
