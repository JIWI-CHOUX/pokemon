import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const PokemonListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const PokemonCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  text-align: center;
  width: 150px;
  cursor: pointer;
  position: relative;

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [addedPokemons, setAddedPokemons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
        setError('Error fetching pokemons');
      }
    };

    fetchPokemons();
  }, []);

  const handleAddPokemon = (pokemon) => {
    setAddedPokemons(prev => [pokemon, ...prev].slice(0, 6));
  };

  const handleRemovePokemon = (pokemonName) => {
    setAddedPokemons(prev => prev.filter(p => p.name !== pokemonName));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <PokemonListContainer>
        {Array.from({ length: 6 - addedPokemons.length }, (_, index) => (
          <PokemonCard key={`empty-${index}`}>
            <p>+</p>
          </PokemonCard>
        ))}
        
        {addedPokemons.map(pokemon => (
          <PokemonCard key={pokemon.name}>
            <h3>{pokemon.name}</h3>
            <button onClick={() => handleRemovePokemon(pokemon.name)}>Remove</button>
          </PokemonCard>
        ))}

        {pokemons.map(pokemon => (
          <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name} style={{ textDecoration: 'none', color: 'inherit' }}>
            <PokemonCard>
              <h3>{pokemon.name}</h3>
              <button onClick={(e) => {
                e.stopPropagation();
                handleAddPokemon(pokemon);
              }}>Add</button>
            </PokemonCard>
          </Link>
        ))}
      </PokemonListContainer>
      <button onClick={() => setAddedPokemons([])}>Remove All Added Pokemons</button>
    </div>
  );
};

export default PokemonList;
