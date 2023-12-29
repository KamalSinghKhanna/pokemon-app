import React, { useState, useEffect } from "react";

const SearchBar = ({
  searchData,
  setSearchData,
  pokemonData,
  setPokemonData,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    handleSearch();
  }, [searchValue, selectedType]); // This useEffect will be triggered whenever searchValue or selectedType changes

  const handleSearch = () => {
    const lowerCaseSearchValue = searchValue.toLowerCase();

    const searchedValues = pokemonData?.filter(
      (item) =>
        (item.name.toLowerCase().includes(lowerCaseSearchValue) ||
          item.id.toString().includes(lowerCaseSearchValue)) &&
        (selectedType === "" ||
          item.types.some((type) => type.type.name === selectedType))
    );

    setSearchData(searchedValues);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="mx-3 sm:mx-20 my-5 flex items-center gap-5">
      <div className="flex gap-1 w-full">
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-base text-gray-600 bg-gray-50 rounded-lg border-1 border border-gray-300 outline-none placeholder:text-gray-500"
            placeholder="Search Pokemons..."
            required
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <select
        className="block p-2.5 w-32 z-20 text-base text-gray-600 bg-gray-50 rounded-lg border-1 border border-gray-300 outline-none placeholder:text-gray-500"
        onChange={handleTypeChange}
      >
        <option value="">All Types</option>
        <option value="flying">Flying</option>
        <option value="water">Water</option>
        <option value="electric">Electric</option>
        <option value="fire">Fire</option>
        <option value="poison">Poison</option>
        <option value="grass">Grass</option>
        <option value="dragon">Dragon</option>
        <option value="ghost">Ghost</option>
        <option value="bug">Bug</option>
        <option value="ground">Ground</option>
      </select>
    </div>
  );
};

export default SearchBar;
