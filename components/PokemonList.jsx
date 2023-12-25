import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";

const PokemonList = () => {
  const [items, setItems] = useState([]);
  // console.log(items)
 const fetchData = async () => {
   try {
     const res = await fetch(
       "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
     );
     const data = await res.json();

     // Use the callback form of setItems to ensure the latest state
     setItems((prevItems) => [...prevItems, ...data.results]);
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 };


  useEffect(() => {
    fetchData();
  }, []);

   const [filterList, setFilterList] = useState(items);
console.log(filterList)

 const handleSearch = (event) => {
   event.preventDefault();
   const searchValue = event.target.value.toLowerCase();

   if (searchValue === "") {
     setFilterList(items);
     return;
   }

   const filteredValues = items.filter(
     (item) => item.name.toLowerCase().indexOf(searchValue) !== -1
   );

   console.log(filteredValues); // Log the filtered values

   setFilterList(filteredValues);
 };


useEffect(() => {
  setFilterList(items);
}, [items]);


  const extractPokemonIdFromUrl = (url) => {
    const regex = /\/(\d+)\/$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="flex flex-wrap gap-6 items-center justify-center py-10"
      >
        {filterList?.map((pokemon, index) => {
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
